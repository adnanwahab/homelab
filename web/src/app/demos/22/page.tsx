'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import styles from './page.module.css';

export default function SpaceDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    let renderer: THREE.WebGLRenderer,
        camera: THREE.PerspectiveCamera,
        scene: THREE.Scene,
        planet: THREE.Mesh,
        moon: THREE.Mesh,
        clock: THREE.Clock,
        sphereBg: THREE.Mesh,
        terrainGeometry: THREE.PlaneGeometry,
        terrain: THREE.Mesh,
        timeout_Debounce: ReturnType<typeof setTimeout>,
        cameraDx = 0.05,
        count = 0,
        t = 0,
        frame = 0,
        delta = 0;

    // Lines setup
    const lineTotal = 1000;
    const linesGeometry = new THREE.BufferGeometry();
    linesGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(6 * lineTotal), 3));
    linesGeometry.setAttribute("velocity", new THREE.BufferAttribute(new Float32Array(2 * lineTotal), 1));
    const l_positionAttr = linesGeometry.getAttribute("position");
    const l_vertex_Array = linesGeometry.getAttribute("position").array;
    const l_velocity_Array = linesGeometry.getAttribute("velocity").array;

    function init() {
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#000000");
      scene.fog = new THREE.Fog("#3c1e02", 0.5, 50);

      camera = new THREE.PerspectiveCamera(55, canvasRef.current!.clientWidth / canvasRef.current!.clientHeight, 0.01, 1000);
      camera.position.set(0, 1, 32);

      const pointLight1 = new THREE.PointLight("#ffffff", 1, 0);
      pointLight1.position.set(0, 30, 30);
      scene.add(pointLight1);

      renderer = new THREE.WebGLRenderer({
        canvas: canvasRef.current!,
        antialias: true,
        alpha: true
      });
      renderer.setSize(canvasRef.current!.clientWidth, canvasRef.current!.clientHeight);
      renderer.setPixelRatio(window.devicePixelRatio);
      
      clock = new THREE.Clock();

      const loader = new THREE.TextureLoader();

      // Planet
      const texturePlanet = loader.load('https://i.ibb.co/h94JBXy/saturn3-ljge5g.jpg');
      texturePlanet.anisotropy = 16;
      const planetGeometry = new THREE.SphereGeometry(10, 50, 50);
      const planetMaterial = new THREE.MeshLambertMaterial({
        map: texturePlanet,
        fog: false
      });
      planet = new THREE.Mesh(planetGeometry, planetMaterial);
      planet.position.set(0, 8, -30);
      scene.add(planet);

      // Moon
      const textureMoon = loader.load('https://i.ibb.co/64zn361/moon-ndengb.jpg');
      textureMoon.anisotropy = 16;
      const moonGeometry = new THREE.SphereGeometry(2, 32, 32);
      const moonMaterial = new THREE.MeshPhongMaterial({
        map: textureMoon,
        fog: false
      });
      moon = new THREE.Mesh(moonGeometry, moonMaterial);
      moon.position.set(0, 8, 0);
      scene.add(moon);

      // Sphere Background 
      const textureSphereBg = loader.load('https://i.ibb.co/JCsHJpp/stars2-qx9prz.jpg');
      textureSphereBg.anisotropy = 16;
      const geometrySphereBg = new THREE.SphereGeometry(150, 32, 32);
      const materialSphereBg = new THREE.MeshBasicMaterial({
        side: THREE.BackSide,
        map: textureSphereBg,
        fog: false
      });
      sphereBg = new THREE.Mesh(geometrySphereBg, materialSphereBg);
      sphereBg.position.set(0, 50, 0);
      scene.add(sphereBg);

      // Terrain
      const textureTerrain = loader.load('');
      textureTerrain.rotation = THREE.MathUtils.degToRad(5);
      terrainGeometry = new THREE.PlaneGeometry(70, 70, 20, 20);
      const terrainMaterial = new THREE.MeshBasicMaterial({
        map: textureTerrain,
        fog: true
      });
      terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
      terrain.rotation.x = -0.47 * Math.PI;
      terrain.rotation.z = THREE.MathUtils.degToRad(90);
      scene.add(terrain);

      const t_vertex_Array = terrainGeometry.getAttribute("position").array;
      terrainGeometry.getAttribute("position").setUsage(THREE.DynamicDrawUsage);

      terrainGeometry.setAttribute("myZ", new THREE.BufferAttribute(new Float32Array(t_vertex_Array.length / 3), 1));
      const t_myZ_Array = terrainGeometry.getAttribute("myZ").array;

      for (let i = 0; i < t_vertex_Array.length / 3; i++) {
        t_myZ_Array[i] = THREE.MathUtils.randInt(0, 5);
      }

      // Terrain Lines
      const terrain_line = new THREE.LineSegments(
        terrainGeometry,
        new THREE.LineBasicMaterial({
          color: "#fff",
          fog: false
        })
      );
      terrain_line.rotation.x = -0.47 * Math.PI;
      terrain_line.rotation.z = THREE.MathUtils.degToRad(90);
      scene.add(terrain_line);

      // Stars
      for (let i = 0; i < lineTotal; i++) {
        let x = THREE.MathUtils.randInt(-100, 100);
        let y = THREE.MathUtils.randInt(10, 40);
        if (x < 7 && x > -7 && y < 20) x += 14;
        let z = THREE.MathUtils.randInt(0, -300);

        l_vertex_Array[6 * i + 0] = l_vertex_Array[6 * i + 3] = x;
        l_vertex_Array[6 * i + 1] = l_vertex_Array[6 * i + 4] = y;
        l_vertex_Array[6 * i + 2] = l_vertex_Array[6 * i + 5] = z;

        l_velocity_Array[2 * i] = l_velocity_Array[2 * i + 1] = 0;
      }
      const starsMaterial = new THREE.LineBasicMaterial({
        color: "#ffffff",
        transparent: true,
        opacity: 0.5,
        fog: false
      });
      const lines = new THREE.LineSegments(linesGeometry, starsMaterial);
      linesGeometry.getAttribute("position").setUsage(THREE.DynamicDrawUsage);
      scene.add(lines);
    }

    function limitFPS(interval: number) {
      requestAnimationFrame(() => limitFPS(interval));
      delta += clock.getDelta();

      if (delta > interval) {
        animate();
        delta = delta % interval;
      }
    }

    function animate() {
      planet.rotation.y += 0.002;
      sphereBg.rotation.x += 0.002;
      sphereBg.rotation.y += 0.002;
      sphereBg.rotation.z += 0.002;

      // Moon Animation
      moon.rotation.y -= 0.007;
      moon.rotation.x -= 0.007;
      moon.position.x = 15 * Math.cos(t) + 0;
      moon.position.z = 20 * Math.sin(t) - 35;
      t += 0.015;

      // Terrain Animation  
      const t_vertex_Array = terrainGeometry.getAttribute("position").array;
      const t_myZ_Array = terrainGeometry.getAttribute("myZ").array;

      for (let i = 0; i < t_vertex_Array.length / 3; i++) {
        if (i >= 210 && i <= 250) t_vertex_Array[i * 3 + 2] = 0;
        else {
          t_vertex_Array[i * 3 + 2] = Math.sin((i + count * 0.0003)) * (t_myZ_Array[i] - (t_myZ_Array[i] * 0.5));
          count += 0.1;
        }
      }

      // Stars Animation  
      for (let i = 0; i < lineTotal; i++) {
        l_velocity_Array[2 * i] += 0.0049;
        l_velocity_Array[2 * i + 1] += 0.005;

        l_vertex_Array[6 * i + 2] += l_velocity_Array[2 * i];
        l_vertex_Array[6 * i + 5] += l_velocity_Array[2 * i + 1];

        if (l_vertex_Array[6 * i + 2] > 50) {
          l_vertex_Array[6 * i + 2] = l_vertex_Array[6 * i + 5] = THREE.MathUtils.randInt(-200, 10);
          l_velocity_Array[2 * i] = 0;
          l_velocity_Array[2 * i + 1] = 0;
        }
      }

      // Camera Movement
      camera.position.x += cameraDx;
      camera.position.y = -1.2 * (1 - Math.abs(frame / 2000 - 0.5) / 0.5);
      camera.lookAt(0, 0, 0);
      frame += 8;
      if (frame > 2000) frame = 0;
      if (camera.position.x > 18) cameraDx = -cameraDx;
      if (camera.position.x < -18) cameraDx = Math.abs(cameraDx);

      l_positionAttr.needsUpdate = true;
      terrainGeometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    }

    function onWindowResize() {
      if (!canvasRef.current) return;
      camera.aspect = canvasRef.current.clientWidth / canvasRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(canvasRef.current.clientWidth, canvasRef.current.clientHeight);
    }

    // Initialize and start animation
    init();
    limitFPS(1 / 60);

    // Handle resize
    window.addEventListener("resize", () => {
      clearTimeout(timeout_Debounce);
      timeout_Debounce = setTimeout(onWindowResize, 80);
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      renderer.dispose();
      scene.clear();
    };
  }, []);

  const toggleFullscreen = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!isFullscreen) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  return (
    <main className={styles.container}>
      <canvas 
      width={window.innerWidth}
      height={window.innerHeight}
      ref={canvasRef} className={styles.canvas}></canvas>
      <button 
        className={styles.fullscreenButton} 
        onClick={toggleFullscreen}
      >
        {isFullscreen ? "Exit Fullscreen" : "Go Fullscreen"}
      </button>
    </main>
  );
}