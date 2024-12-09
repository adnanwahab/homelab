'use client'
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function Communal_One() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (!canvasRef.current) return;

        const scene = new THREE.Scene();
        scene.background = new THREE.Color(0xf0f0f0);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 5, 7);

        const renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            canvas: canvasRef.current 
        });
        renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);

        const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
        scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
        directionalLight.position.set(5, 5, 5);
        scene.add(directionalLight);

        const table = new THREE.Mesh(
            new THREE.CylinderGeometry(2, 2, 0.1, 32),
            new THREE.MeshPhongMaterial({ color: 0xeeeeee })
        );
        table.position.y = 1;
        scene.add(table);

        const wallMaterial = new THREE.MeshPhongMaterial({ 
            color: 0xcccccc,
            side: THREE.DoubleSide 
        });

        const backWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 6),
            wallMaterial
        );
        backWall.position.set(0, 3, -5);
        scene.add(backWall);

        const leftWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 6),
            wallMaterial
        );
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.set(-5, 3, 0);
        scene.add(leftWall);

        const rightWall = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 6),
            wallMaterial
        );
        rightWall.rotation.y = -Math.PI / 2;
        rightWall.position.set(5, 3, 0);
        scene.add(rightWall);

        const floor = new THREE.Mesh(
            new THREE.PlaneGeometry(10, 10),
            new THREE.MeshPhongMaterial({ color: 0xdddddd })
        );
        floor.rotation.x = -Math.PI / 2;
        scene.add(floor);

        const controls = new OrbitControls(camera, renderer.domElement);
        controls.enableDamping = true;
        controls.dampingFactor = 0.05;

        function animate() {
            requestAnimationFrame(animate);
            controls.update();
            renderer.render(scene, camera);
        }
        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        // Cleanup function
        return () => {
            window.removeEventListener('resize', handleResize);
            renderer.dispose();
            // Clean up all geometries and materials
            scene.traverse((object) => {
                if (object instanceof THREE.Mesh) {
                    object.geometry.dispose();
                    if (object.material instanceof THREE.Material) {
                        object.material.dispose();
                    }
                }
            });
        };
    }, []); // Empty dependency array means this effect runs once on mount

    return (
        <canvas 
            ref={canvasRef}
            style={{ width: '50%', height: '50%' }}
        />
    );
}

export default Communal_One;