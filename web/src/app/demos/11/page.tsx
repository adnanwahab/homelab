"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three/webgpu";
import WebGPU from "three/addons/capabilities/WebGPU.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GUI } from "three/addons/libs/lil-gui.module.min.js";

import Transpiler from 'three/addons/transpiler/Transpiler.js';
import ShaderToyDecoder from 'three/addons/transpiler/ShaderToyDecoder.js';
import TSLEncoder from 'three/addons/transpiler/TSLEncoder.js';


// class ShaderToyNode extends THREE.Node {

//   constructor() {

//     super( 'vec4' );

//     this.mainImage = null;

//   }

//   transpile( glsl, iife = false ) {

//     const decoder = new ShaderToyDecoder();

//     const encoder = new TSLEncoder();
//     encoder.iife = iife;
//     encoder.uniqueNames = true;

//     const jsCode = new Transpiler( decoder, encoder ).parse( glsl );

//     return jsCode;

//   }

//   parse( glsl ) {

//     const jsCode = this.transpile( glsl, true );

//     const { mainImage } = eval( jsCode )( TSL );

//     this.mainImage = mainImage;

//   }

//   async parseAsync( glsl ) {

//     const jsCode = this.transpile( glsl );

//     const { mainImage } = await import( `data:text/javascript,${ encodeURIComponent( jsCode ) }` );

//     this.mainImage = mainImage;

//   }

//   setup( builder ) {

//     if ( this.mainImage === null ) {

//       throw new Error( 'ShaderToyNode: .parse() must be called first.' );

//     }

//     return this.mainImage();

//   }


// }

import example1Code from './shaderToy1';
import example2Code from './shaderToy2';

// TSL imports
import {
  atan, cos, float, max, min, mix, PI, PI2, sin,
  vec2, vec3, color, Fn, hash, hue, If, instanceIndex, Loop,
  mx_fractal_noise_float, mx_fractal_noise_vec3, pass, pcurve,
  storage, deltaTime, time, uv, uniform
} from "three/tsl";

import ShaderToyNode from './ShaderToyNode';

// Bloom TSL import
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { TSL } from "three/webgpu";
import { MeshBasicNodeMaterial } from 'three/nodes';


