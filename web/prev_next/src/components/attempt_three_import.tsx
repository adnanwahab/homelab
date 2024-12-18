'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      mountRef.current!.clientWidth / mountRef.current!.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
    renderer.setClearColor(0x87ceeb); // Sky blue color
    mountRef.current!.appendChild(renderer.domElement);

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    camera.position.set(0, 5, 15);
    controls.update();

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 8, 5);
    scene.add(directionalLight);

    // Mountain geometry
    function createMountain(x: number, y: number, z: number, height: number, width: number) {
      const geometry = new THREE.ConeGeometry(width, height, 4);
      const material = new THREE.MeshPhongMaterial({
        color: 0x808080,
        flatShading: true,
      });
      const mountain = new THREE.Mesh(geometry, material);
      mountain.position.set(x, y, z);
      return mountain;
    }

    // Create mountains
    const mountain1 = createMountain(-5, 2, -5, 8, 4);
    const mountain2 = createMountain(3, 3, -8, 10, 5);
    scene.add(mountain1, mountain2);

    // Lake
    const lakeGeometry = new THREE.PlaneGeometry(30, 20);
    const lakeMaterial = new THREE.MeshPhongMaterial({
      color: 0x004d99,
      specular: 0x555555,
      shininess: 30,
    });
    const lake = new THREE.Mesh(lakeGeometry, lakeMaterial);
    lake.rotation.x = -Math.PI / 2;
    lake.position.y = -0.1;
    scene.add(lake);

    // Tree function
    function createTree(x: number, y: number, z: number) {
      const group = new THREE.Group();

      // Trunk
      const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 2, 8);
      const trunkMaterial = new THREE.MeshPhongMaterial({ color: 0x4d2926 });
      const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);

      // Leaves
      const leavesGeometry = new THREE.ConeGeometry(1, 2, 8);
      const leavesMaterial = new THREE.MeshPhongMaterial({ color: 0x0f5032 });
      const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
      leaves.position.y = 2;

      group.add(trunk);
      group.add(leaves);
      group.position.set(x, y, z);
      return group;
    }

    // Add trees
    const trees: THREE.Group[] = [];
    const treePositions: [number, number, number][] = [
      [4, 0, 2],
      [5, 0, 1],
      [3, 0, 3],
      [6, 0, 0],
    ];

    treePositions.forEach((pos) => {
      const tree = createTree(...pos);
      trees.push(tree);
      scene.add(tree);
    });

    // Clouds
    function createCloud(x: number, y: number, z: number) {
      const group = new THREE.Group();
      const geometry = new THREE.SphereGeometry(1, 16, 16);
      const material = new THREE.MeshPhongMaterial({ color: 0xffffff });

      const positions: [number, number, number][] = [
        [0, 0, 0],
        [1, 0.2, 0],
        [-1, 0.1, 0],
        [0.5, -0.1, 0.5],
      ];

      positions.forEach((pos) => {
        const cloud = new THREE.Mesh(geometry, material);
        cloud.position.set(...pos);
        const scale = 1 + Math.random() * 0.2;
        cloud.scale.set(scale, scale, scale);
        group.add(cloud);
      });

      group.position.set(x, y, z);
      return group;
    }

    // Add clouds
    const clouds: THREE.Group[] = [];
    const cloudPositions: [number, number, number][] = [
      [-5, 8, -5],
      [0, 10, -8],
      [5, 9, -6],
    ];

    cloudPositions.forEach((pos) => {
      const cloud = createCloud(...pos);
      clouds.push(cloud);
      scene.add(cloud);
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Animate clouds
      clouds.forEach((cloud, i) => {
        cloud.position.x += Math.sin(Date.now() * 0.001 + i) * 0.005;
        cloud.position.y += Math.cos(Date.now() * 0.001 + i) * 0.002;
      });

      controls.update();
      renderer.render(scene, camera);
    };

    // Start animation
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = mountRef.current!.clientWidth / mountRef.current!.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mountRef.current!.clientWidth, mountRef.current!.clientHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', handleResize);
      mountRef.current!.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeScene;