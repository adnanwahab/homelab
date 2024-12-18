'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { SVGRenderer } from 'three/addons/renderers/SVGRenderer.js';

export default function ThreeSVGScene() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Disable color management
    THREE.ColorManagement.enabled = false;

    // Setup
    const camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.z = 10;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0, 0, 0);

    const renderer = new SVGRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create geometry
    const vertices: number[] = [];
    const divisions = 50;

    for (let i = 0; i <= divisions; i++) {
      const v = (i / divisions) * (Math.PI * 2);
      const x = Math.sin(v);
      const z = Math.cos(v);
      vertices.push(x, 0, z);
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));

    // Add lines
    for (let i = 1; i <= 3; i++) {
      const material = new THREE.LineBasicMaterial({
        color: Math.random() * 0xffffff,
        linewidth: 10
      });
      const line = new THREE.Line(geometry, material);
      line.scale.setScalar(i / 3);
      scene.add(line);
    }

    const dashedMaterial = new THREE.LineDashedMaterial({
      color: 'blue',
      linewidth: 1,
      dashSize: 10,
      gapSize: 10
    });
    const dashedLine = new THREE.Line(geometry, dashedMaterial);
    dashedLine.scale.setScalar(2);
    scene.add(dashedLine);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation
    let frameId: number;
    const animate = () => {
      let count = 0;
      const time = performance.now() / 1000;

      scene.traverse((child) => {
        child.rotation.x = count + (time / 3);
        child.rotation.z = count + (time / 4);
        count++;
      });

      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameId);
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []); // Empty dependency array means this effect runs once on mount

  return <div ref={containerRef} />;
}