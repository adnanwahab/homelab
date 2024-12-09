'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { gsap } from 'gsap'

interface Point {
  position: THREE.Vector3
  element: HTMLElement | null
}

export default function WebGLScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // Scene setup
    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    let sceneReady = false

    // Loading manager setup
    const loadingBarElement = document.querySelector('.loading-bar')
    const loadingManager = new THREE.LoadingManager(
      // Loaded
      () => {
        window.setTimeout(() => {
          gsap.to(overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 })
          loadingBarElement?.classList.add('ended')
          if (loadingBarElement) loadingBarElement.style.transform = ''
        }, 500)

        window.setTimeout(() => {
          sceneReady = true
        }, 2000)
      },
      // Progress
      (itemUrl, itemsLoaded, itemsTotal) => {
        const progressRatio = itemsLoaded / itemsTotal
        if (loadingBarElement) {
          loadingBarElement.style.transform = `scaleX(${progressRatio})`
        }
      }
    )

    // ... existing setup code ...
    const gltfLoader = new GLTFLoader(loadingManager)
    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

    // Overlay
    const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1)
    const overlayMaterial = new THREE.ShaderMaterial({
      transparent: true,
      uniforms: {
        uAlpha: { value: 1 }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float uAlpha;
        void main() {
          gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
        }
      `
    })
    const overlay = new THREE.Mesh(overlayGeometry, overlayMaterial)
    scene.add(overlay)

    // Debug object
    const debugObject = {
      envMapIntensity: 2.5
    }

    // ... existing setup code ...
    const environmentMap = cubeTextureLoader.load([
      '/static/textures/environmentMaps/0/px.jpg',
      '/static/textures/environmentMaps/0/nx.jpg',
      '/static/textures/environmentMaps/0/py.jpg',
      '/static/textures/environmentMaps/0/ny.jpg',
      '/static/textures/environmentMaps/0/pz.jpg',
      '/static/textures/environmentMaps/0/nz.jpg'
    ])

    environmentMap.colorSpace = THREE.SRGBColorSpace

    scene.background = environmentMap
    scene.environment = environmentMap

    // ... existing setup code ...
    gltfLoader.load(
      '/static/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
      (gltf) =>
      {
        gltf.scene.scale.set(2.5, 2.5, 2.5)
        gltf.scene.rotation.y = Math.PI * 0.5
        scene.add(gltf.scene)

        updateAllMaterials(scene)
      }
    )

    // ... existing setup code ...
    const raycaster = new THREE.Raycaster()
    const points = [
      {
        position: new THREE.Vector3(1.55, 0.3, - 0.6),
        element: document.querySelector('.point-0')
      },
      {
        position: new THREE.Vector3(0.5, 0.8, - 1.6),
        element: document.querySelector('.point-1')
      },
      {
        position: new THREE.Vector3(1.6, - 1.3, - 0.7),
        element: document.querySelector('.point-2')
      }
    ]

    // ... existing setup code ...
    const directionalLight = new THREE.DirectionalLight('#ffffff', 3)
    directionalLight.castShadow = true
    directionalLight.shadow.camera.far = 15
    directionalLight.shadow.mapSize.set(1024, 1024)
    directionalLight.shadow.normalBias = 0.05
    directionalLight.position.set(0.25, 3, - 2.25)
    scene.add(directionalLight)

    // ... existing setup code ...
    const sizes = {
      width: window.innerWidth / 2,
      height: window.innerHeight / 2
    }

    window.addEventListener('resize', () =>
    {
      // Update sizes
      sizes.width = window.innerWidth
      sizes.height = window.innerHeight

      // Update camera
      camera.aspect = sizes.width / sizes.height
      camera.updateProjectionMatrix()

      // Update renderer
      renderer.setSize(sizes.width, sizes.height)
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })

    // ... existing setup code ...
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
    camera.position.set(4, 1, - 4)
    scene.add(camera)

    // Controls
    const controls = new OrbitControls(camera, canvas)
    controls.enableDamping = true

    // ... existing setup code ...
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true
    })
    renderer.toneMapping = THREE.ReinhardToneMapping
    renderer.toneMappingExposure = 3
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFSoftShadowMap
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

    // ... existing setup code ...
    const tick = () =>
    {
      // Update controls
      controls.update()

      // Update points only when the scene is ready
      if(sceneReady)
      {
        // Go through each point
        for(const point of points)
        {
          // Get 2D screen position
          const screenPosition = point.position.clone()
          screenPosition.project(camera)
    
          // Set the raycaster
          raycaster.setFromCamera(screenPosition, camera)
          const intersects = raycaster.intersectObjects(scene.children, true)
    
          // No intersect found
          if(intersects.length === 0)
          {
            // Show
            point.element?.classList.add('visible')
          }

          // Intersect found
          else
          {
            // Get the distance of the intersection and the distance of the point
            const intersectionDistance = intersects[0].distance
            const pointDistance = point.position.distanceTo(camera.position)
    
            // Intersection is close than the point
            if(intersectionDistance < pointDistance)
            {
              // Hide
              point.element?.classList.remove('visible')
            }
            // Intersection is further than the point
            else
            {
              // Show
              point.element?.classList.add('visible')
            }
          }
    
          const translateX = screenPosition.x * sizes.width * 0.5
          const translateY = - screenPosition.y * sizes.height * 0.5
          if (point.element) point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`
        }
      }

      // Render
      renderer.render(scene, camera)

      // Call tick again on the next frame
      window.requestAnimationFrame(tick)
    }

    tick()
  }, [])

  return <>
   <div className="loading-bar"></div>

<div className="point point-0">
        <div className="label">1</div>
        <div className="text">Front and top screen with HUD aggregating terrain and battle informations.</div>
      </div>
      <div className="point point-1">
        <div className="label">2</div>
        <iframe width="684" height="684" 
  src="https://observablehq.com/embed/38ee8bc3b2f2ecf1@31?cells=aslflasdf&banner=false"></iframe>
        <div className="text">Ventilation with air purifier and detection of environment toxicity.</div>
      </div>
      <div className="point point-2">
        <div className="label">3</div>
        <iframe src="https://www.youtube.com/embed/dQw4w9WgXcQ?si=8383838383838383" className="w-full h-full"></iframe>
        <div className="text">Cameras supporting night vision and heat vision with automatic adjustment.</div>
      </div>
  
<canvas ref={canvasRef}

style={{ width: '50%', height: '50%' }}
className="webgl border border-gray-200" />
  </>
}


const updateAllMaterials = (scene) =>
    {
        scene.traverse((child) =>
        {
            if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
            {
                // child.material.envMap = environmentMap
                //child.material.envMapIntensity = debugObject.envMapIntensity
                child.material.needsUpdate = true
                child.castShadow = true
                child.receiveShadow = true
            }
        })
    }
    