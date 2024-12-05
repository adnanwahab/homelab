// import React, { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { Fn, uniform, instanceIndex, instancedArray, float, texture, screenUV, color } from 'three/tsl';
// import { GUI } from 'three/addons/libs/lil-gui.module.min.js';

// const ThreeJSComponent = () => {
// 	const startButtonRef = <div>Start</div>;
// 	const containerRef = useRef();
// 	const overlayRef = useRef();

// 	// References for variables that need to persist
// 	const cameraRef = useRef();
// 	const sceneRef = useRef();
// 	const rendererRef = useRef();
// 	const computeNodeRef = useRef();
// 	const waveBufferRef = useRef();
// 	const sampleRateRef = useRef();
// 	const waveArrayRef = useRef();
// 	const currentAudioRef = useRef();
// 	const currentAnalyserRef = useRef();
// 	const analyserBufferRef = useRef(new Uint8Array(1024));
// 	const analyserTextureRef = useRef();

// 	useEffect(() => {
// 		const startButton = startButtonRef.current;
// 		startButton.addEventListener('click', init);

// 		return () => {
// 			startButton.removeEventListener('click', init);
// 		};
// 	}, []);

// 	const playAudioBuffer = async () => {
// 		if (currentAudioRef.current) currentAudioRef.current.stop();

// 		// compute audio
// 		await rendererRef.current.computeAsync(computeNodeRef.current);

// 		const wave = new Float32Array(await rendererRef.current.getArrayBufferAsync(waveArrayRef.current.value));

// 		// play result
// 		const audioOutputContext = new AudioContext({ sampleRate: sampleRateRef.current });
// 		const audioOutputBuffer = audioOutputContext.createBuffer(1, wave.length, sampleRateRef.current);

// 		audioOutputBuffer.copyToChannel(wave, 0);

// 		const source = audioOutputContext.createBufferSource();
// 		source.connect(audioOutputContext.destination);
// 		source.buffer = audioOutputBuffer;
// 		source.start();

// 		currentAudioRef.current = source;

// 		// visual feedback
// 		currentAnalyserRef.current = audioOutputContext.createAnalyser();
// 		currentAnalyserRef.current.fftSize = 2048;

// 		source.connect(currentAnalyserRef.current);
// 	};

// 	const init = async () => {
// 		if (overlayRef.current) {
// 			overlayRef.current.remove();
// 		}

// 		// audio buffer
// 		const soundBuffer = await fetch('sounds/webgpu-audio-processing.mp3').then(res => res.arrayBuffer());
// 		const audioContext = new AudioContext();

// 		const audioBuffer = await audioContext.decodeAudioData(soundBuffer);

// 		waveBufferRef.current = audioBuffer.getChannelData(0);

// 		// adding extra silence to delay and pitch
// 		waveBufferRef.current = new Float32Array([...waveBufferRef.current, ...new Float32Array(200000)]);

// 		sampleRateRef.current = audioBuffer.sampleRate / audioBuffer.numberOfChannels;

// 		// create webgpu buffers
// 		waveArrayRef.current = instancedArray(waveBufferRef.current);

// 		// The Pixel Buffer Object (PBO) is required to get the GPU computed data to the CPU in the WebGL2 fallback.
// 		// As used in `renderer.getArrayBufferAsync( waveArray.value )`.

// 		waveArrayRef.current.setPBO(true);

// 		// params
// 		const pitch = uniform(1.5);
// 		const delayVolume = uniform(0.2);
// 		const delayOffset = uniform(0.55);

// 		// compute (shader-node)
// 		const computeShaderFn = Fn(() => {
// 			const index = float(instanceIndex);

// 			// pitch
// 			const time = index.mul(pitch);

// 			let wave = waveArrayRef.current.element(time);

// 			// delay
// 			for (let i = 1; i < 7; i++) {
// 				const waveOffset = waveArrayRef.current.element(
// 					index.sub(delayOffset.mul(sampleRateRef.current).mul(i)).mul(pitch)
// 				);
// 				const waveOffsetVolume = waveOffset.mul(delayVolume.div(i * i));

// 				wave = wave.add(waveOffsetVolume);
// 			}

// 			// store
// 			const waveStorageElementNode = waveArrayRef.current.element(instanceIndex);
// 			waveStorageElementNode.assign(wave);
// 		});

// 		// compute
// 		computeNodeRef.current = computeShaderFn().compute(waveBufferRef.current.length);

// 		// gui
// 		const gui = new GUI();
// 		gui.add(pitch, 'value', 0.5, 2, 0.01).name('pitch');
// 		gui.add(delayVolume, 'value', 0, 1, 0.01).name('delayVolume');
// 		gui.add(delayOffset, 'value', 0.1, 1, 0.01).name('delayOffset');

// 		// camera
// 		cameraRef.current = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.01, 30);

// 		// nodes
// 		analyserTextureRef.current = new THREE.DataTexture(
// 			analyserBufferRef.current,
// 			analyserBufferRef.current.length,
// 			1,
// 			THREE.RedFormat
// 		);

// 		const spectrum = texture(analyserTextureRef.current, screenUV.x).x.mul(screenUV.y);
// 		const backgroundNode = color(0x0000ff).mul(spectrum);

// 		// scene
// 		sceneRef.current = new THREE.Scene();
// 		sceneRef.current.backgroundNode = backgroundNode;

// 		// renderer
// 		rendererRef.current = new THREE.WebGPURenderer({ antialias: true });
// 		rendererRef.current.setPixelRatio(window.devicePixelRatio);
// 		rendererRef.current.setSize(window.innerWidth, window.innerHeight);
// 		rendererRef.current.setAnimationLoop(render);
// 		containerRef.current.appendChild(rendererRef.current.domElement);

// 		window.addEventListener('resize', onWindowResize);

// 		playAudioBuffer();
// 	};

// 	const onWindowResize = () => {
// 		cameraRef.current.aspect = window.innerWidth / window.innerHeight;
// 		cameraRef.current.updateProjectionMatrix();

// 		rendererRef.current.setSize(window.innerWidth, window.innerHeight);
// 	};

// 	const render = () => {
// 		if (currentAnalyserRef.current) {
// 			currentAnalyserRef.current.getByteFrequencyData(analyserBufferRef.current);

// 			analyserTextureRef.current.needsUpdate = true;
// 		}

// 		rendererRef.current.render(sceneRef.current, cameraRef.current);
// 	};

// 	useEffect(() => {
// 		return () => {
// 			// Clean up when the component is unmounted
// 			if (rendererRef.current && rendererRef.current.dispose) {
// 				rendererRef.current.dispose();
// 			}
// 		};
// 	}, []);

// 	return (
// 		<div>
// 			<div ref={overlayRef} id="overlay">
// 				{startButtonRef}
// 				<div  id="startButton">
// 					Start
// 				</div>
// 			</div>
// 			<div ref={containerRef}></div>
// 		</div>
// 	);
// };

function ThreeJSComponent() {
	return <div>ThreeJSComponent</div>;
}	

export default ThreeJSComponent