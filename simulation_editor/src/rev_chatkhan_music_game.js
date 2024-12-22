//document.body.innerHTML = "";
import * as THREE from "three";
// import "./style.css";
console.log("hi");
const canvas = document.querySelector("canvas");
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.OrthographicCamera(-5, 5, 5, -5, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x8ba870); // Sage green background
//document.body.appendChild(renderer.domElement);

// Create player (square)
const squareGeometry = new THREE.PlaneGeometry(0.5, 0.5);
const squareMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });
const square = new THREE.Mesh(squareGeometry, squareMaterial);
scene.add(square);

// Create platforms (white paths)
const platformGeometry = new THREE.PlaneGeometry(2, 10);
const platformMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const platform = new THREE.Mesh(platformGeometry, platformMaterial);
platform.position.set(0, 0, -1);
scene.add(platform);

// Physics variables
let velocity = new THREE.Vector3(0, 0, 0);
const gravity = -9.8;
let isJumping = false;
let canJump = true;
const jumpForce = 5;

// Camera position
camera.position.z = 5;

// Game state
let gameOver = false;

// Controls
document.addEventListener("keydown", (event) => {
  if (event.code === "Space" && canJump) {
    velocity.y = jumpForce;
    isJumping = true;
    canJump = false;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    canJump = true;
  }
});

// Animation loop
const clock = new THREE.Clock();

function animate() {
  requestAnimationFrame(animate);

  if (!gameOver) {
    const deltaTime = clock.getDelta();

    // Apply gravity
    velocity.y += gravity * deltaTime;

    // Update position
    square.position.y += velocity.y * deltaTime;

    // Basic collision detection with bottom
    if (square.position.y < -4) {
      square.position.y = -4;
      velocity.y = 0;
      isJumping = false;
    }

    // Basic collision detection with top
    if (square.position.y > 4) {
      square.position.y = 4;
      velocity.y = 0;
    }

    // Auto-move right
    square.position.x += 2 * deltaTime;
    camera.position.x = square.position.x;
  }

  renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

// Start animation
animate();

// "use client";
// import React, { useEffect, useRef, useState } from "react";
// import * as THREE from "three";

// const MusicGame = () => {
//   const mountRef = useRef(null);
//   const [isRotating, setIsRotating] = useState(true);
//   const [currentShape, setCurrentShape] = useState("cube");

//   // Store references in useRef
//   const sceneRef = useRef(null);
//   const meshRef = useRef(null);
//   const audioRef = useRef({
//     context: null,
//     analyser: null,
//     dataArray: null,
//   });

//   const startAudio = async () => {
//     try {
//       audioRef.current.context = new (window.AudioContext ||
//         window.webkitAudioContext)();
//       const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//       const source = audioRef.current.context.createMediaStreamSource(stream);
//       audioRef.current.analyser = audioRef.current.context.createAnalyser();
//       audioRef.current.analyser.fftSize = 256;
//       source.connect(audioRef.current.analyser);
//       audioRef.current.dataArray = new Uint8Array(
//         audioRef.current.analyser.frequencyBinCount,
//       );
//     } catch (err) {
//       console.erroar("Error accessing microphone:", err);
//     }
//   };

//   useEffect(() => {
//     // Three.js setup
//     const scene = new THREE.Scene();
//     sceneRef.current = scene;

//     const camera = new THREE.PerspectiveCamera(
//       75,
//       window.innerWidth / window.innerHeight,
//       0.1,
//       1000,
//     );
//     const renderer = new THREE.WebGLRenderer();
//     renderer.setSize(window.innerWidth, window.innerHeight);
//     mountRef.current.appendChild(renderer.domElement);

//     // Create initial geometry
//     const geometry = new THREE.BoxGeometry();
//     const material = new THREE.MeshPhongMaterial({
//       color: 0x00ff00,
//       wireframe: true,
//       emissive: 0x444444,
//     });
//     const mesh = new THREE.Mesh(geometry, material);
//     meshRef.current = mesh;
//     scene.add(mesh);

//     // Add lights
//     const light = new THREE.PointLight(0xffffff, 1, 100);
//     light.position.set(10, 10, 10);
//     scene.add(light);
//     scene.add(new THREE.AmbientLight(0x404040));

//     // Position camera
//     camera.position.z = 5;

//     // Animation loop
//     const animate = () => {
//       requestAnimationFrame(animate);

//       if (audioRef.current.analyser) {
//         audioRef.current.analyser.getByteFrequencyData(
//           audioRef.current.dataArray,
//         );
//         const average =
//           audioRef.current.dataArray.reduce((a, b) => a + b) /
//           audioRef.current.dataArray.length;
//         const scale = 1 + (average / 256) * 0.5;
//         mesh.scale.set(scale, scale, scale);
//         const hue = (average / 256) * 0.3;
//         mesh.material.color.setHSL(hue, 0.5, 0.5);
//         mesh.material.emissive.setHSL(hue, 0.5, average / 512);
//       }

//       if (isRotating) {
//         mesh.rotation.x += 0.01;
//         mesh.rotation.y += 0.01;
//       }

//       renderer.render(scene, camera);
//     };

//     // Handle window resize
//     const handleResize = () => {
//       const width = window.innerWidth;
//       const height = window.innerHeight;
//       renderer.setSize(width, height);
//       camera.aspect = width / height;
//       camera.updateProjectionMatrix();
//     };

//     window.addEventListener("resize", handleResize);
//     animate();

//     return () => {
//       window.removeEventListener("resize", handleResize);
//       mountRef.current?.removeChild(renderer.domElement);
//     };
//   }, [isRotating]);

//   const toggleShape = () => {
//     if (!meshRef.current) return;

//     if (currentShape === "cube") {
//       meshRef.current.geometry.dispose();
//       meshRef.current.geometry = new THREE.SphereGeometry(1, 32, 32);
//       setCurrentShape("sphere");
//     } else {
//       meshRef.current.geometry.dispose();
//       meshRef.current.geometry = new THREE.BoxGeometry();
//       setCurrentShape("cube");
//     }
//   };

//   return (
//     <div className="relative w-full h-full">
//       <div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white p-2 rounded">
//         <button
//           className="bg-gray-700 text-white p-2 m-1 rounded"
//           onClick={startAudio}
//         >
//           Start Audio
//         </button>
//         <button
//           className="bg-gray-700 text-white p-2 m-1 rounded"
//           onClick={toggleShape}
//         >
//           Toggle Shape
//         </button>
//         <button
//           className="bg-gray-700 text-white p-2 m-1 rounded"
//           onClick={() => setIsRotating(!isRotating)}
//         >
//           Toggle Rotation
//         </button>
//       </div>
//       <div ref={mountRef} className="w-full h-full" />
//     </div>
//   );
// };

// export default MusicGame;
