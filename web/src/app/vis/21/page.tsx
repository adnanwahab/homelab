
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
const material = new THREE.MeshPhongMaterial({
  color: 0x8800ff, 
  specular: 0x3300ff, 
  shininess: 100,
  transparent: true, 
  opacity: 0.7
});
const torusKnot = new THREE.Mesh(geometry, material);
scene.add(torusKnot);

const ambientLight = new THREE.AmbientLight(0x404040, 1); 
scene.add(ambientLight);

const pointLight1 = new THREE.PointLight(0x8800ff, 0.5, 50);
pointLight1.position.set(25, 50, 25);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x3300ff, 0.5, 50);
pointLight2.position.set(-25, -50, -25);
scene.add(pointLight2);

camera.position.z = 50;

function animateSync() {
  torusKnot.rotation.x += 0.01;
  torusKnot.rotation.y += 0.01;
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