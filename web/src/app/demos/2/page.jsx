'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function TorusDemo() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // 1. Set up renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(window.devicePixelRatio)

    // 2. Create scene & camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      60, // field of view
      window.innerWidth / window.innerHeight, // aspect ratio
      0.1, // near clipping
      100 // far clipping
    )
    camera.position.set(0, 0, 5)

    // 3. Load environment map (CubeTextureLoader example)
    const envMapLoader = new THREE.CubeTextureLoader()
    const envMap = envMapLoader.setPath('/textures/cube/')
      .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])
    
    // Optional: Create a simple color environment as placeholder
    scene.background = new THREE.Color(0x333333)
    // Comment out environment mapping for now
    scene.environment = envMap

    // 4. Create torus mesh
    const geometry = new THREE.TorusGeometry(1, 0.4, 64, 128)
    const material = new THREE.MeshPhysicalMaterial({
      metalness: 1,
      roughness: 0,
      transmission: 1,  // for "glass-like" transparency
      thickness: 0.5,   // thickness of the glass
      envMapIntensity: 1
    })
    const torusMesh = new THREE.Mesh(geometry, material)
    scene.add(torusMesh)

    // 5. Basic animation loop
    function animate() {
      requestAnimationFrame(animate)
      // Rotate torus for a little motion
      torusMesh.rotation.x += 0.005
      torusMesh.rotation.y += 0.01

      renderer.render(scene, camera)
    }
    animate()

    // 6. Handle window resizing
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', onWindowResize)
    return () => window.removeEventListener('resize', onWindowResize)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', display: 'block' }}
    />
  )
}
