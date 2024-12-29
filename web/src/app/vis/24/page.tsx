
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

        const loader = new THREE.TextureLoader();
loader.load('path_to_your_texture.jpg', function (texture) {
  const material = new THREE.SpriteMaterial({ map: texture });
  const sprite = new THREE.Sprite(material);
  
  sprite.scale.set(10, 10, 1);
  scene.add(sprite);
});

// Sphere with lines
const numLines = 50;
const radius = 5;
const material = new THREE.LineBasicMaterial({ color: 0xffffff });
for (let i = 0; i < numLines; i++) {
  const geometry = new THREE.Geometry();
  const angle = (i / numLines) * Math.PI * 2;
  geometry.vertices.push(
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(
      radius * Math.cos(angle),
      radius * Math.sin(angle),
      0
    )
  );

  const line = new THREE.Line(geometry, material);
  scene.add(line);
}

// Central abstract geometry
const abstractGeometry = new THREE.TorusKnotGeometry(1, 0.3, 100, 16);
const abstractMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
const abstractMesh = new THREE.Mesh(abstractGeometry, abstractMaterial);
abstractMesh.scale.set(1, 1, 1);
scene.add(abstractMesh);

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