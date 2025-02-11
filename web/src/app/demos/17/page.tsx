'use client';
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three/webgpu';
// Ensure you have the correct import path:
import { WebGPURenderer } from 'three/webgpu';

let device

export default function WebGPUPoints() {
  const canvasRef = useRef(null);

  useEffect(() => {
    let animationId;

    if (!canvasRef.current) return console.log('no canvas sorry :(')

    // 1) Create the Three.js WebGPU renderer
    const renderer = new WebGPURenderer({
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // We'll store references to our GPU device, pipelines, etc.
    let uniformBuffer, atomicStorageBuffer, screenTexture;
    let pipelineClear, pipelineRasterize, pipelineMainImage;
    let bindGroup;

    // 2) Prepare scene + camera for simply displaying the final texture
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(
      -1, 1, 1, -1, 0, 2
    );

    // A simple plane to see the final result
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // 3) Our uniform data in JS
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

    // Our function to map the JS data -> Float32Array
    function createUniformsFloat32() {
      // We store them in an array [timeFrame, timeElapsed, mouseX, mouseY, ...]
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

    // 4) WGSL code (same as your snippet)
    const wgslCode = /* wgsl */`
@group(0) @binding(0) var<storage, read_write> atomic_storage : array<atomic<i32>>;
@group(0) @binding(1) var screen : texture_storage_2d<rgba8unorm, write>;
@group(0) @binding(2) var<uniform> uniforms : array<f32>;

let MaxSamples = 64.0;
let FOV = 0.8;
let PI = 3.14159265;
let TWO_PI = 6.28318530718;

let DEPTH_MIN = 0.2;
let DEPTH_MAX = 5.0;
let DEPTH_BITS = 16u;

struct Camera {
  pos : vec3<f32>,
  cam : mat3x3<f32>,
  fov : f32,
  size : vec2<f32>
}
var<private> camera : Camera;

var<private> state : vec4<u32>;

fn getScreenSize() -> vec2<f32> {
    return vec2<f32>(uniforms[20], uniforms[21]);
}

fn pcg4d(a: vec4<u32>) -> vec4<u32> {
    var v = a * 1664525u + 1013904223u;
    v.x = v.x + v.y*v.w; 
    v.y = v.y + v.z*v.x; 
    v.z = v.z + v.x*v.y; 
    v.w = v.w + v.y*v.z;
    v = v ^ (v >> vec4<u32>(16u));
    v.x = v.x + v.y*v.w; 
    v.y = v.y + v.z*v.x; 
    v.z = v.z + v.x*v.y; 
    v.w = v.w + v.y*v.z;
    return v;
}
fn rand4() -> vec4<f32> {
    state = pcg4d(state);
    return vec4<f32>(state) / f32(0xffffffffu);
}
fn nrand4(sigma: f32, mean: vec4<f32>) -> vec4<f32> {
    let Z = rand4();
    let r = sqrt(-2.0 * log(Z.xxyy));
    let c = vec2<f32>(cos(TWO_PI * Z.z), sin(TWO_PI * Z.z));
    let d = vec2<f32>(cos(TWO_PI * Z.w), sin(TWO_PI * Z.w));
    return mean + sigma * vec4<f32>(r.x * c.x, r.x * c.y, r.y * d.x, r.y * d.y);
}

fn GetCameraMatrix(ang: vec2<f32>) -> mat3x3<f32> {
    let x_dir = vec3<f32>(cos(ang.x)*sin(ang.y), cos(ang.y), sin(ang.x)*sin(ang.y));
    let y_dir = normalize(cross(x_dir, vec3<f32>(0.0,1.0,0.0)));
    let z_dir = normalize(cross(y_dir, x_dir));
    return mat3x3<f32>(-x_dir, y_dir, z_dir);
}
fn SetCamera(ang: vec2<f32>, fov: f32) {
    camera.fov = fov;
    camera.cam = GetCameraMatrix(ang);
    let radius = uniforms[4];
    camera.pos = -(camera.cam * vec3<f32>(3.0*radius+0.5, 0.0, 0.0));
    camera.size = getScreenSize();
}
fn Project(cam: Camera, p: vec3<f32>) -> vec3<f32> {
    let td = distance(cam.pos, p);
    let dir = (p - cam.pos)/td;
    let screen = dir * cam.cam;
    let xy = screen.yz * cam.size.y / (cam.fov * screen.x) + 0.5*cam.size;
    return vec3<f32>(xy, screen.x*td);
}

fn Pack(a: u32, b: u32) -> i32 {
    return i32(a + (b << (31u - DEPTH_BITS)));
}
fn Unpack(a: i32) -> f32 {
    let mask = (1 << (DEPTH_BITS - 1u)) - 1;
    return f32(u32(a) & mask)/256.0;
}

fn ClosestPoint(color: vec3<f32>, depth: f32, index: i32) {
    let inverseDepth = 1.0/depth;
    let scaledDepth = (inverseDepth - 1.0/DEPTH_MAX)/(1.0/DEPTH_MIN - 1.0/DEPTH_MAX);
    if(scaledDepth > 1.0 || scaledDepth < 0.0) { return; }
    let uintDepth = u32(scaledDepth* f32((1u << DEPTH_BITS)-1u));
    let uintColor = vec3<u32>(u32(color.x*256.0), u32(color.y*256.0), u32(color.z*256.0));
    atomicMax(&atomic_storage[index*4+0], Pack(uintColor.x, uintDepth));
    atomicMax(&atomic_storage[index*4+1], Pack(uintColor.y, uintDepth));
    atomicMax(&atomic_storage[index*4+2], Pack(uintColor.z, uintDepth));
}
fn AdditiveBlend(color: vec3<f32>, depth: f32, index: i32) {
    let scaledColor = 256.0*color/depth;
    atomicAdd(&atomic_storage[index*4+0], i32(scaledColor.x));
    atomicAdd(&atomic_storage[index*4+1], i32(scaledColor.y));
    atomicAdd(&atomic_storage[index*4+2], i32(scaledColor.z));
}
fn RasterizePoint(pos: vec3<f32>, color: vec3<f32>) {
    let sSize = camera.size;
    let projectedPos = Project(camera, pos);
    let sc = vec2<i32>(i32(projectedPos.x), i32(projectedPos.y));
    if(sc.x<0 || sc.x>=i32(sSize.x) || sc.y<0 || sc.y>=i32(sSize.y) || projectedPos.z<0.0) { return; }
    let idx = sc.x + sc.y*i32(sSize.x);
    let mode = uniforms[5];
    if(mode < 0.5) {
      AdditiveBlend(color, projectedPos.z, idx);
    } else {
      ClosestPoint(color, projectedPos.z, idx);
    }
}

fn Sample(pos: vec2<i32>) -> vec3<f32> {
    let sSize = camera.size;
    let idx = pos.x + pos.y*i32(sSize.x);
    var color : vec3<f32>;
    let mode = uniforms[5];
    if(mode < 0.5) {
      let x = f32(atomicLoad(&atomic_storage[idx*4+0])) / 256.0;
      let y = f32(atomicLoad(&atomic_storage[idx*4+1])) / 256.0;
      let z = f32(atomicLoad(&atomic_storage[idx*4+2])) / 256.0;
      let samples = uniforms[6];
      color = tanh(0.1 * vec3<f32>(x,y,z)/(samples*MaxSamples+1.0));
    } else {
      let x = Unpack(atomicLoad(&atomic_storage[idx*4+0]));
      let y = Unpack(atomicLoad(&atomic_storage[idx*4+1]));
      let z = Unpack(atomicLoad(&atomic_storage[idx*4+2]));
      color = vec3<f32>(x,y,z);
    }
    return abs(color);
}
fn SampleBlur(pos: vec2<i32>) -> vec3<f32> {
    let b = uniforms[10];
    let c = Sample(pos);
    let avg = Sample(pos + vec2<i32>(1,0)) +
              Sample(pos + vec2<i32>(-1,0))+
              Sample(pos + vec2<i32>(0,1)) +
              Sample(pos + vec2<i32>(0,-1));
    return mix(c, 0.25*avg, b);
}

// === ENTRY POINTS ===

// Clear
@compute @workgroup_size(16,16)
fn Clear(@builtin(global_invocation_id) id: vec3<u32>) {
    let sSize = vec2<i32>(camera.size);
    let idx0 = i32(id.x) + i32(sSize.x)*i32(id.y);
    if(idx0<0 || idx0>=sSize.x*sSize.y) { return; }
    atomicStore(&atomic_storage[idx0*4+0], 0);
    atomicStore(&atomic_storage[idx0*4+1], 0);
    atomicStore(&atomic_storage[idx0*4+2], 0);
    atomicStore(&atomic_storage[idx0*4+3], 0);
}

// Rasterize
@compute @workgroup_size(16,16)
fn Rasterize(@builtin(global_invocation_id) id: vec3<u32>) {
    let w = getScreenSize().x;
    let h = getScreenSize().y;
    let mouseX = uniforms[2];
    let mouseY = uniforms[3];
    let ang = vec2<f32>(mouseX, mouseY)*vec2<f32>(-TWO_PI, PI)/vec2<f32>(w,h) + vec2<f32>(0.4,0.4);
    SetCamera(ang, FOV);

    let frame = u32(uniforms[0]);
    state = vec4<u32>(id.x, id.y, id.z, frame);

    let samples = uniforms[6];
    let total = i32(samples*MaxSamples+1.0);
    for(var i=0; i<total; i=i+1) {
        let rand = nrand4(1.0, vec4<f32>(0.0));
        var pos = 0.2*rand.xyz;
        var col = 0.5 + 0.5*sin(10.0*pos);

        let sec = 5.0 + uniforms[7]*uniforms[1];
        pos = pos + sin(vec3<f32>(2.0,1.0,1.5)*sec)*0.1*sin(30.0*uniforms[8]*pos);
        pos = pos + sin(vec3<f32>(2.0,1.0,1.5)*sec)*0.02*sin(30.0*uniforms[9]*pos.zxy);

        RasterizePoint(pos, col);
    }
}

// main_image
@compute @workgroup_size(16,16)
fn main_image(@builtin(global_invocation_id) id: vec3<u32>) {
    let sSize = vec2<u32>(camera.size);
    if(id.x>=sSize.x || id.y>=sSize.y) { return; }
    let col = SampleBlur(vec2<i32>(i32(id.x),i32(id.y)));
    textureStore(screen, vec2<i32>(i32(id.x), i32(id.y)), vec4<f32>(col,1.0));
}
`;

    async function initWebGPUStuff() {
      // 5) Wait for WebGPU to initialize
      await renderer.init();

      // 6) Grab the device from Three's renderer
      device = renderer.device;
      if (!device) {
        return console.log('wtf')
        //throw new Error('WebGPU device not available!');
      }

      const width = renderer.domElement.width;
      const height = renderer.domElement.height;

      // CREATE BUFFERS/TEXTURES
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

      // CREATE SHADER + PIPELINES
      const shaderModule = device.createShaderModule({
        code: wgslCode
      });

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

      // BIND GROUP
      const bindGroupLayout = pipelineClear.getBindGroupLayout(0);
      bindGroup = device.createBindGroup({
        layout: bindGroupLayout,
        entries: [
          {
            binding: 0,
            resource: {
              buffer: atomicStorageBuffer
            }
          },
          {
            binding: 1,
            resource: screenTexture.createView()
          },
          {
            binding: 2,
            resource: {
              buffer: uniformBuffer
            }
          }
        ]
      });
    }

    // 7) ANIMATION + DISPATCH
    const clock = new THREE.Clock();

    function animate() {
      uniformsData.timeFrame++;
      uniformsData.timeElapsed += clock.getDelta();

      // If you want, track mouse here:
      // uniformsData.mousePos = [mouseX, mouseY];

      // Write new uniform data each frame
      const u = createUniformsFloat32();
      if (device) {
        device.queue.writeBuffer(uniformBuffer, 0, u);
      }

      // Dispatch compute
      if (device) {
        const commandEncoder = device.createCommandEncoder();

        // CLEAR
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

        // RASTERIZE
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

        // MAIN_IMAGE
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

        device.queue.submit([commandEncoder.finish()]);
      }

      // Finally render the scene with Three.js
      renderer.render(scene, camera);

      animationId = requestAnimationFrame(animate);
    }

    // 8) Init all, then start
    initWebGPUStuff()
      .then(() => {
        animate();
      })
      .catch(console.error);

    // Cleanup on unmount
    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      // Dispose geometry, etc. if you like:
      geometry.dispose();
      material.dispose();
    };
  }, [device]);

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
