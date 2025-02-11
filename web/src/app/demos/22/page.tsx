
'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min';
import styles from './page.module.css';

export default function MeshLineDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);


  useEffect(() => {
    //if (!containerRef.current) return;

    // Three.js setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({canvas: canvasRef.current });
    renderer.setSize(window.innerWidth, window.innerHeight);
    //containerRef.current.appendChild(renderer.domElement);

    // Add OrbitControls
    const controls = new OrbitControls(camera, canvasRef.current);
    controls.enableDamping = true;

    // Camera position
    camera.position.z = 5;

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
    //window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      //window.removeEventListener('resize', handleResize);
      //containerRef.current?.removeChild(renderer.domElement);
      //renderer.dispose();
    };
  }, []);

  return (
    <main>
      <div ref={containerRef} className={styles.container}></div>
      <div className={styles.title}>
        <h1 className="text-green-900">THREE.MeshLine - Demo</h1>
        <p>Play with the different settings on the controls</p>
        <canvas ref={canvasRef}></canvas>
      </div>
    </main>
  );
}