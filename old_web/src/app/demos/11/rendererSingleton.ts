'use client';
// rendererSingleton.ts
import * as THREE from "three/webgpu";

/**
 * We store a private singleton reference here.
 */
let _renderer: THREE.WebGPURenderer | null = null;

/**
 * Create or return the existing THREE.WebGPURenderer as a singleton.
 */
export function getOrCreateRenderer(canvas: HTMLCanvasElement) {
  if (!_renderer) {
    _renderer = new THREE.WebGPURenderer({
      canvas,
      antialias: true,
    });

    // Example sizing:
    _renderer.setPixelRatio(window.devicePixelRatio);
    _renderer.setSize(window.innerWidth, window.innerHeight);

    // Force initialization so that .backend.device is available right away.
    _renderer.init();
  }

  // If the singleton is already created, we can swap out the canvas
  // if you prefer. But typically you want the same canvas each time.
  return _renderer;
}
