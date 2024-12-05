'use client'
  const scene_1 = [
    // "for years i've been designing tools",
    // "tools for people making software",
    // "... electronics, music, animation, mathematical systems",
    // "things with complex behavior",

  ]

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { TrackballControls } from 'three/addons/controls/TrackballControls.js'
import {
  CSS3DRenderer,
  CSS3DObject,
} from 'three/addons/renderers/CSS3DRenderer.js'

export default function SeeingSpace() {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene>()
  const cameraRef = useRef<THREE.PerspectiveCamera>()
  const rendererRef = useRef<THREE.WebGLRenderer>()
  const controlsRef = useRef<TrackballControls>()
  const robotRef = useRef<THREE.Group>()
  const movementRef = useRef({
    distance: 0,
    targetDistance: 5
  })
  const pathLineRef = useRef<THREE.Line>()

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    sceneRef.current = new THREE.Scene()
    sceneRef.current.background = new THREE.Color(0xffffff)

    // Camera
    cameraRef.current = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    cameraRef.current.position.set(0, 5, 10)

    // Renderer
    rendererRef.current = new THREE.WebGLRenderer({ antialias: true })
    rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    containerRef.current.appendChild(rendererRef.current.domElement)

    // Controls
    controlsRef.current = new TrackballControls(cameraRef.current, rendererRef.current.domElement)
    controlsRef.current.enableDamping = true

    // Scene setup functions
    const setupLights = () => {
      const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
      sceneRef.current?.add(ambientLight)

      const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8)
      directionalLight.position.set(5, 5, 5)
      sceneRef.current?.add(directionalLight)
    }

    // ... existing createRobot and createHoloDisplay functions ...
    
    // Initial setup
    setupLights()
    // Add table
    const table = new THREE.Mesh(
      new THREE.BoxGeometry(20, 0.5, 10),
      new THREE.MeshPhongMaterial({ color: 0xeeeecc })
    )
    sceneRef.current?.add(table)

    // Add robot
    robotRef.current = createRobot()
    robotRef.current.position.y = 1
    sceneRef.current?.add(robotRef.current)

    // Add holo displays
    if (sceneRef.current) {
      sceneRef.current.add(createHoloDisplay(-8, 3, 0, Math.PI / 4))
      sceneRef.current.add(createHoloDisplay(8, 3, 0, -Math.PI / 4))
      sceneRef.current.add(createHoloDisplay(0, 3, -4, 0))
    }

    // Add this inside useEffect, after the setupLights function
    const createPathLine = () => {
      const points = [
        new THREE.Vector3(-8, 1.1, 0),  // Starting point, slightly above the table
        new THREE.Vector3(5, 1.1, 0)     // End point (matches targetDistance)
      ]
      const geometry = new THREE.BufferGeometry().setFromPoints(points)
      const material = new THREE.LineBasicMaterial({ 
        color: 0x00ff00,
        transparent: true,
        opacity: 0
      })
      const line = new THREE.Line(geometry, material)
      return line
    }

    // Add this after adding the robot
    pathLineRef.current = createPathLine()
    sceneRef.current?.add(pathLineRef.current)

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate)
      
      // Add robot movement
      if (robotRef.current && movementRef.current.distance < movementRef.current.targetDistance) {
        const moveStep = 0.05
        robotRef.current.position.x += moveStep
        movementRef.current.distance += moveStep

        // Animate the line opacity
        if (pathLineRef.current?.material) {
          const material = pathLineRef.current.material as THREE.LineBasicMaterial
          material.opacity = Math.min(1, movementRef.current.distance / 2)
        }
      }

      controlsRef.current?.update()
      rendererRef.current?.render(sceneRef.current!, cameraRef.current!)
    }
    animate()

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return
      cameraRef.current.aspect = window.innerWidth / window.innerHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(window.innerWidth, window.innerHeight)
    }
    window.addEventListener('resize', handleResize)

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize)
      containerRef.current?.removeChild(rendererRef.current!.domElement)
      controlsRef.current?.dispose()
    }
  }, [])

  return (
    <div ref={containerRef} className="w-full h-screen bg-black">
      {/* Your scene_1 content can be rendered here as overlay */}
      <div className="absolute top-0 left-0 p-4 text-white">
        {scene_1.map((text, index) => (
          <p key={index} className="mb-2">{text}</p>
        ))}
      </div>
    </div>
  )
}

// Helper functions
function createRobot() {
  const robot = new THREE.Group()
  
  const body = new THREE.Mesh(
    new THREE.BoxGeometry(2, 1.5, 1.5),
    new THREE.MeshPhongMaterial({ color: 0x4287f5 })
  )
  robot.add(body)
  
  const wheelGeometry = new THREE.CylinderGeometry(0.4, 0.4, 0.2, 32)
  const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 })
  
  const wheel1 = new THREE.Mesh(wheelGeometry, wheelMaterial)
  wheel1.rotation.z = Math.PI / 2
  wheel1.position.set(-0.8, -0.5, 0.6)
  robot.add(wheel1)
  
  const wheel2 = wheel1.clone()
  wheel2.position.set(-0.8, -0.5, -0.6)
  robot.add(wheel2)
  
  return robot
}

function createHoloDisplay(x: number, y: number, z: number, rotY: number) {
  const display = new THREE.Mesh(
    new THREE.PlaneGeometry(4, 3),
    new THREE.MeshPhongMaterial({
      color: 0x00ffff,
      transparent: true,
      opacity: 0.2,
      side: THREE.DoubleSide
    })
  )
  display.position.set(x, y, z)
  display.rotation.y = rotY
  return display
}