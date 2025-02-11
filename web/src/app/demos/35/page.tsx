"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three/webgpu";

// If these imports cause SSR issues, consider loading them dynamically in useEffect:
//   const { texture, textureStore, Fn, instanceIndex, float, uvec2, vec4 } = await import("three/tsl");
import { texture, textureStore, Fn, instanceIndex, float, uvec2, vec4 } from "three/tsl";
import WebGPU from "three/addons/capabilities/WebGPU.js";

const WebGPUScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Check if WebGPU is available in the browser
    if (WebGPU.isAvailable() === false) {
      console.error("No WebGPU support");
      // You might want to handle it gracefully here (e.g., show a fallback UI).
      return;
    }

    let camera: THREE.OrthographicCamera;
    let scene: THREE.Scene;
    let renderer: THREE.WebGPURenderer;

    const width = 512;
    const height = 512;

    // ------ Initialize scene, camera, renderer ------
    function init() {
      // Camera
      const aspect = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2);
      camera.position.z = 1;

      // Scene
      scene = new THREE.Scene();

      // Create a StorageTexture
      const storageTexture = new THREE.StorageTexture(width, height);

      // Create compute node
      // This replicates your "Fn" which sets pixels in storageTexture
      const computeTexture = Fn(({ storageTexture }) => {
        const posX = instanceIndex.modInt(width);
        const posY = instanceIndex.div(width);
        const indexUV = uvec2(posX, posY);

        // Some fractal/trig stuff
        const x = float(posX).div(50.0);
        const y = float(posY).div(50.0);

        const v1 = x.sin();
        const v2 = y.sin();
        const v3 = x.add(y).sin();
        const v4 = x.mul(x).add(y.mul(y)).sqrt().add(5.0).sin();
        const v = v1.add(v2, v3, v4);

        const r = v.sin();
        const g = v.add(Math.PI).sin();
        const b = v.add(Math.PI).sub(0.5).sin();

        textureStore(storageTexture, indexUV, vec4(r, g, b, 1)).toWriteOnly();
      });

      // The compute node for the entire storageTexture
      const computeNode = computeTexture({ storageTexture }).compute(width * height);

      // Create a basic node-based material for displaying the computed texture
      const material = new THREE.MeshBasicNodeMaterial({ color: 0x00ff00 });
      material.colorNode = texture(storageTexture);

      // Plane geometry + material
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
      scene.add(plane);

      // Renderer
      renderer = new THREE.WebGPURenderer({
        canvas: canvasRef.current,
        antialias: true,
      });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Perform the compute
      renderer.computeAsync(computeNode);

      // Initial render
      render();

      // Handle window resize
      window.addEventListener("resize", onWindowResize, false);
    }

    function onWindowResize() {
      if (!renderer || !camera) return;

      renderer.setSize(window.innerWidth, window.innerHeight);

      const aspect = window.innerWidth / window.innerHeight;

      camera.left = -aspect;
      camera.right = aspect;
      camera.top = 1;
      camera.bottom = -1;
      camera.updateProjectionMatrix();

      render();
    }

    function render() {
      if (!renderer || !scene || !camera) return;
      renderer.renderAsync(scene, camera);
    }

    init();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      // If you'd like, you can dispose of geometries, materials, textures etc. here
      // to free GPU/CPU memory. E.g.:
      // scene.traverse((obj) => {
      //   if (obj.isMesh) {
      //     obj.geometry.dispose();
      //     if (obj.material.isMaterial) {
      //       obj.material.dispose();
      //     }
      //   }
      // });
      // renderer.dispose();
    };
  }, []);

  // A simple <canvas> that Next.js will render client-side
  return (
    <canvas
      ref={canvasRef}
      style={{
        width: "100%",
        height: "100%",
        display: "block",
      }}
    />
  );
};

export default WebGPUScene;
