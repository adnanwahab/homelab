'use client'
import React, { useRef, useEffect } from 'react'
import * as THREE from 'three'
import { gsap } from 'gsap'

export default function CubeWallDemo() {
  const canvasRef = useRef(null)

  useEffect(() => {
    // Constants
    const CUBE_SIZE = 100
    const GRID = 6
    const WALL_SIZE = GRID * CUBE_SIZE
    const HALF_WALL_SIZE = WALL_SIZE / 2
    const MAIN_COLOR = 0xFFFFFF
    const SECONDARY_COLOR = 0x222222

    // Setup renderer
    const renderer = new THREE.WebGLRenderer({ antialias: false })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setClearColor(MAIN_COLOR, 1.0)
    renderer.shadowMap.enabled = true

    // Setup scene and camera
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      10000
    )
    camera.position.set(0, 0, 800)

    // Create main group
    const group = new THREE.Object3D()
    group.position.y = 50
    group.rotation.set(
      -60 * (Math.PI/180),
      0,
      -45 * (Math.PI/180)
    )

    // Setup walls
    const createWalls = () => {
      const geometry = new THREE.BoxGeometry(WALL_SIZE, WALL_SIZE, 0.05)
      geometry.faces[8].color.setHex(SECONDARY_COLOR)
      geometry.faces[9].color.setHex(SECONDARY_COLOR)
      geometry.colorsNeedUpdate = true
      
      const material = new THREE.MeshBasicMaterial({
        color: MAIN_COLOR,
        vertexColors: true
      })

      // Create and position walls
      const wallPositions = [
        { pos: [0, HALF_WALL_SIZE, -HALF_WALL_SIZE], rot: [90, 0, 0] },
        { pos: [HALF_WALL_SIZE, 0, -HALF_WALL_SIZE], rot: [0, -90, 0] },
        { pos: [0, -HALF_WALL_SIZE, -HALF_WALL_SIZE], rot: [-90, 0, 0] },
        { pos: [-HALF_WALL_SIZE, 0, -HALF_WALL_SIZE], rot: [0, 90, 0] },
        { pos: [0, 0, -WALL_SIZE], rot: [0, 0, 0] }
      ]

      wallPositions.forEach(({ pos, rot }) => {
        const wall = new THREE.Mesh(geometry, material)
        wall.position.set(...pos)
        wall.rotation.set(...rot.map(deg => deg * Math.PI/180))
        group.add(wall)
      })
    }

    // Setup animated cubes
    const createCubes = () => {
      const geometry = new THREE.BoxGeometry(CUBE_SIZE, CUBE_SIZE, 0.05)
      const material = new THREE.MeshLambertMaterial({ color: MAIN_COLOR })

      for (let i = 0; i < GRID * GRID; i++) {
        const row = Math.floor(i / GRID)
        const col = i % GRID + 1
        
        const x = -(((GRID * CUBE_SIZE) / 2) - ((CUBE_SIZE) * col) + (CUBE_SIZE/2))
        const y = -(((GRID * CUBE_SIZE) / 2) - ((CUBE_SIZE) * row + CUBE_SIZE) + (CUBE_SIZE/2))
        
        const cube = new THREE.Mesh(geometry, material)
        cube.position.set(x, y, 0)
        cube.castShadow = true
        cube.receiveShadow = true

        // Animate cube
        gsap.to(cube.rotation, {
          [Math.random() < 0.5 ? 'x' : 'y']: Math.random() < 0.5 ? -Math.PI : Math.PI,
          duration: 3 + Math.random() * 3,
          delay: 0.5 + Math.random() * 5.5,
          ease: "elastic.out",
          repeat: -1
        })

        group.add(cube)
      }
    }

    // Setup lights
    const createLights = () => {
      const mainLight = new THREE.DirectionalLight(MAIN_COLOR, 1.25)
      mainLight.position.set(-WALL_SIZE, -WALL_SIZE, CUBE_SIZE * GRID)
      mainLight.castShadow = true
      
      const softLight = new THREE.DirectionalLight(MAIN_COLOR, 1.5)
      softLight.position.set(WALL_SIZE, WALL_SIZE, CUBE_SIZE * GRID)
      
      group.add(mainLight)
      group.add(softLight)
    }

    // Initialize scene
    createWalls()
    createCubes()
    createLights()
    scene.add(group)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      renderer.render(scene, camera)
    }

    // Handle resize
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    // Setup and cleanup
    canvasRef.current.appendChild(renderer.domElement)
    window.addEventListener('resize', onResize)
    animate()

    return () => {
      window.removeEventListener('resize', onResize)
      // Cleanup Three.js resources
      scene.traverse(object => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
      renderer.dispose()
    }
  }, [])

  return <div ref={canvasRef} />
}
