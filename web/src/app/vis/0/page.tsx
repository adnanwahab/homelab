
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

        const geometry1 = new THREE.TorusKnotGeometry(10, 3, 100, 16);
const material1 = new THREE.MeshBasicMaterial({ color: 0x7f7fff, wireframe: true });
const torusKnot = new THREE.Mesh(geometry1, material1);
scene.add(torusKnot);

const geometry2 = new THREE.IcosahedronGeometry(5, 0);
const material2 = new THREE.MeshBasicMaterial({ color: 0xff7f7f, wireframe: true });
const icosahedron = new THREE.Mesh(geometry2, material2);
icosahedron.position.x = 20;
scene.add(icosahedron);

const geometry3 = new THREE.DodecahedronGeometry(5, 0);
const material3 = new THREE.MeshBasicMaterial({ color: 0x7fff7f, wireframe: true });
const dodecahedron = new THREE.Mesh(geometry3, material3);
dodecahedron.position.x = -20;
scene.add(dodecahedron);

const geometry4 = new THREE.SphereGeometry(5, 32, 32);
const material4 = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true });
const sphere = new THREE.Mesh(geometry4, material4);
sphere.position.y = 15;
scene.add(sphere);

const geometry5 = new THREE.TorusGeometry(5, 1, 16, 100);
const material5 = new THREE.MeshBasicMaterial({ color: 0xfff7f7, wireframe: true });
const torus = new THREE.Mesh(geometry5, material5);
torus.position.y = -15;
scene.add(torus);

function animate() {
    requestAnimationFrame(animate);
    torusKnot.rotation.x += 0.01;
    torusKnot.rotation.y += 0.01;
    icosahedron.rotation.x += 0.01;
    icosahedron.rotation.y += 0.01;
    dodecahedron.rotation.x += 0.01;
    dodecahedron.rotation.y += 0.01;
    sphere.rotation.x += 0.01;
    sphere.rotation.y += 0.01;
    torus.rotation.x += 0.01;
    torus.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

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