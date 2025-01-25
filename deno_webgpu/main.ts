// main.ts
// Run with: deno run --allow-net --allow-read main.ts

import * as THREE from "https://esm.sh/three@0.153.0";
import { WebGPURenderer } from "https://esm.sh/three@0.153.0/examples/jsm/renderers/WebGPURenderer.js";

async function init() {
  // 1) Check for WebGPU availability
  if (!navigator.gpu) {
    console.warn("WebGPU not supported in this browser.");
    return;
  }

  // 2) Create the renderer
  const renderer = new WebGPURenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // 3) Add the renderer's canvas to the document body
  document.body.appendChild(renderer.domElement);

  // 4) Call init() on the renderer to finish setup
  await renderer.init();

  // 5) Create a basic scene, camera, and mesh
  const scene = new THREE.Scene();

  // A simple perspective camera
  const camera = new THREE.PerspectiveCamera(
    70, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near plane
    1000, // Far plane
  );
  camera.position.z = 3;

  // A basic box geometry and a simple material
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 6) Animation loop
  function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
    requestAnimationFrame(animate);
  }
  animate();
}

// Kick off the script
init();
