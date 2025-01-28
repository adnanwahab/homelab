"use client"; // If you're using Next.js 13 with the app/ directory, this ensures client-side rendering.

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default function SwirlScene() {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x888888);

    const camera = new THREE.PerspectiveCamera(
      45, // field of view
      window.innerWidth / window.innerHeight, // aspect
      0.1, // near clipping
      1000 // far clipping
    );
    camera.position.set(0, 20, 80);

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // 2. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.1;

    // 3. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dirLight.position.set(5, 10, 5);
    scene.add(dirLight);

    // 4. Swirl group
    const swirlGroup = new THREE.Group();
    scene.add(swirlGroup);

    // 5. Swirl parameters
    const numRects = 300;
    const swirlTurns = 2.0;
    const swirlRadius = 10;
    const radiusGrowth = 0.15;
    const heightSeparation = 0.1;

    // 6. Geometry & create the rectangles
    const rectWidth = 1;
    const rectHeight = 4;
    const rectDepth = 0.2;
    const geometry = new THREE.BoxGeometry(rectWidth, rectHeight, rectDepth);

    for (let i = 0; i < numRects; i++) {
      // angle, radius, positions
      let angle = (i / numRects) * swirlTurns * Math.PI * 2;
      let currentRadius = swirlRadius + i * radiusGrowth;
      let x = currentRadius * Math.cos(angle);
      let z = currentRadius * Math.sin(angle);
      let y = (i - numRects / 2) * heightSeparation;

      let grayShade = Math.random() * 0.5 + 0.3; // random gray
      const material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(grayShade, grayShade, grayShade),
        metalness: 0.3,
        roughness: 0.6,
      });

      const rectMesh = new THREE.Mesh(geometry, material);
      rectMesh.position.set(x, y, z);

      // random rotation
      rectMesh.rotation.x = Math.random() * Math.PI;
      rectMesh.rotation.y = Math.random() * Math.PI;
      rectMesh.rotation.z = Math.random() * Math.PI;

      swirlGroup.add(rectMesh);
    }

    // 7. Resize handling
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // 8. Animate
    let animationFrameId;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // swirlGroup.rotation.y += 0.002; // optional rotation
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);

      // Dispose geometries, materials, textures, if needed
      geometry.dispose();
      swirlGroup.traverse((obj) => {
        if (obj.isMesh) {
          obj.geometry.dispose();
          obj.material.dispose();
        }
      });

      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ display: "block", width: "100vw", height: "100vh" }}
    />
  );
}

// <!DOCTYPE html>
// <html>
// <head>
//     <style>
//         body { margin: 0; }
//         canvas { display: block; }
//     </style>
// </head>
// <body>

//     <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
//     <script src="https://cdn.jsdelivr.net/npm/three@latest/examples/js/controls/OrbitControls.js"></script>
//     <script>



// let scene, camera, renderer, controls;

// init();
// animate();

// function init() {
//   // 1. Scene, Camera, Renderer
//   scene = new THREE.Scene();
//   scene.background = new THREE.Color(0x888888);

//   camera = new THREE.PerspectiveCamera(
//     45,                 // field of view
//     window.innerWidth / window.innerHeight, // aspect
//     0.1,                // near clipping
//     1000                // far clipping
//   );
//   camera.position.set(0, 20, 80);

//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   document.body.appendChild(renderer.domElement);

//   controls = new THREE.OrbitControls(camera, renderer.domElement);
//   controls.enableDamping = true;
//   controls.dampingFactor = 0.1;

//   // 2. Lighting (optional, but helps for 3D forms)
//   const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
//   scene.add(ambientLight);

//   const dirLight = new THREE.DirectionalLight(0xffffff, 0.8);
//   dirLight.position.set(5, 10, 5);
//   scene.add(dirLight);

//   // 3. Create a Group to hold our swirl pieces
//   const swirlGroup = new THREE.Group();
//   scene.add(swirlGroup);

//   // 4. Parameters for our swirl
//   const numRects = 300;     // number of rectangles
//   const swirlTurns = 2.0;   // how many full rotations
//   const swirlRadius = 10;   // base radius
//   const radiusGrowth = 0.15;// how quickly radius grows each step
//   const heightSeparation = 0.1; // vertical spacing

//   // 5. Geometry for each piece (use Box or Plane)
//   const rectWidth = 1;
//   const rectHeight = 4;
//   const rectDepth = 0.2; // thickness if using BoxGeometry
//   const geometry = new THREE.BoxGeometry(rectWidth, rectHeight, rectDepth);

//   // Optionally, if you want simpler “flat” pieces:
//   // const geometry = new THREE.PlaneGeometry(rectWidth, rectHeight);

//   // 6. Create and position each rectangle
//   for (let i = 0; i < numRects; i++) {
//     // Calculate the angle for this step
//     let angle = (i / numRects) * swirlTurns * Math.PI * 2;

//     // Spiral radius grows slightly as we move outward
//     let currentRadius = swirlRadius + i * radiusGrowth;

//     // Convert polar coords to x/z
//     let x = currentRadius * Math.cos(angle);
//     let z = currentRadius * Math.sin(angle);

//     // Add some vertical offset so it “corkscrews” upward
//     let y = (i - numRects / 2) * heightSeparation;

//     // Create a simple material (vary color if desired)
//     let grayShade = Math.random() * 0.5 + 0.3; // random gray
//     const material = new THREE.MeshStandardMaterial({
//       color: new THREE.Color(grayShade, grayShade, grayShade),
//       metalness: 0.3,
//       roughness: 0.6,
//     });

//     // Mesh
//     const rectMesh = new THREE.Mesh(geometry, material);

//     // Position the mesh
//     rectMesh.position.set(x, y, z);

//     // Random rotation for a more chaotic look
//     rectMesh.rotation.x = Math.random() * Math.PI;
//     rectMesh.rotation.y = Math.random() * Math.PI;
//     rectMesh.rotation.z = Math.random() * Math.PI;

//     swirlGroup.add(rectMesh);
//   }

//   // 7. Handle window resize
//   window.addEventListener('resize', onWindowResize, false);
// }

// function onWindowResize() {
//   camera.aspect = window.innerWidth / window.innerHeight;
//   camera.updateProjectionMatrix();
//   renderer.setSize(window.innerWidth, window.innerHeight);
// }

// // 8. Animate (rotate the swirl or let user just orbit around)
// function animate() {
//   requestAnimationFrame(animate);

//   // e.g., swirlGroup rotation for a dynamic look
//   // swirlGroup.rotation.y += 0.002;

//   controls.update();
//   renderer.render(scene, camera);
// }
//     </script>
// </body>
// </html>