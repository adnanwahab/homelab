'use client'; // if using Next.js App Router, otherwise not needed
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CanvasContainer = () => {
  const mountRef = useRef(null);
  
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const pointCloudRef = useRef(null);
  const animationIdRef = useRef(null);

  useEffect(() => {
    initScene();
    initPointCloud();
    animate();

    window.addEventListener('resize', onWindowResize);
    document.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      document.removeEventListener('keydown', onKeyDown);
      cancelAnimationFrame(animationIdRef.current);
      cleanup();
    };
  }, []);

  const initScene = () => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 50);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Light (if needed)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Directional light for subtle shading of UI elements if you add any 3D geometry
    const dirLight = new THREE.DirectionalLight(0xffffff, 0.5);
    dirLight.position.set(10, 10, 10);
    scene.add(dirLight);
  };

  const initPointCloud = () => {
    // Example: creating random points. Replace with your point cloud data.
    const numPoints = 10000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(numPoints * 3);

    for (let i = 0; i < numPoints; i++) {
      positions[i*3 + 0] = (Math.random() - 0.5) * 100; // x
      positions[i*3 + 1] = (Math.random() - 0.5) * 100; // y
      positions[i*3 + 2] = (Math.random() - 0.5) * 100; // z
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    // Material for points (white points, small size)
    const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.2 });
    const points = new THREE.Points(geometry, material);
    pointCloudRef.current = points;
    sceneRef.current.add(points);
  };

  const animate = () => {
    animationIdRef.current = requestAnimationFrame(animate);

    // Any updates or animations go here
    // e.g., rotate the scene slowly
    // sceneRef.current.rotation.y += 0.001;

    rendererRef.current.render(sceneRef.current, cameraRef.current);
  };

  const onWindowResize = () => {
    const width = mountRef.current.clientWidth;
    const height = mountRef.current.clientHeight;

    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
  };

  const onKeyDown = (e) => {
    // Handle keyboard inputs (W, A, S, D, Q, E) for movement
    // This is a placeholder, you can implement camera controls as needed
    const moveSpeed = 0.5;
    const key = e.code;
    switch (key) {
      case 'KeyW':
        cameraRef.current.position.z -= moveSpeed;
        break;
      case 'KeyS':
        cameraRef.current.position.z += moveSpeed;
        break;
      case 'KeyA':
        cameraRef.current.position.x -= moveSpeed;
        break;
      case 'KeyD':
        cameraRef.current.position.x += moveSpeed;
        break;
      case 'KeyQ':
        cameraRef.current.position.y -= moveSpeed;
        break;
      case 'KeyE':
        cameraRef.current.position.y += moveSpeed;
        break;
      default:
        break;
    }
  };

  const cleanup = () => {
    if (pointCloudRef.current) {
      pointCloudRef.current.geometry.dispose();
      pointCloudRef.current.material.dispose();
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    if (mountRef.current && rendererRef.current?.domElement) {
      mountRef.current.removeChild(rendererRef.current.domElement);
    }
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      {/* Overlay UI */}
      <div style={{
        position: 'absolute',
        top: '10px',
        left: '10px',
        color: '#fff',
        background: 'rgba(0,0,0,0.3)',
        padding: '10px',
        fontFamily: 'sans-serif',
        zIndex: 2,
      }}>
        <div style={{ marginBottom: '5px' }}>Scene #1</div>
        <div style={{ fontSize: '12px' }}>
          <p>W/E/A/S/D/Q keys to move</p>
          <p>Use mouse or add controls to rotate the scene</p>
          {/* Add more instructions or overlays as needed */}
        </div>
      </div>

      <div ref={mountRef} style={{ width: '100%', height: '100%', display: 'block' }}></div>
      
      {/* Bottom progress / slider bar example */}
      <div style={{
        position: 'absolute',
        bottom: '10px',
        left: '10px',
        right: '10px',
        height: '10px',
        background: 'rgba(255,255,255,0.1)',
        borderRadius: '5px',
        zIndex: 2
      }}>
        <div style={{
          width: '30%',
          height: '100%',
          background: '#4caf50',
          borderRadius: '5px'
        }}></div>
      </div>
    </div>
  );
};

export default CanvasContainer;