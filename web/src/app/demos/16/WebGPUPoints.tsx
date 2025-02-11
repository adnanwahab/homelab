'use client';
import React, { useRef, useEffect } from 'react';
// Import *pure* Three.js, not "three/webgpu" directly if you plan to override device
import * as THREE from 'three/webgpu';

type WebGPUPointsProps = {
  device: GPUDevice | null;
};

export default function WebGPUPoints({ device }: WebGPUPointsProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // 1) Ensure we have a canvas and a valid WebGPU device
    if (!canvasRef.current || !device) return;

    // 2) Create a three.js WebGPURenderer but supply the device
    //    (Depending on your three.js version, you may or may not
    //    be able to pass a custom device. It's still experimental.)
    const renderer = new THREE.WebGPURenderer({
      canvas: canvasRef.current,
      antialias: true
      // Potentially some three.js versions allow { device }, e.g.:
      // device: device
    });

    renderer.setSize(window.innerWidth, window.innerHeight);

    // 3) You can also do `await renderer.init()` here
    //    But since you already *have* a device, in some three.js
    //    builds, you might handle that differently.

    async function init() {
      await renderer.init();

      // From this point forward, you can rely on `device`
      // to create buffers, pipelines, etc.
      // e.g.: const pipeline = device.createComputePipeline({ ... })

      const scene = new THREE.Scene();
      const camera = new THREE.OrthographicCamera(
        -1, 1, 1, -1, 0, 2
      );

      // Simple plane + material for demo
      const geometry = new THREE.PlaneGeometry(2, 2);
      const material = new THREE.MeshBasicMaterial({ color: 0x00ffff });
      const quad = new THREE.Mesh(geometry, material);
      scene.add(quad);

      function animate() {
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      }
      animate();
    }

    init();

    // OPTIONAL: Clean up
    return () => {
      // e.g. cancelAnimationFrame, dispose geometry, etc.
    };
  }, [device]); // <--- re-run effect if device changes

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', display: 'block' }}
    />
  );
}
