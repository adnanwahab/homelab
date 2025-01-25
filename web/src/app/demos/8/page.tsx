"use client"; // if you're on Next.js 13 App Router, ensure client-side rendering

import React, { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
// Import the WebGPU renderer from Three.js examples

export default function WebGPUCube() {
  const containerRef = useRef(null);

  useEffect(() => {
    // Ensure code only runs in the browser
    if (!containerRef.current) return;

    // Check if WebGPU is available
    if (!navigator.gpu) {
      console.warn("WebGPU is not supported in this browser.");
      return;
    }

    let renderer, scene, camera, cube;
    let animationHandle;

    // Use an async function to initialize WebGPU
    const init = async () => {
      // Create WebGPU renderer
      renderer = new THREE.WebGPURenderer({ antialias: true });
      // You must call init() before using it
      await renderer.init();

      // Set size of the renderer to match container size
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);

      // Attach the renderer canvas to our container
      containerRef.current.appendChild(renderer.domElement);

      // Create a basic scene
      scene = new THREE.Scene();

      // Create a camera
      camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100);
      camera.position.z = 2;

      // Create a simple box geometry and basic material
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Optional: a simple background color
      renderer.setClearColor(new THREE.Color("#202020"));

      // Set up the animation loop
      renderer.setAnimationLoop(() => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        renderer.render(scene, camera);
      });
    };

    init();

    // Cleanup on unmount
    return () => {
    //   if (renderer) {
    //     renderer.dispose();
    //   }
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // If using setAnimationLoop, you don't need to manually cancel it,
      // but you could still track any requestAnimationFrame calls if used.
      if (animationHandle) {
        cancelAnimationFrame(animationHandle);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "600px",
        height: "400px",
        border: "1px solid #ccc",
      }}
    />
  );
}
