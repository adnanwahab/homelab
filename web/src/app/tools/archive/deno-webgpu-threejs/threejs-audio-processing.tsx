
export default function ThreeJsAudioProcessing() {
	return <iframe src="https://threejs.org/examples/?q=webgpu%20audio#webgpu_compute_audio" width="100%" height="500" />
}	

// 'use client'
// import React, { useRef, useEffect, useState } from 'react';
// import * as THREE from 'three';
// //transplant threejs demos ====
// ///
// //three/examples/jsm/renderers/webgpu/WebGPURenderer.js
// //three/examples/jsm/renderers/webgpu/nodes/Nodes.js
// ///
// //import { WebGPURenderer } from  'three/examples/jsm/renderers/WebGPURenderer.js';

// import { WebGPURenderer } from 'three/examples/jsm/renderers/webgpu/WebGPURenderer.js';
// import * as Nodes from 'three/examples/jsm/renderers/webgpu/nodes/Nodes.js';

// import { GUI } from 'lil-gui';

// function AudioProcessingComponent() {
//   const containerRef = useRef();
//   const [started, setStarted] = useState(false);

//   useEffect(() => {
//     if (!started) return;

//     let camera, scene, renderer;
//     let computeNode;
//     let waveBuffer, sampleRate;
//     let waveArray;
//     let currentAudio, currentAnalyser;

//     const analyserBuffer = new Uint8Array(1024);
//     let analyserTexture;

//     const init = async () => {
//       // Audio buffer
//       const soundBuffer = await fetch('/sounds/webgpu-audio-processing.mp3').then(res => res.arrayBuffer());

//       const audioContext = new (window.AudioContext || window.webkitAudioContext)();
//       const audioBuffer = await audioContext.decodeAudioData(soundBuffer);
//       waveBuffer = audioBuffer.getChannelData(0);

//       // Adding extra silence to delay and pitch
//       waveBuffer = new Float32Array([...waveBuffer, ...new Float32Array(200000)]);
//       sampleRate = audioBuffer.sampleRate / audioBuffer.numberOfChannels;

//       // Create WebGPU buffers
//       waveArray = Nodes.instancedArray(waveBuffer);
//       waveArray.setPBO(true);

//       // Parameters
//       const pitch = Nodes.uniform(1.5);
//       const delayVolume = Nodes.uniform(0.2);
//       const delayOffset = Nodes.uniform(0.55);

//       // Compute shader function
//       const computeShaderFn = Nodes.Fn(() => {
//         const index = Nodes.float(Nodes.instanceIndex);

//         // Pitch
//         const time = index.mul(pitch);
//         let wave = waveArray.element(time);

//         // Delay
//         for (let i = 1; i < 7; i++) {
//           const waveOffset = waveArray.element(index.sub(delayOffset.mul(sampleRate).mul(i)).mul(pitch));
//           const waveOffsetVolume = waveOffset.mul(delayVolume.div(i * i));
//           wave = wave.add(waveOffsetVolume);
//         }

//         // Store
//         const waveStorageElementNode = waveArray.element(Nodes.instanceIndex);
//         waveStorageElementNode.assign(wave);
//       });

//       // Compute
//       computeNode = computeShaderFn().compute(waveBuffer.length);

//       // GUI
//       const gui = new GUI();
//       gui.add(pitch, 'value', 0.5, 2, 0.01).name('pitch');
//       gui.add(delayVolume, 'value', 0, 1, 0.01).name('delayVolume');
//       gui.add(delayOffset, 'value', 0.1, 1, 0.01).name('delayOffset');

//       // Renderer
//       const container = containerRef.current;

//       camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 30);

//       // Nodes
//       analyserTexture = new THREE.DataTexture(analyserBuffer, analyserBuffer.length, 1, THREE.RedFormat);

//       const spectrum = Nodes.texture(analyserTexture, Nodes.screenUV.x).x.mul(Nodes.screenUV.y);
//       const backgroundNode = Nodes.color(0x0000ff).mul(spectrum);

//       // Scene
//       scene = new THREE.Scene();
//       scene.backgroundNode = backgroundNode;

//       // Renderer
//       renderer = new WebGPURenderer({ antialias: true });
//       renderer.setPixelRatio(window.devicePixelRatio);
//       renderer.setSize(window.innerWidth, window.innerHeight);
//       renderer.setAnimationLoop(render);

//       container.appendChild(renderer.domElement);

//       // Event listeners
//       window.addEventListener('resize', onWindowResize);

//       playAudioBuffer();
//     };

//     const playAudioBuffer = async () => {
//       if (currentAudio) currentAudio.stop();

//       // Compute audio
//       await renderer.computeAsync(computeNode);

//       const wave = new Float32Array(await renderer.getArrayBufferAsync(waveArray.value));

//       // Play result
//       const audioOutputContext = new (window.AudioContext || window.webkitAudioContext)({ sampleRate });
//       const audioOutputBuffer = audioOutputContext.createBuffer(1, wave.length, sampleRate);
//       audioOutputBuffer.copyToChannel(wave, 0);
//       const source = audioOutputContext.createBufferSource();
//       source.connect(audioOutputContext.destination);
//       source.buffer = audioOutputBuffer;
//       source.start();

//       currentAudio = source;

//       // Visual feedback
//       currentAnalyser = audioOutputContext.createAnalyser();
//       currentAnalyser.fftSize = 2048;
//       source.connect(currentAnalyser);
//     };

//     const onWindowResize = () => {
//       camera.aspect = window.innerWidth / window.innerHeight;
//       camera.updateProjectionMatrix();

//       renderer.setSize(window.innerWidth, window.innerHeight);
//     };

//     const render = () => {
//       if (currentAnalyser) {
//         currentAnalyser.getByteFrequencyData(analyserBuffer);
//         analyserTexture.needsUpdate = true;
//       }

//       renderer.render(scene, camera);
//     };

//     init();

//     // Cleanup on unmount
//     return () => {
//       if (currentAudio) currentAudio.stop();
//       if (renderer) {
//         renderer.dispose();
//         renderer.forceContextLoss();
//         renderer.domElement = null;
//       }
//       window.removeEventListener('resize', onWindowResize);
//     };
//   }, [started]);

//   const handleStart = () => {
//     setStarted(true);
//   };

//   return (
//     <div>
//       {!started && <button onClick={handleStart}>Play</button>}
//       <div ref={containerRef} />
//       <div id="info">
//         <a href="https://threejs.org" target="_blank" rel="noopener noreferrer">
//           three.js
//         </a>{' '}
//         WebGPU - Audio Processing
//         <br />
//         Click on screen to process the audio using WebGPU.
//       </div>
//     </div>
//   );
// }

// export default AudioProcessingComponent;