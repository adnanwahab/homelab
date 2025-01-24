
//import particles from './particles.ts';
//particles();

import tsl_test from './tsl_test.ts';
tsl_test();

// import * as THREE from 'three/webgpu';
//import * as TSL from 'three/webgpu';
// import Transpiler from 'three/addons/transpiler/Transpiler.js';
// import ShaderToyDecoder from 'three/addons/transpiler/ShaderToyDecoder.js';
// import TSLEncoder from 'three/addons/transpiler/TSLEncoder.js';

// If you're also using the standard three.js imports in your scene, you can rename them, for instance:
// import * as ThreeCore from 'three'; 
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// etc.

// (2) Define a helper class to handle the Shadertoy code:
//console.log(THREE)



// class ShaderToyNode extends THREE.Node {

//     constructor() {
//         super( 'vec4' );
//         this.mainImage = null;
//     }

//     transpile( glsl, iife = false ) {

//         const decoder = new ShaderToyDecoder();
//         const encoder = new TSLEncoder();
//         encoder.iife = iife;
//         encoder.uniqueNames = true;

//         // Convert from ShaderToy fragment to TSL JS code
//         return new Transpiler( decoder, encoder ).parse( glsl );

//     }

//     parse( glsl ) {

//         const jsCode = this.transpile( glsl, true );
//         // Use eval, then store the mainImage function reference
//         const { mainImage } = eval( jsCode )( TSL );
//         this.mainImage = mainImage;

//     }

//     async parseAsync( glsl ) {

//         const jsCode = this.transpile( glsl );
//         const { mainImage } = await import( `data:text/javascript,${ encodeURIComponent( jsCode ) }` );
//         this.mainImage = mainImage;

//     }

//     setup( builder ) {

//         if ( this.mainImage === null ) {
//             throw new Error( 'ShaderToyNode: .parse() must be called first.' );
//         }

//         // Return the final node expression
//         return this.mainImage();

//     }

// }

// // (3) Wrap the Shadertoy demo into a function so you can call it anywhere in your code.
// //     For example, you might call it after your existing physics or scene setup is done.

// export function initShadertoyDemo() {

//     // Grab the text content from your <script> tags in HTML:
//     const example1Code = document.getElementById( 'example1' ).textContent;
//     const example2Code = document.getElementById( 'example2' ).textContent;

//     // Setup two separate Shadertoy nodes:
//     const shaderToy1Node = new ShaderToyNode();
//     shaderToy1Node.parse( example1Code );

//     const shaderToy2Node = new ShaderToyNode();
//     shaderToy2Node.parse( example2Code );

//     // Orthographic camera for the 2D fullscreen quad
//     const camera = new THREE.OrthographicCamera( -1, 1, 1, -1, 0, 1 );
//     const scene = new THREE.Scene();

//     // The plane covers the whole screen (-1..1)
//     const geometry = new THREE.PlaneGeometry( 2, 2 );

//     // We use Three's "NodeMaterial" so we can plug in TSL logic:
//     const material = new THREE.MeshBasicNodeMaterial();

//     // The snippet below line-mixes the two Shadertoy nodes with an oscillating sine-based factor:
//     material.colorNode = TSL.oscSine( TSL.time.mul( 0.3 ) ).mix( shaderToy1Node, shaderToy2Node );

//     // Create quad in the scene:
//     const quad = new THREE.Mesh( geometry, material );
//     scene.add( quad );

//     // Create a WebGPU renderer (set your desired options):
//     const renderer = new THREE.WebGPURenderer( { antialias: true } );
//     renderer.setPixelRatio( window.devicePixelRatio );
//     renderer.setSize( window.innerWidth, window.innerHeight );
//     renderer.outputColorSpace = THREE.LinearSRGBColorSpace;

//     document.body.appendChild( renderer.domElement );

//     // Adjust on window resize
//     window.addEventListener( 'resize', function onWindowResize() {

//         camera.aspect = window.innerWidth / window.innerHeight;
//         camera.updateProjectionMatrix();
//         renderer.setSize( window.innerWidth, window.innerHeight );

//     } );

//     // Simple animation loop
//     function animate() {
//         renderer.render( scene, camera );
//     }

//     renderer.setAnimationLoop( animate );
// }


// import { loadGLTFModel } from "./utils/gltf-loader.js";
// import { Clock } from "three";
// import { initGraphics } from "./initGraphics.js";
// import { onWindowResize } from "./onWindowResize.js";
// import { initPhysics } from "./initPhysics.js";
// import { renderLoop } from "./renderLoop.js";
// import { setupExample } from "./setupExample.js";
// import { handleUserInput } from "./utils/handleUserInput.js";
// import initJolt from "./utils/jolt-physics.wasm-compat.js";
// import AudioVisualizer from "./utils/play_karaoke.js";
// //import lyricDetector from './utils/lyricDetector.js';
// import * as THREE from "three";
// import editScene from "./utils/edit_scene.js";
// new AudioVisualizer();
// //import tsl from 'three/tsl'
// import { setupLighting } from "./lighting.js";



// import initGenerateObject from "./mutateScene.ts";



// const size = { width: innerWidth * .9, height: innerHeight * .9 };
// const container = document.getElementById("container");
// const canvas = document.querySelector("canvas");
// const { renderer, scene, camera, controls } = initGraphics(
//     canvas,
//     container,
//     size,
// );

// setupLighting(scene);

// const inputState = {
//     forwardPressed: false,
//     backwardPressed: false,
//     leftPressed: false,
//     rightPressed: false,
//     jump: false,
//     crouched: false,
// };
// const clock = new Clock();

// const onExampleUpdateRef = { fn: null };

// initJolt().then(async (Jolt) => {
//     await renderer.init();
//     const { joltInterface, physicsSystem, bodyInterface } = initPhysics(Jolt);
//     // // 3) Collect dynamic objects in array
//     const dynamicObjects = [];
//     // // 4) Set up your environment, spawn character, define onExampleUpdate
//     setupExample(
//         Jolt,
//         bodyInterface,
//         scene,
//         dynamicObjects,
//         onExampleUpdateRef,
//     );
//     //editScene(scene);
//     // // 6) Prepare user input
//     handleUserInput(inputState);
//     // // 7) Provide a custom update function that calls the function from onExampleUpdateRef
//     function onExampleUpdate(time, deltaTime) {
//         // If setupExample assigned a function, call it
//         if (onExampleUpdateRef.fn) {
//             onExampleUpdateRef.fn(time, deltaTime, inputState);
//         }
//     }

//     let generateObject = initGenerateObject(Jolt, physicsSystem, scene);

//     document.getElementById('add-objects').addEventListener('click', () => {
//         generateObject();
//     });
    

//     // 8) Start render loop
//     renderLoop(
//         clock,
//         onExampleUpdate,
//         renderer,
//         scene,
//         camera,
//         joltInterface,
//         dynamicObjects,
//         Jolt,
//         controls,
//         {},
//     );
// });

// // const textureLoader = new THREE.TextureLoader();
// // textureLoader.load( 'textures/hardwood2_diffuse.jpg', function ( map ) {

// //   map.wrapS = THREE.RepeatWrapping;
// //   map.wrapT = THREE.RepeatWrapping;
// //   map.anisotropy = 16;
// //   map.repeat.set( 4, 4 );
// //   map.colorSpace = THREE.SRGBColorSpace;
// //   groundMaterial.map = map;
// //   groundMaterial.needsUpdate = true;

// // } );

// //lyricDetector()
// //new AudioVisualizer()
// //editScene()

// // import { renderHelmet } from './renderHelmet.js'
// // renderHelmet()
