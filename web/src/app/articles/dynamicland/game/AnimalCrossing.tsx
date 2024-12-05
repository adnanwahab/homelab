'use client';
import * as THREE from "three";
import { useRef, useEffect } from "react";

function AnimalCrossing() {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const isRotatingRef = useRef(false);
  const previousMousePositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB); // Sky blue color
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Store refs for cleanup and event handlers
    sceneRef.current = scene;
    rendererRef.current = renderer;

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(100, 100);
    const groundMaterial = new THREE.MeshBasicMaterial({ color: 0x90EE90 }); // Light green
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    scene.add(ground);

    // Tree function
    function createTree(x, z) {
        const treeGroup = new THREE.Group();
        
        // Trunk
        const trunkGeometry = new THREE.CylinderGeometry(0.2, 0.2, 1, 8);
        const trunkMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
        const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
        
        // Leaves
        const leavesGeometry = new THREE.ConeGeometry(1, 2, 8);
        const leavesMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });
        const leaves = new THREE.Mesh(leavesGeometry, leavesMaterial);
        leaves.position.y = 1.5;
        
        treeGroup.add(trunk);
        treeGroup.add(leaves);
        treeGroup.position.set(x, 0.5, z);
        return treeGroup;
    }

    // House
    function createHouse() {
        const houseGroup = new THREE.Group();
        
        // Main body
        const bodyGeometry = new THREE.BoxGeometry(3, 2, 2);
        const bodyMaterial = new THREE.MeshBasicMaterial({ color: 0xFFE4C4 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        
        // Roof
        const roofGeometry = new THREE.ConeGeometry(2.2, 1.5, 4);
        const roofMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
        const roof = new THREE.Mesh(roofGeometry, roofMaterial);
        roof.rotation.y = Math.PI / 4;
        roof.position.y = 1.75;
        
        // Door
        const doorGeometry = new THREE.PlaneGeometry(0.6, 1);
        const doorMaterial = new THREE.MeshBasicMaterial({ color: 0x8B4513 });
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.position.set(0, -0.5, 1.01);
        
        houseGroup.add(body);
        houseGroup.add(roof);
        houseGroup.add(door);
        houseGroup.position.set(0, 1, 0);
        return houseGroup;
    }

    // Add elements to scene
    const house = createHouse();
    scene.add(house);

    // Add multiple trees
    [-4, -2, 2, 4].forEach(x => {
        [-4, -2, 2, 4].forEach(z => {
            if (Math.abs(x) + Math.abs(z) > 3) { // Don't place trees too close to house
                scene.add(createTree(x, z));
            }
        });
    });

    // Camera position
    camera.position.set(10, 8, 10);
    camera.lookAt(0, 0, 0);

    // Animation
    let animationFrameId;
    const animate = () => {
        animationFrameId = requestAnimationFrame(animate);
        renderer.render(scene, camera);
    };
    animate();

    // Event handlers
    const handleResize = () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    };

    const handleMouseDown = (e) => {
        isRotatingRef.current = true;
        previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseMove = (e) => {
        if (isRotatingRef.current) {
            const deltaX = e.clientX - previousMousePositionRef.current.x;
            camera.position.x = camera.position.x * Math.cos(deltaX * 0.01) + camera.position.z * Math.sin(deltaX * 0.01);
            camera.position.z = camera.position.z * Math.cos(deltaX * 0.01) - camera.position.x * Math.sin(deltaX * 0.01);
            camera.lookAt(0, 0, 0);
            previousMousePositionRef.current = { x: e.clientX, y: e.clientY };
        }
    };

    const handleMouseUp = () => {
        isRotatingRef.current = false;
    };

    window.addEventListener('resize', handleResize);
    renderer.domElement.addEventListener('mousedown', handleMouseDown);
    renderer.domElement.addEventListener('mousemove', handleMouseMove);
    renderer.domElement.addEventListener('mouseup', handleMouseUp);

    // Cleanup
    return () => {
        window.removeEventListener('resize', handleResize);
        renderer.domElement.removeEventListener('mousedown', handleMouseDown);
        renderer.domElement.removeEventListener('mousemove', handleMouseMove);
        renderer.domElement.removeEventListener('mouseup', handleMouseUp);
        cancelAnimationFrame(animationFrameId);
        if (containerRef.current) {
            containerRef.current.removeChild(renderer.domElement);
        }
    };
  }, []);

  return <div ref={containerRef} />;
}
