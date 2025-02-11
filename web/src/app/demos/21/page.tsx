'use client';
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three/webgpu'
import { WebGPURenderer } from 'three/webgpu'

export default function WebGPUCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let renderer
    let animationId

    async function init() {
      renderer = new WebGPURenderer({ canvas: canvasRef.current })
      await renderer.init()

      renderer.setSize(window.innerWidth, window.innerHeight)
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        100
      )
      camera.position.z = 5

      // Just a normal mesh so we can verify something is on screen
      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({ color: 0xff0000 })
      const mesh = new THREE.Mesh(geometry, material)
      scene.add(mesh)

      function animate() {
        mesh.rotation.y += 0.01
        renderer.render(scene, camera)
        animationId = requestAnimationFrame(animate)
      }
      animate()
    }

    init().catch((err) => console.error(err))

    return () => {
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100vw', height: '100vh', display: 'block' }}
    />
  )
}
