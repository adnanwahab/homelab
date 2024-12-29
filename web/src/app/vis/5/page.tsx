
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

        // Create a line geometry for the timeline
const lineMaterial = new THREE.LineBasicMaterial({ color: 0x0000ff });
const lineGeometry = new THREE.BufferGeometry().setFromPoints([
  new THREE.Vector3(-10, 0, 0),
  new THREE.Vector3(10, 0, 0),
]);
const timeline = new THREE.Line(lineGeometry, lineMaterial);
scene.add(timeline);

// Create text for the year 1913
const loader = new THREE.FontLoader();
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const textGeometry = new THREE.TextGeometry('1913', {
    font: font,
    size: 0.5,
    height: 0.1,
  });
  const textMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const textMesh = new THREE.Mesh(textGeometry, textMaterial);
  textMesh.position.set(0, -0.5, 0);
  scene.add(textMesh);
});

// Create blocks to indicate the events
const blockMaterial = new THREE.MeshBasicMaterial({ color: 0xffa500 });
const blockGeometry = new THREE.BoxGeometry(0.5, 0.2, 0.1);

const event1 = new THREE.Mesh(blockGeometry, blockMaterial);
event1.position.set(-1, 0, 0);
scene.add(event1);

const event2 = new THREE.Mesh(blockGeometry, blockMaterial);
event2.position.set(2, 0, 0);
scene.add(event2);

// Create text for an event
loader.load('https://threejs.org/examples/fonts/helvetiker_regular.typeface.json', function (font) {
  const eventTextGeometry = new THREE.TextGeometry('Picasso and Eva move to...', {
    font: font,
    size: 0.2,
    height: 0.05,
  });
  const eventTextMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const eventTextMesh = new THREE.Mesh(eventTextGeometry, eventTextMaterial);
  eventTextMesh.position.set(-1.5, 0.2, 0);
  scene.add(eventTextMesh);
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