const wgslVertex = `
struct Uniforms {
    iResolution : vec2<f32>,
    iTime       : f32,
    iMouse      : vec4<f32>,
};

@group(0) @binding(0) var<uniform> uniforms : Uniforms;

struct VertexInput {
    @location(0) position : vec3<f32>,
    @location(1) uv       : vec2<f32>,
};

struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) vUV : vec2<f32>,
};

@vertex
fn vert_main(input: VertexInput) -> VertexOutput {
    var out : VertexOutput;
    out.Position = vec4<f32>(input.position, 1.0);
    out.vUV = input.uv;
    return out;
}
`;

    const wgslFragment = `
// ... Paste the frag_main WGSL code from above ...
// Make sure to match the layout with your Uniforms struct or remove any mismatch.
@group(0) @binding(0)
var<uniform> uniforms : Uniforms;

let PI    : f32 = 3.1415926535;
let TAU   : f32 = 6.2831853070;
let SCALE : f32 = 1.0;

fn gm(
    rgb    : vec3<f32>,
    param  : f32,
    t      : f32,
    w      : f32,
    d      : f32,
    invert : bool
) -> vec3<f32> {
    // Placeholder
    return vec3<f32>(0.0);
}

fn ds(
    uv     : vec2<f32>,
    se     : f32,
    t      : f32,
    px     : f32,
    param4 : f32,
    param5 : f32
) -> f32 {
    // Placeholder
    return 0.0;
}

struct VertexOutput {
    @builtin(position) Position : vec4<f32>,
    @location(0) vUV : vec2<f32>,
};

@fragment
fn frag_main(in: VertexOutput) -> @location(0) vec4<f32> {
    let R       = uniforms.iResolution;
    let iTime   = uniforms.iTime;
    var m       = uniforms.iMouse;
    let XY      = in.vUV * R;

    var t = iTime / PI * 2.0;

    // Remap mouse if needed
    if (R.x > 0.0 && R.y > 0.0) {
        m.x = (m.x * 2.0 / R.x) - 1.0;
        m.y = (m.y * 2.0 / R.y) - 1.0;
    }

    if (m.z > 0.0) {
        t = t + m.y * SCALE;
    }

    let z = if (m.z > 0.0) {
        pow(1.0 - abs(m.y), sign(m.y))
    } else {
        1.0
    };

    let e = if (m.z > 0.0) {
        pow(1.0 - abs(m.x), -sign(m.x))
    } else {
        1.0
    };

    let se = if (m.z > 0.0) {
        e * -sign(m.y)
    } else {
        1.0
    };

    var bg = vec3<f32>(0.0);

    let aa = 3.0;
    for (var j = 0; j < 3; j = j + 1) {
        for (var k = 0; k < 3; k = k + 1) {
            var c = vec3<f32>(0.0);
            let o = vec2<f32>(f32(j), f32(k)) / aa;
            var uv = (XY - 0.5 * R + o) / R.y * SCALE * z;

            if (m.z > 0.0) {
                let signUV = sign(uv);
                let absUV  = abs(uv);
                let logUV  = log(absUV);
                let mulUV  = logUV * e;
                uv = exp(mulUV) * signUV;
            }

            let fw = abs(dpdx(uv)) + abs(dpdy(uv));
            let px = length(fw);

            let x = uv.x;
            let y = uv.y;
            let l = length(uv);

            let mc = (x*x + y*y - 1.0) / y;
            let g  = min(abs(mc), 1.0 / abs(mc));
            let gold = vec3<f32>(1.0, 0.6, 0.0) * g * l;
            let blue = vec3<f32>(0.3, 0.5, 0.9) * (1.0 - g);
            let rgb  = max(gold, blue);

            let w = 0.1;
            let d = 0.4;
            c = max(c, gm(rgb, mc, -t, w, d, false));
            c = max(c, gm(rgb, abs(y/x)*sign(y), -t, w, d, false));
            c = max(c, gm(rgb, (x*x)/(y*y)*sign(y), -t, w, d, false));
            c = max(c, gm(rgb, (x*x) + (y*y), t, w, d, true));

            c = c + rgb * ds(uv, se, t/TAU, px*2.0, 2.0, 0.0);
            c = c + rgb * ds(uv, se, t/TAU, px*2.0, 2.0, PI);
            c = c + rgb * ds(uv, -se, t/TAU, px*2.0, 2.0, 0.0);
            c = c + rgb * ds(uv, -se, t/TAU, px*2.0, 2.0, PI);
            c = max(c, vec3<f32>(0.0));

            c = c + pow(max(1.0 - l, 0.0), 3.0 / z);

            if (m.z > 0.0) {
                let xyg  = abs(fract(uv + 0.5) - 0.5) / px;
                let grid = 1.0 - min(min(xyg.x, xyg.y), 1.0);
                c.g = c.g + 0.2 * grid;
                c.b = c.b + 0.2 * grid;
            }

            bg = bg + c;
        }
    }

    bg = bg / (aa * aa);
    bg = bg * sqrt(bg) * 1.5;

    return vec4<f32>(bg, 1.0);
}
`;

