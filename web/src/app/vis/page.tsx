"use client";
import React, { useRef, useEffect } from "react";
// THREE CORE
import {
  Scene,
  PerspectiveCamera,
  Color,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  Clock,
  WebGLRenderer,
} from "three";

// WEBGPU RENDERER
//import { WebGPURenderer } from "three/examples/jsm/renderers/WebGPURenderer.js";

export default function MyWebGPUScene() {
  const canvasRef = useRef(null);

  useEffect(() => {


    const canvas = canvasRef.current!;
    const clock = new Clock();

    // Create the renderer
    const renderer = new WebGLRenderer({ canvas });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create a camera
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 3;

    // Create a scene
    const scene = new Scene();
    scene.background = new Color(0x202020); // Dark gray background

    // Create a simple cube
    const geometry = new BoxGeometry(1, 1, 1);
    const material = new MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new Mesh(geometry, material);
    scene.add(cube);

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      const delta = clock.getDelta();

      // Rotate the cube
      cube.rotation.x += delta * 0.5;
      cube.rotation.y += delta * 0.8;

      // Render with WebGPU
      renderer.render(scene, camera);
    }
    animate();

    // Handle window resize
    function onResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    window.addEventListener("resize", onResize);

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen bg-gray-900">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
}
