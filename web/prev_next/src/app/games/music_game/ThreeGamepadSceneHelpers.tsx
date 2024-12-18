import * as THREE from 'three';

const AUDIO_URL = '/music_game.mp3';

export const initRendering = ({
    mountRef,
    sceneRef,
    cameraRef,
    rendererRef,
    cubesRef,
    isMouseDownRef,
    prevMouseXRef,
    prevMouseYRef,
    keysRef,
    gamepadIndexRef,
    baseCubeColor

}) => {
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

    // Create cubes
    createCubes(sceneRef, cubesRef, baseCubeColor);

    // Event listeners for rendering
    window.addEventListener('resize', () => onWindowResize(cameraRef, rendererRef), false);
    document.addEventListener('mousedown', (e) => onMouseDown(e, isMouseDownRef, prevMouseXRef, prevMouseYRef));
    document.addEventListener('mouseup', () => onMouseUp(isMouseDownRef));
    document.addEventListener('mousemove', (e) => onMouseMove(e, isMouseDownRef, prevMouseXRef, prevMouseYRef, cameraRef));
    document.addEventListener('keydown', (e) => onKeyDown(e, keysRef));
    document.addEventListener('keyup', (e) => onKeyUp(e, keysRef));

    // Gamepad event listeners
    window.addEventListener('gamepadconnected', (e) => onGamepadConnected(e, gamepadIndexRef));
    window.addEventListener('gamepaddisconnected', (e) => onGamepadDisconnected(e, gamepadIndexRef));
};

export const cleanupRendering = (mountRef, rendererRef, cubesRef) => {
    window.removeEventListener('resize', onWindowResize);
    window.removeEventListener('gamepadconnected', onGamepadConnected);
    window.removeEventListener('gamepaddisconnected', onGamepadDisconnected);

    document.removeEventListener('mousedown', onMouseDown);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('keydown', onKeyDown);
    document.removeEventListener('keyup', onKeyUp);

    cubesRef.current.forEach(cube => {
        cube.geometry.dispose();
        cube.material.dispose();
    });
    rendererRef.current.dispose();
    if (mountRef.current && rendererRef.current.domElement.parentNode === mountRef.current) {
        mountRef.current.removeChild(rendererRef.current.domElement);
    }
};

export const initAudio = (audioContextRef, analyserRef, frequencyDataRef) => {
    setupAudio(audioContextRef, analyserRef, frequencyDataRef);
};

export const cleanupAudio = (audioContextRef) => {
    if (audioContextRef.current) {
        audioContextRef.current.close();
        audioContextRef.current = null;
    }
};

const setupAudio = async (audioContextRef, analyserRef, frequencyDataRef) => {
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        audioContextRef.current = audioContext;

        const response = await fetch(AUDIO_URL);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

        const source = audioContext.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 256;
        analyserRef.current = analyser;
        frequencyDataRef.current = new Uint8Array(analyser.frequencyBinCount);

        source.connect(analyser);
        analyser.connect(audioContext.destination);

        if (audioContext.state === 'suspended') {
            await audioContext.resume();
        }

        source.start(0);
    } catch (error) {
        console.error('Error initializing audio:', error);
    }
};

// Create cubes
const createCubes = (sceneRef, cubesRef, baseCubeColor) => {
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
        sceneRef.current.add(cube);
        cubes.push(cube);
    }
    cubesRef.current = cubes;
};

// Event handlers
const onWindowResize = (cameraRef, rendererRef) => {
    cameraRef.current.aspect = window.innerWidth / window.innerHeight;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(window.innerWidth, window.innerHeight);
};

const onMouseDown = (e, isMouseDownRef, prevMouseXRef, prevMouseYRef) => {
    isMouseDownRef.current = true;
    prevMouseXRef.current = e.clientX;
    prevMouseYRef.current = e.clientY;
};

const onMouseUp = (isMouseDownRef) => {
    isMouseDownRef.current = false;
};

const onMouseMove = (e, isMouseDownRef, prevMouseXRef, prevMouseYRef, cameraRef) => {
    if (isMouseDownRef.current) {
        const deltaX = e.clientX - prevMouseXRef.current;
        const deltaY = e.clientY - prevMouseYRef.current;
        prevMouseXRef.current = e.clientX;
        prevMouseYRef.current = e.clientY;

        const lookSpeed = 0.002;
        cameraRef.current.rotation.y -= deltaX * lookSpeed;
        cameraRef.current.rotation.x -= deltaY * lookSpeed;
        cameraRef.current.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraRef.current.rotation.x));
    }
};

