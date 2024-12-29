
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

        const geometry = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });

const knot = new THREE.Mesh(geometry, material);
scene.add(knot);

// Set up a simple camera position
camera.position.z = 50;

// Dynamic rotation based on the Radial Pattern
function animate() {
  requestAnimationFrame(animate);
  
  // Rotate based on a dynamic pattern
  knot.rotation.x += 0.01;
  knot.rotation.y += 0.002;
  
  renderer.render(scene, camera);
}

animate();

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