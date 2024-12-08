'use client';
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const ThreeGamepadScene = () => {
    const mountRef = useRef(null);

    const sceneRef = useRef(null);
    const cameraRef = useRef(null);
    const rendererRef = useRef(null);
    const cubesRef = useRef([]);
    const animationFrameIdRef = useRef(null);
    const gamepadIndexRef = useRef(null);

    // Track cube base color in state, controlled by UI
    const [baseCubeColor, setBaseCubeColor] = useState('#9b59b6');

    // Mouse & Keyboard refs
    const isMouseDownRef = useRef(false);
    const prevMouseXRef = useRef(0);
    const prevMouseYRef = useRef(0);
    const keysRef = useRef({
        KeyW: false,
        KeyA: false,
        KeyS: false,
        KeyD: false,
        KeyQ: false,
        KeyE: false,
    });

    // Audio related refs
    const audioContextRef = useRef(null);
    const analyserRef = useRef(null);
    const frequencyDataRef = useRef(null);

    const AUDIO_URL = 'music_game.mp3'; // Replace with your hosted mp3 link

    useEffect(() => {
        // Initialize Three.js scene
        const scene = new THREE.Scene();
        sceneRef.current = scene;

        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        camera.position.set(0, 0, 10);
        cameraRef.current = camera;

        const renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setSize(window.innerWidth, window.innerHeight);

        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }
        rendererRef.current = renderer;

        // Lights
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);

        const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
        dirLight.position.set(10, 10, 10);
        scene.add(dirLight);

        // Cubes
        const NUM_CUBES = 300;
        const AREA_SIZE = 20;
        const CUBE_MIN_SIZE = 0.3;
        const CUBE_MAX_SIZE = 1.5;
        const cubes = [];

        const cubeMaterial = new THREE.MeshStandardMaterial({ color: new THREE.Color(baseCubeColor) });
        for (let i = 0; i < NUM_CUBES; i++) {
            const size = THREE.MathUtils.randFloat(CUBE_MIN_SIZE, CUBE_MAX_SIZE);
            const geometry = new THREE.BoxGeometry(size, size, size);
            const cube = new THREE.Mesh(geometry, cubeMaterial.clone());
            cube.position.set(
                THREE.MathUtils.randFloatSpread(AREA_SIZE),
                THREE.MathUtils.randFloatSpread(AREA_SIZE),
                THREE.MathUtils.randFloatSpread(AREA_SIZE)
            );
            scene.add(cube);
            cubes.push(cube);
        }
        cubesRef.current = cubes;

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        window.addEventListener('resize', onWindowResize, false);

        // Gamepad handlers
        const onGamepadConnected = (e) => {
            console.log("Gamepad connected:", e.gamepad);
            gamepadIndexRef.current = e.gamepad.index;
        };

        const onGamepadDisconnected = (e) => {
            console.log("Gamepad disconnected:", e.gamepad);
            if (gamepadIndexRef.current === e.gamepad.index) {
                gamepadIndexRef.current = null;
            }
        };

        window.addEventListener("gamepadconnected", onGamepadConnected);
        window.addEventListener("gamepaddisconnected", onGamepadDisconnected);

        // Mouse events
        const onMouseDown = (e) => {
            isMouseDownRef.current = true;
            prevMouseXRef.current = e.clientX;
            prevMouseYRef.current = e.clientY;
        };

        const onMouseUp = () => {
            isMouseDownRef.current = false;
        };

        const onMouseMove = (e) => {
            if (isMouseDownRef.current) {
                const deltaX = e.clientX - prevMouseXRef.current;
                const deltaY = e.clientY - prevMouseYRef.current;
                prevMouseXRef.current = e.clientX;
                prevMouseYRef.current = e.clientY;

                const lookSpeed = 0.002;
                camera.rotation.y -= deltaX * lookSpeed;
                camera.rotation.x -= deltaY * lookSpeed;
                camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));
            }
        };

        // Keyboard events
        const onKeyDown = (e) => {
            if (keysRef.current.hasOwnProperty(e.code)) {
                keysRef.current[e.code] = true;
            }
        };

        const onKeyUp = (e) => {
            if (keysRef.current.hasOwnProperty(e.code)) {
                keysRef.current[e.code] = false;
            }
        };

        document.addEventListener('mousedown', onMouseDown);
        document.addEventListener('mouseup', onMouseUp);
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('keydown', onKeyDown);
        document.addEventListener('keyup', onKeyUp);

        // Setup Audio
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
        const audio = new Audio();
        audio.src = AUDIO_URL;
        audio.crossOrigin = 'anonymous';
        audio.loop = true;

        // Function to start audio after user interaction
        const startAudioOnInteraction = () => {
            audio.play().then(() => {
                console.log("Audio playback started.");
            }).catch(err => {
                console.log("Audio playback failed:", err);
            });

            // Remove the event listeners after playing
            document.removeEventListener('mousedown', startAudioOnInteraction);
            document.removeEventListener('mousemove', startAudioOnInteraction);
        };

        // Add event listeners for user interaction
        document.addEventListener('mousedown', startAudioOnInteraction);
        document.addEventListener('mousemove', startAudioOnInteraction);

        const source = audioContextRef.current.createMediaElementSource(audio);
        analyserRef.current = audioContextRef.current.createAnalyser();
        analyserRef.current.fftSize = 256; 
        const bufferLength = analyserRef.current.frequencyBinCount;
        frequencyDataRef.current = new Uint8Array(bufferLength);

        source.connect(analyserRef.current);
        analyserRef.current.connect(audioContextRef.current.destination);

        const pollGamepads = () => {
            const gamepads = navigator.getGamepads ? navigator.getGamepads() : [];
            if (gamepadIndexRef.current !== null && gamepads[gamepadIndexRef.current]) {
                return gamepads[gamepadIndexRef.current];
            } else {
                for (let i = 0; i < gamepads.length; i++) {
                    if (gamepads[i]) {
                        gamepadIndexRef.current = i;
                        return gamepads[i];
                    }
                }
            }
            return null;
        };

        const updateFromGamepad = () => {
            const gp = pollGamepads();
            if (!gp) return;

            // Axes
            const leftStickX = gp.axes[0] || 0; 
            const leftStickY = gp.axes[1] || 0; 
            const rightStickX = gp.axes[2] || 0; 
            const rightStickY = gp.axes[3] || 0; 

            // Button X
            const buttonX = gp.buttons[0].pressed;

            // Change cubes color when pressing X
            cubesRef.current.forEach(cube => {
                cube.material.color.set(buttonX ? 0xff00ff : new THREE.Color(baseCubeColor));
            });

            // Movement & look (gamepad)
            const moveSpeed = 0.1;
            const lookSpeed = 0.02;

            const camera = cameraRef.current;

            // Rotate camera with right stick
            camera.rotation.y -= rightStickX * lookSpeed;
            camera.rotation.x -= rightStickY * lookSpeed;
            camera.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, camera.rotation.x));

            // Move camera with left stick
            const forwardVector = new THREE.Vector3();
            camera.getWorldDirection(forwardVector);
            forwardVector.normalize();

            const rightVector = new THREE.Vector3();
            rightVector.crossVectors(camera.up, forwardVector).normalize().multiplyScalar(-1);

            camera.position.addScaledVector(forwardVector, -leftStickY * moveSpeed);
            camera.position.addScaledVector(rightVector, leftStickX * moveSpeed);
        };

        const updateFromKeyboard = () => {
            const moveSpeed = 0.1;
            const camera = cameraRef.current;
            const forwardVector = new THREE.Vector3();
            camera.getWorldDirection(forwardVector);
            forwardVector.normalize();

            const rightVector = new THREE.Vector3();
            rightVector.crossVectors(camera.up, forwardVector).normalize().multiplyScalar(-1);

            // Move forward/back
            if (keysRef.current.KeyW) camera.position.addScaledVector(forwardVector, moveSpeed);
            if (keysRef.current.KeyS) camera.position.addScaledVector(forwardVector, -moveSpeed);

            // Move left/right
            if (keysRef.current.KeyA) camera.position.addScaledVector(rightVector, -moveSpeed);
            if (keysRef.current.KeyD) camera.position.addScaledVector(rightVector, moveSpeed);

            // Move up/down (Q/E)
            const upVector = new THREE.Vector3(0,1,0);
            if (keysRef.current.KeyQ) camera.position.addScaledVector(upVector, moveSpeed);
            if (keysRef.current.KeyE) camera.position.addScaledVector(upVector, -moveSpeed);
        };

        const updateCubesFromAudio = () => {
            // Get frequency data
            analyserRef.current.getByteFrequencyData(frequencyDataRef.current);
            
            // Compute an average amplitude
            let sum = 0;
            for (let i = 0; i < frequencyDataRef.current.length; i++) {
                sum += frequencyDataRef.current[i];
            }
            const avg = sum / frequencyDataRef.current.length;
            
            // Map average amplitude to scale factor
            // avg ranges 0-255. Let’s scale between 0.5 and 2.0
            const scale = 0.5 + (avg / 255) * 1.5;

            cubesRef.current.forEach((cube) => {
                cube.scale.set(scale, scale, scale);
            });
        };

        const animate = () => {
            animationFrameIdRef.current = requestAnimationFrame(animate);
            updateFromGamepad();
            updateFromKeyboard();
            updateCubesFromAudio();
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup
        return () => {
            cancelAnimationFrame(animationFrameIdRef.current);
            window.removeEventListener('resize', onWindowResize);
            window.removeEventListener("gamepadconnected", onGamepadConnected);
            window.removeEventListener("gamepaddisconnected", onGamepadDisconnected);

            document.removeEventListener('mousedown', onMouseDown);
            document.removeEventListener('mouseup', onMouseUp);
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('keydown', onKeyDown);
            document.removeEventListener('keyup', onKeyUp);

            cubes.forEach(cube => {
                cube.geometry.dispose();
                cube.material.dispose();
            });
            renderer.dispose();
            if (mountRef.current && renderer.domElement.parentNode === mountRef.current) {
                mountRef.current.removeChild(renderer.domElement);
            }

            if (audioContextRef.current) {
                audioContextRef.current.close();
            }
        };
    }, [baseCubeColor]);

    return (
        <div style={{position: 'relative', width: '100%', height: '100vh'}}>
            <div id="info" style={{
                position: 'absolute',
                top: '10px',
                left: '10px',
                background: 'rgba(0,0,0,0.5)',
                padding: '10px',
                zIndex: 10,
                fontFamily: 'sans-serif',
                color: '#fff'
            }}>
                <p>Connect a DualSense controller and press any button.</p>
                <p>Left stick: Move around<br/>Right stick: Look around<br/>Hold X (button 0) for a visual cue</p>
                <p><strong>Keyboard Controls:</strong><br/>WASD: Move<br/>Q/E: Move Up/Down<br/>Mouse Drag: Look Around</p>
                <label style={{ display: 'block', marginTop: '10px' }}>
                    Base Cube Color: <input type="color" value={baseCubeColor} onChange={(e) => setBaseCubeColor(e.target.value)} />
                </label>
                <p>Audio Reactive: Cubes scale according to music amplitude</p>
            </div>
            <div ref={mountRef}></div>
        </div>
    );
};

export default ThreeGamepadScene;