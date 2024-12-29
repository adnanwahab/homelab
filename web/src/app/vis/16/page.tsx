
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

        const geometry = new THREE.PlaneGeometry(10, 10, 100, 100);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff, side: THREE.DoubleSide });
const plane = new THREE.Mesh(geometry, material);

const wave = (u, v) => {
  const x = u - 0.5;
  const y = v - 0.5;
  return Math.sin(5 * (x + y)) * 0.2;
};

const positionAttribute = geometry.attributes.position;
for (let i = 0; i < positionAttribute.count; i++) {
  const u = geometry.attributes.uv.getX(i);
  const v = geometry.attributes.uv.getY(i);
  const z = wave(u, v);
  positionAttribute.setZ(i, z);
}
positionAttribute.needsUpdate = true;

scene.add(plane);

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