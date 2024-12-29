"use client"
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Visualization() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const renderer = new THREE.WebGLRenderer({canvas})
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        useEffect(() => {
    // Create a geometry for stars
    const starGeometry = new THREE.BufferGeometry()
    const starVertices = []
    for (let i = 0; i < 1000; i++) {
        starVertices.push(
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000,
            (Math.random() - 0.5) * 2000
        )
    }
    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starVertices, 3))
    const starMaterial = new THREE.PointsMaterial({ color: 0xffffff })
    const starField = new THREE.Points(starGeometry, starMaterial)
    scene.add(starField)

    // Create a central geometry with lines
    const centralGeometry = new THREE.IcosahedronGeometry(40, 2)
    const centralMaterial = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
        opacity: 0.1,
        transparent: true
    })
    const centralMesh = new THREE.Mesh(centralGeometry, centralMaterial)
    scene.add(centralMesh)

    // Add floating particles
    const particleGeometry = new THREE.BufferGeometry()
    const particleVertices = []
    for (let i = 0; i < 200; i++) {
        particleVertices.push(
            (Math.random() - 0.5) * 600,
            (Math.random() - 0.5) * 600,
            (Math.random() - 0.5) * 600
        )
    }
    particleGeometry.setAttribute('position', new THREE.Float32BufferAttribute(particleVertices, 3))
    const particleMaterial = new THREE.PointsMaterial({
        color: 0xff4500,
        size: 2
    })
    const particleField = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleField)
});

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