'use client'
import React, { useRef, useEffect } from 'react'
// We import from 'three' to access core classes like OrthographicCamera, Scene, etc.
// For the specialized WebGPU classes, we import from 'three/webgpu'.
import * as THREE from 'three'
import { WebGPURenderer } from 'three/webgpu'

// WebGPU detection utility (used below to check if WebGPU is available).
// If you have trouble importing from 'three/addons/...', you may need to
// copy or reference these files directly instead.
import WebGPU from 'three/addons/capabilities/WebGPU.js'

// TSL imports for building your compute function
import {
  texture,
  textureStore,
  Fn,
  instanceIndex,
  float,
  uvec2,
  vec4
} from 'three/tsl'

export default function WebGPUComputePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    let renderer: WebGPURenderer | null = null

    async function init() {
      //
      // 1. Check if WebGPU is available
      //
      if (!WebGPU.isAvailable()) {
        console.error('WebGPU not supported in this browser.')
        return
      }

      //
      // 2. Create the WebGPU renderer, attach it to the <canvas> ref
      //
      renderer = new WebGPURenderer({ canvas: canvasRef.current })
      await renderer.init()

      renderer.setPixelRatio(window.devicePixelRatio)
      renderer.setSize(window.innerWidth, window.innerHeight)

      //
      // 3. Set up camera, scene
      //
      const aspect = window.innerWidth / window.innerHeight
      const camera = new THREE.OrthographicCamera(-aspect, aspect, 1, -1, 0, 2)
      camera.position.z = 1

      const scene = new THREE.Scene()

      //
      // 4. Create a StorageTexture for compute output
      //
      const width = 512
      const height = 512

      const storageTexture = new THREE.StorageTexture(width, height)

      //
      // 5. Build your compute function using TSL
      //
      const computeTexture = Fn(({ storageTexture }) => {
        // Derive x/y from the 'instanceIndex' in compute pass
        const posX = instanceIndex.modInt(width)
        const posY = instanceIndex.div(width)
        const indexUV = uvec2(posX, posY)

        // Similar to https://www.shadertoy.com/view/Xst3zN
        const x = float(posX).div(50.0)
        const y = float(posY).div(50.0)

        const v1 = x.sin()
        const v2 = y.sin()
        const v3 = x.add(y).sin()
        const v4 = x.mul(x).add(y.mul(y)).sqrt().add(5.0).sin()
        const v = v1.add(v2, v3, v4)

        const r = v.sin()
        const g = v.add(Math.PI).sin()
        const b = v.add(Math.PI).sub(0.5).sin()

        // Write to the storage texture
        textureStore(storageTexture, indexUV, vec4(r, g, b, 1)).toWriteOnly()
      })

      //
      // 6. Convert your TSL function to a compute node
      //
      const computeNode = computeTexture({ storageTexture }).compute(width * height)

      //
      // 7. Create a material which uses the result of that compute pass as a texture
      //
      //    We'll use MeshBasicNodeMaterial (WebGPU-compatible) and feed in
      //    the storageTexture via TSL's `texture(...)`
      //
      const material = new THREE.MeshBasicNodeMaterial()
      material.colorNode = texture(storageTexture)

      //
      // 8. Create a plane mesh, add to scene
      //
      const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material)
      scene.add(plane)

      //
      // 9. Run compute pass, then do an initial render
      //
      await renderer.computeAsync(computeNode)
      renderer.render(scene, camera)

      //
      // 10. Handle window resizing
      //
      const handleResize = () => {
        if (!renderer) return
        renderer.setSize(window.innerWidth, window.innerHeight)

        const aspect = window.innerWidth / window.innerHeight
        camera.left = -aspect
        camera.right = aspect
        camera.updateProjectionMatrix()

        renderer.render(scene, camera)
      }

      window.addEventListener('resize', handleResize)

      // Cleanup function
      return () => {
        window.removeEventListener('resize', handleResize)
      }
    }

    // Kick off the setup
    init()

    // Cleanup on unmount
    return () => {
      // if needed, additional cleanup
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        width: '100vw',
        height: '100vh',
        display: 'block'
      }}
    />
  )
}
