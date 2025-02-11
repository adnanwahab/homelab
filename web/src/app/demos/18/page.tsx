'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three/webgpu';
import { WebGPURenderer } from 'three/webgpu';

export default function WebGPUPointsWithGenerator() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationId;
    let shouldStop = false; // We'll use this to stop our generator loop when unmounting.

    if (!canvasRef.current) {
      console.log('No canvas found!');
      return;
    }

    // Create the Three.js WebGPU renderer
    const renderer = new WebGPURenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Prepare scene + camera for simply displaying the final texture
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 2);
    
    // Simple fullscreen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // JS side "uniform" data
    const uniformsData = {
      timeFrame: 0,
      timeElapsed: 0.0,
      mousePos: [0.0, 0.0],
      custom: {
        Radius: 1.0,
        Mode: 0.0,    // 0 => additive, 1 => closest
        Samples: 0.2,
        Speed: 1.0,
        Sine1: 1.0,
        Sine2: 1.0,
        Blur: 0.0
      },
      width: window.innerWidth,
      height: window.innerHeight
    };

    // Convert the JS uniform data to a Float32Array
    function createUniformsFloat32() {
      const u = new Float32Array(22);
      u[0] = uniformsData.timeFrame;
      u[1] = uniformsData.timeElapsed;
      u[2] = uniformsData.mousePos[0];
      u[3] = uniformsData.mousePos[1];
      u[4] = uniformsData.custom.Radius;
      u[5] = uniformsData.custom.Mode;
      u[6] = uniformsData.custom.Samples;
      u[7] = uniformsData.custom.Speed;
      u[8] = uniformsData.custom.Sine1;
      u[9] = uniformsData.custom.Sine2;
      u[10] = uniformsData.custom.Blur;
      // ...
      u[20] = uniformsData.width;
      u[21] = uniformsData.height;
      return u;
    }

    // This is your WGSL shader code (unchanged)
    const wgslCode = /* wgsl */`
    // [SNIP - The same WGSL code as your snippet above]
    @group(0) @binding(0) var<storage, read_write> atomic_storage : array<atomic<i32>>;
    @group(0) @binding(1) var screen : texture_storage_2d<rgba8unorm, write>;
    @group(0) @binding(2) var<uniform> uniforms : array<f32>;

    // ... entire code omitted here for brevity ...
    
    @compute @workgroup_size(16,16)
    fn Clear(@builtin(global_invocation_id) id: vec3<u32>) {
      // ...
    }
    @compute @workgroup_size(16,16)
    fn Rasterize(@builtin(global_invocation_id) id: vec3<u32>) {
      // ...
    }
    @compute @workgroup_size(16,16)
    fn main_image(@builtin(global_invocation_id) id: vec3<u32>) {
      // ...
    }
    `;

    // We'll store references to your WebGPU objects
    let device;
    let uniformBuffer, atomicStorageBuffer, screenTexture;
    let pipelineClear, pipelineRasterize, pipelineMainImage;
    let bindGroup;

    // Init function to set up the WebGPU pipeline
    async function initWebGPU() {
      await renderer.init();   // wait for Three.js's internal WebGPU init
      device = renderer.device;
      if (!device) {
        throw new Error('WebGPU device not available!');
      }

      const width = renderer.domElement.width;
      const height = renderer.domElement.height;

      // Create Buffers / Textures
      atomicStorageBuffer = device.createBuffer({
        size: width * height * 4 * 4,
        usage:
          GPUBufferUsage.STORAGE |
          GPUBufferUsage.COPY_SRC |
          GPUBufferUsage.COPY_DST
      });

      screenTexture = device.createTexture({
        size: { width, height },
        format: 'rgba8unorm',
        usage:
          GPUTextureUsage.RENDER_ATTACHMENT |
          GPUTextureUsage.STORAGE_BINDING  |
          GPUTextureUsage.TEXTURE_BINDING  |
          GPUTextureUsage.COPY_SRC
      });

      const uniformBufferSize = 4 * 64; 
      uniformBuffer = device.createBuffer({
        size: uniformBufferSize,
        usage: GPUBufferUsage.UNIFORM | GPUBufferUsage.COPY_DST
      });

      // Create pipelines
      const shaderModule = device.createShaderModule({ code: wgslCode });

      pipelineClear = device.createComputePipeline({
        layout: 'auto',
        compute: {
          module: shaderModule,
          entryPoint: 'Clear'
        }
      });
      pipelineRasterize = device.createComputePipeline({
        layout: 'auto',
        compute: {
          module: shaderModule,
          entryPoint: 'Rasterize'
        }
      });
      pipelineMainImage = device.createComputePipeline({
        layout: 'auto',
        compute: {
          module: shaderModule,
          entryPoint: 'main_image'
        }
      });

      // Create a single bind group with references to:
      // atomicStorageBuffer, screenTexture, and uniformBuffer
      const bindGroupLayout = pipelineClear.getBindGroupLayout(0);
      bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
          { binding: 0, resource: { buffer: atomicStorageBuffer } },
          { binding: 1, resource: screenTexture.createView() },
          { binding: 2, resource: { buffer: uniformBuffer } },
        ]
      });
    }

    // Clock for time
    const clock = new THREE.Clock();

    /**
     * ------------------
     * GENERATOR FUNCTION
     * ------------------
     * This function is where we'll do the repeating "per frame" logic (dispatching compute passes,
     * updating uniform data, etc.), and we'll `yield` after each iteration.
     */
    function* frameGenerator() {
      // Keep running until unmount.
      while (!shouldStop) {
        uniformsData.timeFrame++;
        uniformsData.timeElapsed += clock.getDelta();

        // If you want, update mouse positions: uniformsData.mousePos = [x, y];
        const u = createUniformsFloat32();
        if (device) {
          device.queue.writeBuffer(uniformBuffer, 0, u);

          // Issue compute commands
          const commandEncoder = device.createCommandEncoder();

          // 1) CLEAR
          {
            const pass = commandEncoder.beginComputePass();
            pass.setPipeline(pipelineClear);
            pass.setBindGroup(0, bindGroup);
            const wg = 16;
            pass.dispatchWorkgroups(
              Math.ceil(uniformsData.width / wg),
              Math.ceil(uniformsData.height / wg)
            );
            pass.end();
          }

          // 2) RASTERIZE
          {
            const pass = commandEncoder.beginComputePass();
            pass.setPipeline(pipelineRasterize);
            pass.setBindGroup(0, bindGroup);
            const wg = 16;
            pass.dispatchWorkgroups(
              Math.ceil(uniformsData.width / wg),
              Math.ceil(uniformsData.height / wg)
            );
            pass.end();
          }

          // 3) MAIN_IMAGE
          {
            const pass = commandEncoder.beginComputePass();
            pass.setPipeline(pipelineMainImage);
            pass.setBindGroup(0, bindGroup);
            const wg = 16;
            pass.dispatchWorkgroups(
              Math.ceil(uniformsData.width / wg),
              Math.ceil(uniformsData.height / wg)
            );
            pass.end();
          }

          // Submit the commands
          device.queue.submit([commandEncoder.finish()]);
        }

        // Then render the final quad
        renderer.render(scene, camera);

        // --------
        // The magic: we yield here to hand back control to the requestAnimationFrame loop
        yield;
      }
    }

    // Entry point for the effect: set everything up, then call the generator.
    initWebGPU()
      .then(() => {
        const gen = frameGenerator();

        // Standard rAF loop, but we call gen.next() each frame
        function animate() {
          // Step the generator once
          gen.next();
          if (!shouldStop) {
            animationId = requestAnimationFrame(animate);
          }
        }
        animate();
      })
      //.catch(console.error);

    // Cleanup on unmount
    return () => {
      shouldStop = true;  // This will break the generator's while loop
      if (animationId) cancelAnimationFrame(animationId);

      // Free geometry/material if you like
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
    />
  );
}
