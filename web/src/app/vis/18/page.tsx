
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

        const textureLoader = new THREE.TextureLoader();
const circleTexture = textureLoader.load('path_to_texture');

const geometry = new THREE.PlaneGeometry(5, 5, 32, 32);
const material = new THREE.MeshBasicMaterial({
  map: circleTexture,
  side: THREE.DoubleSide,
  transparent: true
});
const mesh = new THREE.Mesh(geometry, material);

const planeGeometry = new THREE.PlaneGeometry(15, 15);
const planeMaterial = new THREE.MeshBasicMaterial({
  color: 0x000000,
  side: THREE.DoubleSide
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

scene.add(plane);
scene.add(mesh);

mesh.position.set(0, 0, 0.1);

mesh.rotation.x = Math.PI / 2;
plane.rotation.x = Math.PI / 2;

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