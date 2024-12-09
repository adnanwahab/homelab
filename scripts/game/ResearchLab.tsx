'use client';
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ResearchLabScene = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(5, 5, 7);

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Floor
    const floorGeometry = new THREE.PlaneGeometry(20, 20);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xcccccc,
      side: THREE.DoubleSide
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    // Wall
    const wallGeometry = new THREE.PlaneGeometry(20, 10);
    const wallMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xeeeeee,
      side: THREE.DoubleSide
    });
    const wall = new THREE.Mesh(wallGeometry, wallMaterial);
    wall.position.z = -10;
    wall.position.y = 5;
    scene.add(wall);

    // Tables
    const createTable = (x, z) => {
      const tableGeometry = new THREE.BoxGeometry(2, 0.1, 2);
      const tableMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      const table = new THREE.Mesh(tableGeometry, tableMaterial);
      table.position.set(x, 1, z);
      scene.add(table);

      // Table legs
      const legGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
      const legMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
      
      for (let i = 0; i < 4; i++) {
        const leg = new THREE.Mesh(legGeometry, legMaterial);
        leg.position.set(
          x + (i % 2 === 0 ? 0.8 : -0.8),
          0.5,
          z + (i < 2 ? 0.8 : -0.8)
        );
        scene.add(leg);
      }
    };

    // Add multiple tables
    createTable(-3, 0);
    createTable(0, 0);
    createTable(3, 0);

    // Storage units at the bottom
    const createStorageUnit = (x) => {
      const unitGeometry = new THREE.BoxGeometry(2, 1, 1);
      const unitMaterial = new THREE.MeshStandardMaterial({ color: 0x666666 });
      const unit = new THREE.Mesh(unitGeometry, unitMaterial);
      unit.position.set(x, 0.5, -9);
      scene.add(unit);
    };

    // Add storage units
    for (let i = -4; i <= 4; i += 2) {
      createStorageUnit(i);
    }

    // Add posters on the wall
    const createPoster = (x, y) => {
      const posterGeometry = new THREE.PlaneGeometry(1, 1);
      const posterMaterial = new THREE.MeshStandardMaterial({ 
        color: 0x00bcd4,
        side: THREE.DoubleSide
      });
      const poster = new THREE.Mesh(posterGeometry, posterMaterial);
      poster.position.set(x, y, -9.9);
      scene.add(poster);
    };

    // Create grid of posters
    for (let i = -3; i <= 3; i += 2) {
      for (let j = 3; j <= 7; j += 2) {
        createPoster(i, j);
      }
    }

    // Add orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ResearchLabScene;