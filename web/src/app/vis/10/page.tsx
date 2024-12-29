
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

        const geometry = new THREE.BufferGeometry();
const vertices = new Float32Array([
    0, 0, 0, 10, 0, 0, 8, 8, 0,
    0, 0, 0, 8, 8, 0, 0, 10, 0,
    0, 0, 0, -10, 0, 0, -8, 8, 0,
    0, 0, 0, -8, 8, 0, 0, 10, 0,
    0, 0, 0, 10, 0, 0, 8, -8, 0,
    0, 0, 0, 8, -8, 0, 0, -10, 0,
    0, 0, 0, -10, 0, 0, -8, -8, 0,
    0, 0, 0, -8, -8, 0, 0, -10, 0
]);
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
const material = new THREE.LineBasicMaterial({ color: 0x000000 });
const lines = new THREE.LineSegments(geometry, material);
scene.add(lines);

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