'use client';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { ImprovedNoise } from 'three/examples/jsm/math/ImprovedNoise.js';
import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';

export default function VolumetricLighting() {
  const containerRef = useRef(null);
  const [stats, setStats] = useState(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Import necessary modules
    import('three/examples/jsm/libs/stats.module.js').then((StatsModule) => {
      const Stats = StatsModule.default;
      const stats = new Stats();
      containerRef.current.appendChild(stats.dom);
      setStats(stats);
    });

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 250);
    camera.position.set(0, 5, -15);
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1;
    renderer.shadowMap.enabled = true;
    containerRef.current.appendChild(renderer.domElement);
    
    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
    
    // Create volumetric fog
    const fogColor = new THREE.Color(0x000000);
    scene.fog = new THREE.FogExp2(fogColor, 0.02);
    
    // Floor
    const floorGeometry = new THREE.PlaneGeometry(2000, 2000);
    const floorMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xbcbcbc, 
      roughness: 0.1, 
      metalness: 0 
    });
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    scene.add(floor);
    
    // Torus Knot
    const knotGeometry = new THREE.TorusKnotGeometry(1.5, 0.5, 200, 16);
    const knotMaterial = new THREE.MeshStandardMaterial({ 
      color: 0xffffff, 
      roughness: 0, 
      metalness: 0 
    });
    const knot = new THREE.Mesh(knotGeometry, knotMaterial);
    knot.position.set(0, 5, 0);
    knot.castShadow = true;
    scene.add(knot);
    
    // Rect Area Lights
    const rectLight1 = new THREE.RectAreaLight(0xff0000, 5, 4, 10);
    rectLight1.position.set(-5, 5, 5);
    scene.add(rectLight1);
    
    const rectLight2 = new THREE.RectAreaLight(0x00ff00, 5, 4, 10);
    rectLight2.position.set(0, 5, 5);
    scene.add(rectLight2);
    
    const rectLight3 = new THREE.RectAreaLight(0x0000ff, 5, 4, 10);
    rectLight3.position.set(5, 5, 5);
    scene.add(rectLight3);
    
    // Create light visualizations
    const createRectLightMesh = (rectLight) => {
      const geometry = new THREE.PlaneGeometry(4, 10);
      const frontMaterial = new THREE.MeshBasicMaterial({ 
        color: rectLight.color, 
        side: THREE.BackSide 
      });
      const backMaterial = new THREE.MeshStandardMaterial({ color: 0x111111 });
      
      const backSide = new THREE.Mesh(geometry, backMaterial);
      backSide.position.set(0, 0, 0.08);
      
      const frontSide = new THREE.Mesh(geometry, frontMaterial);
      frontSide.position.set(0, 0, 0.01);
      
      rectLight.add(backSide);
      rectLight.add(frontSide);
    };
    
    createRectLightMesh(rectLight1);
    createRectLightMesh(rectLight2);
    createRectLightMesh(rectLight3);
    
    // Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.minDistance = 5;
    controls.maxDistance = 200;
    controls.target.copy(knot.position);
    controls.update();
    
    // GUI
    const params = {
      exposure: renderer.toneMappingExposure,
      fogDensity: scene.fog.density,
      rectLightIntensity: 5
    };
    
    const gui = new GUI();
    gui.add(params, 'exposure', 0, 2).onChange((value) => {
      renderer.toneMappingExposure = value;
    });
    gui.add(params, 'fogDensity', 0, 0.05).onChange((value) => {
      scene.fog.density = value;
    });
    gui.add(params, 'rectLightIntensity', 0, 10).onChange((value) => {
      rectLight1.intensity = value;
      rectLight2.intensity = value;
      rectLight3.intensity = value;
    });
    
    // Animation clock
    const clock = new THREE.Clock();
    
    // Animation loop
    function animate() {
      const delta = clock.getDelta();
      
      // Rotate lights
      rectLight1.rotation.y += -delta;
      rectLight2.rotation.y += delta * 0.5;
      rectLight3.rotation.y += delta;
      
      // Rotate knot
      knot.rotation.y += delta * 0.2;
      
      // Update stats
      if (stats) stats.update();
      
      // Render
      renderer.render(scene, camera);
      
      // Request next frame
      requestAnimationFrame(animate);
    }
    
    // Start animation
    animate();
    
    // Handle window resize
    function handleResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      if (gui) gui.destroy();
      if (containerRef.current) containerRef.current.innerHTML = '';
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-0 left-0 p-4 text-white">
        <h1 className="text-xl font-bold">Volumetric Lighting Demo</h1>
        <p>Three.js with React and Next.js</p>
      </div>
    </div>
  );
}