export default function Page() {

  const canvasRef = useRef<HTMLCanvasElement>(null);
  //let material: THREE.RawShaderMaterial;

  useEffect(() => {

    // Make sure we have a valid canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Check if WebGPU is available
    if (WebGPU.isAvailable() === false) {
      console.error("No WebGPU support in this browser.");
      return;
    }

    // ========== Variables and Setup ==========

    let camera: THREE.PerspectiveCamera, scene: THREE.Scene;
    let renderer: THREE.WebGPURenderer, postProcessing: any, controls: OrbitControls, clock: THREE.Clock;


    const screenPointer = new THREE.Vector2();
    const scenePointer = new THREE.Vector3();
    const raycastPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();

    // ========== Initialization Function ==========
    function init() {

      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(0, 0, 10);

      scene = new THREE.Scene();

      clock = new THREE.Clock();

      // Renderer (attach to our ref canvas)
      renderer = new THREE.WebGPURenderer({ canvas, antialias: true });
      renderer.setClearColor(0x14171a);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

   

      const backgroundMaterial = new THREE.MeshStandardNodeMaterial();
      // backgroundMaterial.roughness = 0.4;
      // backgroundMaterial.metalness = 0.9;
      // backgroundMaterial.flatShading = true;
      // backgroundMaterial.colorNode = color(0xff0000);

      // const backgroundMesh = new THREE.Mesh(backgroundGeom, backgroundMaterial);
      // scene.add(backgroundMesh);


    // Create a plane geometry that fills the screen
    const geometry = new THREE.PlaneGeometry(10, 10);

    const uniformsData = new Float32Array(8); // 2 for resolution, 1 for time, 4 for mouse, 1 padding

    // Create the material specifically for WebGPU

    const shaderToy1Node = new ShaderToyNode();
    //shaderToy1Node.parse( example1Code );

    const shaderToy2Node = new ShaderToyNode();
    //shaderToy2Node.parse( example2Code );

    let material_1 = new THREE.MeshBasicNodeMaterial({
      color: 0x00ff00,
      // vertexShader: `
      //   varying vec2 vUv;
      //   void main() {
      //     vUv = uv;
      //     gl_Position = vec4(position, 1.0);
      //   }
      // `,
      //fragmentShader: wgslFragment,
      // uniforms: {
      //   iResolution: { value: new THREE.Vector2() },
      //   iTime: { value: 0 },
      //   iMouse: { value: new THREE.Vector4() }
      // }
    });
    // const shaderMaterial = new THREE.ShaderMaterial({
    //   glslVersion: THREE.GLSL3,
    //   uniforms: {
    //     time: { value: 0 },
    //     resolution: { value: new THREE.Vector2() }
    //   },
      
    //   // Vertex shader in WGSL
    //   vertexShader: `
    //     @vertex
    //     fn main(
    //       @location(0) position: vec3<f32>,
    //       @location(1) uv: vec2<f32>
    //     ) -> VertexOutput {
    //       var output: VertexOutput;
    //       output.position = vec4<f32>(position, 1.0);
    //       output.uv = uv;
    //       return output;
    //     }
    //   `,
      
    //   // Fragment shader in WGSL for flame effect
    //   fragmentShader: `
    //     @fragment
    //     fn main(
    //       @location(0) uv: vec2<f32>
    //     ) -> @location(0) vec4<f32> {
    //       let time = uniforms.time;
    //       var p = uv * 2.0 - 1.0;
          
    //       // Flame base calculation
    //       var color = vec3<f32>(0.0);
    //       for(var i = 0.0; i < 3.0; i += 1.0) {
    //         p.y += (0.1 + sin(time * 0.5) * 0.05) / (abs(p.x) * 2.0 + 0.1);
    //         let intensity = 0.06 / abs(p.y - 0.3);
    //         color += vec3<f32>(intensity * (1.0 + i * 0.1), intensity * 0.5, intensity * 0.1);
    //       }
          
    //       return vec4<f32>(color, 1.0);
    //     }
    //   `
    // });


    //let material = new THREE.MeshBasicNodeMaterial();
    //material.colorNode = TSL.oscSine( TSL.time.mul( .3 ) ).mix( shaderToy1Node, shaderToy2Node );

    //material_1.colorNode = TSL.oscSine( TSL.time.mul( .3 ) ).mix( shaderToy1Node, shaderToy2Node );

    const mesh = new THREE.Mesh(geometry, material_1);
    scene.add(mesh);

      // === Orbit Controls ===
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      //controls.autoRotate = true;
      controls.maxDistance = 75;

      // === Event Listeners ===
      // window.addEventListener("resize", onWindowResize);
      // window.addEventListener("pointermove", onPointerMove);

      // === GUI ===
   
      // === Start animation ===
      renderer.setAnimationLoop(animate);
    }

    // === Handle resize ===
    // function onWindowResize() {
    //   if (!camera) return;
    //   camera.aspect = window.innerWidth / window.innerHeight;
    //   camera.updateProjectionMatrix();
    //   renderer?.setSize(window.innerWidth, window.innerHeight);
    // }

    // === Pointer Move ===
    function onPointerMove(e: PointerEvent) {
      screenPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      screenPointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    // === Update pointer intersection ===
    function updatePointer() {
      raycaster.setFromCamera(screenPointer, camera);
      raycaster.ray.intersectPlane(raycastPlane, scenePointer);
    }

    const startTime = performance.now();
    // === Animation Loop ===
    function animate() {
      //renderer.compute(updateParticles);
//      renderer.compute(spawnParticles);

      // update index for next spawn
      //spawnIndex.value = (spawnIndex.value + nbToSpawn.value) % nbParticles;a

      // update the raycast plane orientation
      // raycastPlane.normal.applyEuler(camera.rotation);
      // updatePointer();

      // smooth spawn position
      // previousSpawnPosition.value.copy(spawnPosition.value);
      // spawnPosition.value.lerp(scenePointer, 0.1);

      // rotate colors
      const delta = clock.getDelta();
   
      const elapsedTime = clock.getElapsedTime();
      let elapsed = (performance.now() - startTime) * 0.001;

      // light.position.set(
      //   Math.sin(elapsedTime * 0.5) * 30,
      //   Math.cos(elapsedTime * 0.3) * 30,
      //   Math.sin(elapsedTime * 0.2) * 30
      // );
      //material.uniforms.iTime.value = elapsed;

      controls.update();
      //postProcessing.render();
      renderer.render(scene, camera);
    }

    // Initialize everything
    init();

    // === Cleanup on unmount ===
    return () => {
      // If you'd like to remove the GUI and/or kill the renderer
    };

  }, []);

  // The canvas is rendered by Next/React; we attach Three.js to this canvas in our useEffect
  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
