"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
import WebGPU from "three/examples/jsm/capabilities/WebGPU.js";

const ThreeComputeTexture = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let camera, scene, renderer;

    // if (!WebGPU.isAvailable()) {
    //   console.error("WebGPU is not available.");
    //   return;
    // }

    const init = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2);
      camera.position.z = 1;

      scene = new THREE.Scene();

      const width = 512, height = 512;
      const storageTexture = new THREE.DataTexture(
        new Uint8Array(width * height * 4),
        width,
        height,
        THREE.RGBAFormat
      );

      const material = new THREE.MeshBasicMaterial({ map: storageTexture });
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material);
      scene.add(plane);

      renderer = new THREE.WebGPURenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

      containerRef.current.appendChild(renderer.domElement);

      render();
    };

    const render = () => {
      renderer.render(scene, camera);
    };

    init();

    return () => {
      //renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="webgpu-container"></div>;
};

export default ThreeComputeTexture;
