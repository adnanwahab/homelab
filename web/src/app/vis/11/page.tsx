
      "use client"
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Visualization() {
    const canvasRef = useRef()

    useEffect(() => {
        const canvas = canvasRef.current
        const renderer = new THREE.WebGLRenderer({canvas})
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        // Create a group to hold the boxes
const group = new THREE.Group();
scene.add(group);

// Create the geometry and material for the boxes
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0x333333 });

// Array to store box meshes
const boxes = [];

// Create 300 particles
for (let i = 0; i < 300; i++) {
  const box = new THREE.Mesh(geometry, material);
  
  // Set random position for each box
  box.position.x = (Math.random() - 0.5) * 50;
  box.position.y = (Math.random() - 0.5) * 50;
  box.position.z = (Math.random() - 0.5) * 50;
  
  // Add box to group and array
  group.add(box);
  boxes.push(box);
}

// Animate function to update positions
function animateBoxes() {
  boxes.forEach((box, index) => {
    box.rotation.y += 0.01;
    box.rotation.x += 0.01;

    // Spiral effect calculation
    box.position.x = 15 * Math.sin(index * 0.1 + performance.now() * 0.001);
    box.position.y = 15 * Math.cos(index * 0.1 + performance.now() * 0.001);
    box.position.z = index * 0.05 - 7.5; // A twist for more spiral shape
  });
}

// Call animateBoxes within the render loop
animateBoxes();

        camera.position.z = 5

        function animate() {
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }
        animate()

        function handleResize() {
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
        }

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
}