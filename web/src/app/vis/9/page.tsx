
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

        // Create a group to hold pieces of the shape
const shapeGroup = new THREE.Group();

// Parameters for the shape
const segments = 16;
const innerRadius = 0.5;
const outerRadius = 2.5;
const depth = 0.1;

// Function to create each piece of the shape
function createShapePiece(segmentIndex) {
  const angle = (segmentIndex / segments) * Math.PI * 2;
  const nextAngle = ((segmentIndex + 1) / segments) * Math.PI * 2;

  const geometry = new THREE.Geometry();

  const vertices = [
    new THREE.Vector3(Math.cos(angle) * innerRadius, Math.sin(angle) * innerRadius, 0),
    new THREE.Vector3(Math.cos(nextAngle) * innerRadius, Math.sin(nextAngle) * innerRadius, 0),
    new THREE.Vector3(0, 0, depth),
    new THREE.Vector3(Math.cos(angle) * outerRadius, Math.sin(angle) * outerRadius, 0),
    new THREE.Vector3(Math.cos(nextAngle) * outerRadius, Math.sin(nextAngle) * outerRadius, 0),
    new THREE.Vector3(0, 0, -depth),
  ];

  geometry.vertices.push(...vertices);

  const faces = [
    new THREE.Face3(0, 1, 2),
    new THREE.Face3(1, 4, 2),
    new THREE.Face3(4, 5, 2),
    new THREE.Face3(5, 3, 2),
    new THREE.Face3(3, 0, 2),
    new THREE.Face3(0, 3, 4),
    new THREE.Face3(4, 1, 0),
    new THREE.Face3(1, 4, 3),
    new THREE.Face3(3, 5, 4)
  ];

  geometry.faces.push(...faces);

  const material = new THREE.MeshBasicMaterial({
    color: 0x000000,
    wireframe: true,
    transparent: true,
    opacity: 0.5
  });

  const mesh = new THREE.Mesh(geometry, material);
  shapeGroup.add(mesh);
}

// Create all pieces
for (let i = 0; i < segments; i++) {
  createShapePiece(i);
}

// Add the group to the scene
scene.add(shapeGroup);

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