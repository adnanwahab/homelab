'use client'

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    
    // Set renderer size to be more widget-like
    const width = 300;
    const height = 300;
    renderer.setSize(width, height);
    mountRef.current.appendChild(renderer.domElement);

    // Create 4 cubes with different visualizations
    const cubes = [
      createCube(0x3399ff, -3.5),  // First cube (blue)
      createCube(0x3399ff, -1.2),  // Second cube
      createCube(0xff6666, 1.2),   // Third cube (red)
      createCube(0x3399ff, 3.5)    // Fourth cube
    ];

    cubes.forEach(cube => scene.add(cube));
    camera.position.z = 8;

    // Animation with different patterns for each cube
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Different rotation patterns for each cube
      cubes[0].rotation.y += 0.01;
      
      cubes[1].rotation.x += 0.01;
      cubes[1].rotation.z += 0.005;
      
      cubes[2].rotation.y += 0.015;
      cubes[2].scale.z = Math.sin(Date.now() * 0.001) * 0.5 + 1;
      
      cubes[3].rotation.x += 0.01;
      cubes[3].rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    // Helper function to create a cube
    function createCube(color: number, xPosition: number) {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({ 
        color: color,
        transparent: true,
        opacity: 0.8
      });
      const cube = new THREE.Mesh(geometry, material);
      cube.position.x = xPosition;
      return cube;
    }

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      cubes.forEach(cube => {
        cube.geometry.dispose();
        (cube.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={mountRef} style={{ 
      width: '300px', 
      height: '300px',
      background: '#f0f0f0',
      borderRadius: '8px',
      overflow: 'hidden'
    }} />
  );
};

export default ThreeScene;