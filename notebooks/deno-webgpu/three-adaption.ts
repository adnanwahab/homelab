import * as THREE from "https://esm.sh/three@0.157.0";
import { WebGPURenderer } from "https://esm.sh/three@0.157.0/examples/jsm/renderers/WebGPURenderer.js";



import { serve } from "https://deno.land/std@0.214.0/http/server.ts";
import * as THREE from "https://esm.sh/three@0.157.0";
import { WebGPURenderer } from "https://esm.sh/three@0.157.0/examples/jsm/renderers/WebGPURenderer.js";

serve(async (_req) => {
  // Initialize the WebGPU renderer
//   const canvas = {
//     width: 800,
//     height: 600,
//     getContext: () => null // Dummy context; WebGPU requires browser
//   };

//   const renderer = new WebGPURenderer({ canvas });
//   renderer.setSize(canvas.width, canvas.height);

//   // Set up the scene
//   const scene = new THREE.Scene();
//   const camera = new THREE.PerspectiveCamera(75, canvas.width / canvas.height, 0.1, 1000);
//   camera.position.z = 5;

//   // Create a cube
//   const geometry = new THREE.BoxGeometry();
//   const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
//   const cube = new THREE.Mesh(geometry, material);
//   scene.add(cube);

//   // Render the scene
//   renderer.render(scene, camera);

//   return new Response(`Rendered WebGPU scene with three.js!`);
});

console.log("Server running on http://localhost:8000");