const onKeyDown = (e, keysRef) => {
    if (keysRef.current.hasOwnProperty(e.code)) {
        keysRef.current[e.code] = true;
    }
};

const onKeyUp = (e, keysRef) => {
    if (keysRef.current.hasOwnProperty(e.code)) {
        keysRef.current[e.code] = false;
    }
};

const onGamepadConnected = (e, gamepadIndexRef) => {
    console.log('Gamepad connected:', e.gamepad);
    gamepadIndexRef.current = e.gamepad.index;
};

const onGamepadDisconnected = (e, gamepadIndexRef) => {
    console.log('Gamepad disconnected:', e.gamepad);
    if (gamepadIndexRef.current === e.gamepad.index) {
        gamepadIndexRef.current = null;
    }
};

// Gamepad & Update logic
const pollGamepads = (gamepadIndexRef) => {
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

export const updateFromGamepad = (gamepadIndexRef, cameraRef, cubesRef, baseCubeColor) => {
    const gp = pollGamepads(gamepadIndexRef);
    if (!gp) return;

    // Axes
    const leftStickX = gp.axes[0] || 0;
    const leftStickY = gp.axes[1] || 0;
    const rightStickX = gp.axes[2] || 0;
    const rightStickY = gp.axes[3] || 0;

    // Button X
    const buttonX = gp.buttons[0].pressed;
    cubesRef.current.forEach(cube => {
        cube.material.color.set(buttonX ? 0xff00ff : new THREE.Color(baseCubeColor));
    });

    // Movement & look (gamepad)
    const moveSpeed = 0.1;
    const lookSpeed = 0.02;

    // Rotate camera with right stick
    cameraRef.current.rotation.y -= rightStickX * lookSpeed;
    cameraRef.current.rotation.x -= rightStickY * lookSpeed;
    cameraRef.current.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, cameraRef.current.rotation.x));

    // Move camera with left stick
    const forwardVector = new THREE.Vector3();
    cameraRef.current.getWorldDirection(forwardVector);
    forwardVector.normalize();

    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(cameraRef.current.up, forwardVector).normalize().multiplyScalar(-1);

    cameraRef.current.position.addScaledVector(forwardVector, -leftStickY * moveSpeed);
    cameraRef.current.position.addScaledVector(rightVector, leftStickX * moveSpeed);
};

export const updateFromKeyboard = (cameraRef, keysRef) => {
    const moveSpeed = 0.1;
    const forwardVector = new THREE.Vector3();
    cameraRef.current.getWorldDirection(forwardVector);
    forwardVector.normalize();

    const rightVector = new THREE.Vector3();
    rightVector.crossVectors(cameraRef.current.up, forwardVector).normalize().multiplyScalar(-1);

    // Move forward/back
    if (keysRef.current.KeyW) cameraRef.current.position.addScaledVector(forwardVector, moveSpeed);
    if (keysRef.current.KeyS) cameraRef.current.position.addScaledVector(forwardVector, -moveSpeed);

    // Move left/right
    if (keysRef.current.KeyA) cameraRef.current.position.addScaledVector(rightVector, -moveSpeed);
    if (keysRef.current.KeyD) cameraRef.current.position.addScaledVector(rightVector, moveSpeed);

    // Move up/down (Q/E)
    const upVector = new THREE.Vector3(0, 1, 0);
    if (keysRef.current.KeyQ) cameraRef.current.position.addScaledVector(upVector, moveSpeed);
    if (keysRef.current.KeyE) cameraRef.current.position.addScaledVector(upVector, -moveSpeed);
};

export const updateCubesFromAudio = (analyserRef, frequencyDataRef, cubesRef) => {
    if (!analyserRef.current) return;
    analyserRef.current.getByteFrequencyData(frequencyDataRef.current);

    let sum = 0;
    for (let i = 0; i < frequencyDataRef.current.length; i++) {
        sum += frequencyDataRef.current[i];
    }
    const avg = sum / frequencyDataRef.current.length;

    const scale = 0.5 + (avg / 255) * 1.5;
    cubesRef.current.forEach((cube) => {
        cube.scale.set(scale, scale, scale);
    });
};

export const setBaseCubeColorOnCubes = (cubesRef, baseCubeColor) => {
    cubesRef.current.forEach(cube => {
        cube.material.color.set(new THREE.Color(baseCubeColor));
    });
};
