
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

        // Add particle system
const particleCount = 500;
const particlesGeometry = new THREE.BufferGeometry();
const particlesMaterial = new THREE.PointsMaterial({
  color: 0xffffff,
  size: 5,
  map: new THREE.TextureLoader().load('https://threejs.org/examples/textures/sprites/disc.png'),
  blending: THREE.AdditiveBlending,
  transparent: true,
});

const positions = new Float32Array(particleCount * 3);
for (let i = 0; i < particleCount; i++) {
  positions[i * 3] = (Math.random() * 2 - 1) * 300;
  positions[i * 3 + 1] = (Math.random() * 2 - 1) * 300;
  positions[i * 3 + 2] = (Math.random() * 2 - 1) * 300;
}

particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const particleSystem = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particleSystem);

// Lighting
const pointLight1 = new THREE.PointLight(0x00ff00, 1, 500);
pointLight1.position.set(50, 50, 50);
scene.add(pointLight1);

const pointLight2 = new THREE.PointLight(0x0000ff, 1, 500);
pointLight2.position.set(-50, -50, -50);
scene.add(pointLight2);

const pointLight3 = new THREE.PointLight(0xffff00, 1, 500);
pointLight3.position.set(0, 0, 0);
scene.add(pointLight3);

// Background color gradient
const canvas = document.createElement('canvas');
canvas.width = 512;
canvas.height = 512;
const context = canvas.getContext('2d');
const gradient = context.createLinearGradient(0, 0, 512, 512);
gradient.addColorStop(0, '#0e0e3d');
gradient.addColorStop(1, '#005bea');
context.fillStyle = gradient;
context.fillRect(0, 0, 512, 512);

scene.background = new THREE.CanvasTexture(canvas);

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