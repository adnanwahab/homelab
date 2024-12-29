
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

        const material = new THREE.LineBasicMaterial({ color: 0x000000 });
const points = [];

// Generate random points and create lines
for (let i = 0; i < 500; i++) {
  const x = (Math.random() - 0.5) * 400;
  const y = (Math.random() - 0.5) * 400;
  const z = (Math.random() - 0.5) * 400;
  points.push(new THREE.Vector3(x, y, z));

  if (i > 0) {
    const geometry = new THREE.BufferGeometry().setFromPoints([points[i - 1], points[i]]);
    const line = new THREE.Line(geometry, material);
    scene.add(line);
  }
}

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