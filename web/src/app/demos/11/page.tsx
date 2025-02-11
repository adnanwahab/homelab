"use client";
import React, { useRef, useEffect, useState } from "react";
// IMPORTANT: We typically import from 'three' plus the webgpu examples, 
// but you've been doing `import * as THREE from 'three/webgpu';` 
// which is an experimental build. That can work, but be sure your three.js 
// version is up-to-date (>= r152 or so).
import * as THREE from "three/webgpu";

// Our simple fractal WGSL that just writes red for demonstration
const fractalComputeWGSL = /* wgsl */`
  @group(0) @binding(0) var destTex: texture_storage_2d<rgba8unorm, write>;

  @compute @workgroup_size(1,1,1)
  fn main(@builtin(global_invocation_id) gid : vec3<u32>) {
    let x = gid.x;
    let y = gid.y;
    if (x >= 512u || y >= 512u) { return; }
    textureStore(destTex, vec2<u32>(x, y), vec4<f32>(1.0, 0.0, 0.0, 1.0));
  }
`;

export default function WebGPUScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [renderer, setRenderer] = useState<THREE.WebGPURenderer | null>(null);

  // For simplicity, let's store scene/camera in refs or state:
  const sceneRef = useRef(new THREE.Scene());
  const cameraRef = useRef<THREE.OrthographicCamera>(new THREE.OrthographicCamera(-1.5, 1.5, 1, -1, 0, 2));
  
  useEffect(() => {
    const cam = cameraRef.current;
    cam.position.z = 1;
    cam.updateProjectionMatrix();
  }, []);

  // 1) Initialize the WebGPURenderer exactly once
  useEffect(() => {
    if (!canvasRef.current) return console.log('cool'); 

    const r = new THREE.WebGPURenderer({ canvas: canvasRef.current });
    // Typically we do .init(), but in newer versions, constructor might handle it. 
    // If needed:
    //await r.init();

    r.setSize(window.innerWidth, window.innerHeight);
    setRenderer(r);

    const onResize = () => {
      r.setSize(window.innerWidth, window.innerHeight);
      const aspect = window.innerWidth / window.innerHeight;
      const cam = cameraRef.current;
      cam.left = -aspect;
      cam.right = aspect;
      cam.top = 1;
      cam.bottom = -1;
      cam.updateProjectionMatrix();
      renderFrame();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      r.dispose();
    };
  }, []);
  //await r.init();

  // 2) Once we have a renderer (and thus a GPU device), do the compute pass + readback
  useEffect(() => {
    if (!renderer) return console.log('renderer')
      

    // We rely on (renderer as any).backend.device or (renderer as any).device
    // depending on your version. Possibly:
    const device = (renderer as any).device || (renderer as any).backend?.device;
    if (!device) {
      console.warn("No GPU device found on the WebGPURenderer. Possibly too early or incompatible version.");
      return;
    }

    const width = 512;
    const height = 512;

    // A) Create a storage texture for compute
    const storageTex = new THREE.StorageTexture(width, height);
    const gpuTexture = renderer.getTextureGPU(storageTex);

    // B) Set up the compute pipeline
    const pipeline = device.createComputePipeline({
      layout: "auto",
      compute: {
        module: device.createShaderModule({ code: fractalComputeWGSL }),
        entryPoint: "main",
      },
    });

    // C) Create bind group for the storage texture
    const bindGroup = device.createBindGroup({
      layout: pipeline.getBindGroupLayout(0),
      entries: [
        { binding: 0, resource: gpuTexture.createView() },
      ],
    });

    // D) Dispatch the compute pass
    {
      const cmdEncoder = device.createCommandEncoder();
      const pass = cmdEncoder.beginComputePass();
      pass.setPipeline(pipeline);
      pass.setBindGroup(0, bindGroup);
      pass.dispatchWorkgroups(width, height);
      pass.end();
      device.queue.submit([cmdEncoder.finish()]);
    }

    // E) Copy the storage texture -> a CPU buffer
    // We do that by a second command pass:
    const bytesPerPixel = 4; // RGBA8
    const bytesPerRowAlignment = 256; // must be multiple of 256
    const unalignedBytesPerRow = width * bytesPerPixel;
    const alignedBytesPerRow = Math.ceil(unalignedBytesPerRow / bytesPerRowAlignment) * bytesPerRowAlignment;
    const totalBufferSize = alignedBytesPerRow * height;

    const outputBuffer = device.createBuffer({
      size: totalBufferSize,
      usage: GPUBufferUsage.COPY_DST | GPUBufferUsage.MAP_READ,
    });

    {
      const cmdEncoder = device.createCommandEncoder();
      cmdEncoder.copyTextureToBuffer(
        { texture: gpuTexture },
        {
          buffer: outputBuffer,
          bytesPerRow: alignedBytesPerRow,
          rowsPerImage: height,
        },
        { width, height, depthOrArrayLayers: 1 }
      );
      device.queue.submit([cmdEncoder.finish()]);
    }

    // F) Map and read out the buffer
    outputBuffer.mapAsync(GPUMapMode.READ).then(() => {
      const arrayBuf = outputBuffer.getMappedRange();
      const allRows = new Uint8Array(arrayBuf);
      
      const finalData = new Uint8Array(width * height * bytesPerPixel);

      // De-interleave the rows if there's alignment padding
      for (let row = 0; row < height; row++) {
        const srcStart = row * alignedBytesPerRow;
        const dstStart = row * unalignedBytesPerRow;
        finalData.set(allRows.subarray(srcStart, srcStart + unalignedBytesPerRow), dstStart);
      }

      outputBuffer.unmap();

      // G) Create a Three.js DataTexture from that CPU data
      const dataTex = new THREE.DataTexture(finalData, width, height, THREE.RGBAFormat);
      dataTex.needsUpdate = true;

      // Cleanup GPU objects
      gpuTexture.destroy();
      outputBuffer.destroy();

      // H) Finally, make a plane with the dataTex as a map
      const planeMat = new THREE.MeshBasicMaterial({ map: dataTex });
      const planeGeo = new THREE.PlaneGeometry(2, 2);
      const plane = new THREE.Mesh(planeGeo, planeMat);
      sceneRef.current.add(plane);

      // Render once
      renderFrame();

      // Cleanup if effect re-runs
      return () => {
        sceneRef.current.remove(plane);
        planeGeo.dispose();
        planeMat.dispose();
        dataTex.dispose(); // if you like
      };
    });

  }, [renderer]);

  function renderFrame() {
    if (!renderer) return console.log('wtf')
    const scene = sceneRef.current;
    const camera = cameraRef.current;
    renderer.renderAsync(scene, camera);
  }

  return <canvas style={{ width: "100%", height: "100%" }} ref={canvasRef} />;
}
