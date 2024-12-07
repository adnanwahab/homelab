"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function Home() {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Just a safety check

    // Create a renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 5;

    // Create a scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#ffffff");

    // Add a simple box geometry and a basic material
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshStandardMaterial({ color: "#00ff00" });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // Add a light
    const light = new THREE.DirectionalLight("#ffffff", 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Handle window resize
    const onWindowResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onWindowResize, false);

    // Animation loop
    const animate = () => {
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start animation
    animate();

    // Cleanup on component unmount
    return () => {
      cancelAnimationFrame(requestRef.current);
      renderer.dispose();
      window.removeEventListener("resize", onWindowResize);
    };
  }, []);

  return (
    <div style={{ margin: 0, padding: 0, overflow: "hidden" }}>
      <canvas ref={canvasRef} style={{ display: "block" }} />
    </div>
  );
}
