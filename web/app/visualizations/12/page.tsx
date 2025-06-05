'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SkyBoxInstancing = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    // Initialize Three.js scene
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Create skybox
    const skyboxGeometry = new THREE.BoxGeometry(500, 500, 500);
    const skyboxMaterials = [
      new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide }), // right
      new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide }), // left
      new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide }), // top
      new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide }), // bottom
      new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide }), // front
      new THREE.MeshBasicMaterial({ color: 0x87CEEB, side: THREE.BackSide })  // back
    ];
    const skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterials);
    scene.add(skybox);
    
    // Create instanced cubes
    const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
    const instanceCount = 300;
    const instancedMesh = new THREE.InstancedMesh(
      cubeGeometry,
      new THREE.MeshStandardMaterial({ 
        color: 0x8ACDEA,
        metalness: 0.3,
        roughness: 0.2,
        transparent: true,
        opacity: 0.8
      }),
      instanceCount
    );
    
    // Position camera
    camera.position.z = 20;
    
    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Set instance positions
    const dummy = new THREE.Object3D();
    const spread = 30;
    
    for (let i = 0; i < instanceCount; i++) {
      dummy.position.set(
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread,
        (Math.random() - 0.5) * spread
      );
      
      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );
      
      const scale = 0.5 + Math.random() * 1.5;
      dummy.scale.set(scale, scale, scale);
      
      dummy.updateMatrix();
      instancedMesh.setMatrixAt(i, dummy.matrix);
    }
    
    instancedMesh.instanceMatrix.needsUpdate = true;
    scene.add(instancedMesh);
    
    // Post effects object (placeholder from the original code)
    const postEffect = { obj: new THREE.Group() };
    scene.add(postEffect.obj);
    
    // Debris object (placeholder from the original code)
    const debris = { obj: new THREE.Group() };
    const sceneBack = new THREE.Group();
    sceneBack.add(debris.obj);
    sceneBack.add(skybox);
    scene.add(sceneBack);
    
    // Animation loop
    const renderLoop = () => {
      // Rotate instanced cubes
      const time = performance.now() * 0.0005;
      
      for (let i = 0; i < instanceCount; i++) {
        instancedMesh.getMatrixAt(i, dummy.matrix);
        dummy.matrix.decompose(dummy.position, dummy.quaternion, dummy.scale);
        
        dummy.rotation.x += 0.01 * (i % 2 ? 1 : -1);
        dummy.rotation.y += 0.01 * (i % 3 ? 1 : -1);
        
        dummy.updateMatrix();
        instancedMesh.setMatrixAt(i, dummy.matrix);
      }
      
      instancedMesh.instanceMatrix.needsUpdate = true;
      
      // Rotate camera in a circular motion
      camera.position.x = Math.sin(time) * 30;
      camera.position.z = Math.cos(time) * 30;
      camera.lookAt(0, 0, 0);
      
      renderer.render(scene, camera);
      requestAnimationFrame(renderLoop);
    };
    
    // Handle window resize
    const resizeWindow = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    
    window.addEventListener('resize', resizeWindow);
    
    // Start animation
    renderLoop();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeWindow);
      renderer.dispose();
    };
  }, []);
  
  return (
    <div className="skybox-container" style={{ width: '100%', height: '100vh', overflow: 'hidden' }}>
      <canvas ref={canvasRef} style={{ display: 'block' }} />
      <div className="p-summary" style={{ 
        position: 'absolute', 
        top: '20px', 
        left: '20px', 
        zIndex: 2,
        color: 'white',
        fontFamily: 'Homemage, sans-serif'
      }}>
        <h1>three.js Instancing & SkyBox</h1>
        <p>
          <a 
            href="https://github.com/ykob/sketch-threejs/sketch/instancing.html" 
            target="_blank" 
            style={{ color: 'white', textDecoration: 'underline' }}
          >
            this source
          </a>
        </p>
      </div>
    </div>
  );
};

export default SkyBoxInstancing;