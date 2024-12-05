'use client';
import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';
import { periodicTableData } from './periodicTableData'; // We'll move the table data to a separate file
import styles from './PeriodicTable.module.css';

export default function PeriodicTable() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<CSS3DRenderer | null>(null);
  const controlsRef = useRef<any>(null);
  const objectsRef = useRef<CSS3DObject[]>([]);
  const targetsRef = useRef({ table: [], sphere: [], helix: [], grid: [] });

  useEffect(() => {
    if (!containerRef.current) return;

    const init = () => {
      // Camera setup
      const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
      camera.position.z = 3000;
      cameraRef.current = camera;

      // Scene setup
      const scene = new THREE.Scene();
      sceneRef.current = scene;

      // Create elements
      const objects: CSS3DObject[] = [];
      const vector = new THREE.Vector3();

      // Table creation
      for (let i = 0; i < periodicTableData.length; i += 5) {
        const element = document.createElement('div');
        element.className = styles.element;
        element.style.backgroundColor = `rgba(0,127,127,${Math.random() * 0.5 + 0.25})`;

        const number = document.createElement('div');
        number.className = styles.number;
        number.textContent = String((i / 5) + 1);
        element.appendChild(number);

        const symbol = document.createElement('div');
        symbol.className = styles.symbol;
        symbol.textContent = periodicTableData[i];
        element.appendChild(symbol);

        const details = document.createElement('div');
        details.className = styles.details;
        details.innerHTML = `${periodicTableData[i + 1]}<br>${periodicTableData[i + 2]}`;
        element.appendChild(details);

        const objectCSS = new CSS3DObject(element);
        objectCSS.position.x = Math.random() * 4000 - 2000;
        objectCSS.position.y = Math.random() * 4000 - 2000;
        objectCSS.position.z = Math.random() * 4000 - 2000;
        scene.add(objectCSS);
        objects.push(objectCSS);

        // Table layout
        const object = new THREE.Object3D();
        object.position.x = (periodicTableData[i + 3] * 140) - 1330;
        object.position.y = -(periodicTableData[i + 4] * 180) + 990;
        targetsRef.current.table.push(object);
      }

      objectsRef.current = objects;

      // Initialize renderer
      const renderer = new CSS3DRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      containerRef.current.appendChild(renderer.domElement);
      rendererRef.current = renderer;

      // Controls
      const controls = new TrackballControls(camera, renderer.domElement);
      controls.minDistance = 500;
      controls.maxDistance = 6000;
      controls.addEventListener('change', render);
      controlsRef.current = controls;

      // Initial transform
      transform(targetsRef.current.table, 2000);
    };

    const transform = (targets: THREE.Object3D[], duration: number) => {
      TWEEN.removeAll();

      objectsRef.current.forEach((object, i) => {
        const target = targets[i];

        new TWEEN.Tween(object.position)
          .to({ x: target.position.x, y: target.position.y, z: target.position.z }, 
               Math.random() * duration + duration)
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();

        new TWEEN.Tween(object.rotation)
          .to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, 
               Math.random() * duration + duration)
          .easing(TWEEN.Easing.Exponential.InOut)
          .start();
      });

      new TWEEN.Tween({})
        .to({}, duration * 2)
        .onUpdate(render)
        .start();
    };

    const render = () => {
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };

    const animate = () => {
      requestAnimationFrame(animate);
      TWEEN.update();
      controlsRef.current?.update();
    };

    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
        render();
      }
    };

    init();
    animate();

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      // Cleanup
      controlsRef.current?.dispose();
      rendererRef.current?.domElement.remove();
    };
  }, []);

  const handleTransform = (type: 'table' | 'sphere' | 'helix' | 'grid') => {
    transform(targetsRef.current[type], 2000);
  };

  return (
    <div className={styles.container}>
      <div ref={containerRef} />
      <div className={styles.menu}>
        <button onClick={() => handleTransform('table')}>TABLE</button>
        <button onClick={() => handleTransform('sphere')}>SPHERE</button>
        <button onClick={() => handleTransform('helix')}>HELIX</button>
        <button onClick={() => handleTransform('grid')}>GRID</button>
      </div>
    </div>
  );
}