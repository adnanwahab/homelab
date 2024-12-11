"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import Stats from "three/addons/libs/stats.module.js";

import JoltPhysics from './mockJoltPhysics';

//import initJolt from '/js/jolt-physics.wasm-compat.js';


//import Jolt from 'jolt-physics';
//import Jolt from 'jolt-physics/wasm-compat';
import Jolt from 'jolt-physics/wasm';




export default function Learning_WASM() {
  console.log(Jolt)
  // initJolt().then(function (Jolt) {
  //   console.log(Jolt);
  //   MusicPhysics(Jolt);
  // });
}



function MusicPhysics(Jolt) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const physicsRef = useRef<any>(null);
  const boxesRef = useRef<THREE.InstancedMesh | null>(null);
  const spheresRef = useRef<THREE.InstancedMesh | null>(null);
  const statsRef = useRef<Stats | null>(null);

  useEffect(() => {
    const init = async () => {
      if (!containerRef.current) return;

      // Initialize physics
      physicsRef.current = await Jolt();

      const position = new THREE.Vector3();

      // Camera setup
      const camera = new THREE.PerspectiveCamera(
        50,
        window.innerWidth / window.innerHeight,
        0.1,
        100,
      );
      camera.position.set(-1, 1.5, 2);
      camera.lookAt(0, 0.5, 0);
      cameraRef.current = camera;

      // Scene setup
      const scene = new THREE.Scene();
      scene.background = new THREE.Color(0x666666);
      sceneRef.current = scene;

      // Lights
      const hemiLight = new THREE.HemisphereLight();
      scene.add(hemiLight);

      const dirLight = new THREE.DirectionalLight(0xffffff, 3);
      dirLight.position.set(5, 5, 5);
      dirLight.castShadow = true;
      dirLight.shadow.camera.zoom = 2;
      scene.add(dirLight);

      // Floor
      const floor = new THREE.Mesh(
        new THREE.BoxGeometry(10, 5, 10),
        new THREE.ShadowMaterial({ color: 0x444444 }),
      );
      floor.position.y = -2.5;
      floor.receiveShadow = true;
      floor.userData.physics = { mass: 0 };
      scene.add(floor);

      // Common materials and utilities
      const material = new THREE.MeshLambertMaterial();
      const matrix = new THREE.Matrix4();
      const color = new THREE.Color();

      // Boxes setup
      const geometryBox = new THREE.BoxGeometry(0.075, 0.075, 0.075);
      const boxes = new THREE.InstancedMesh(geometryBox, material, 400);
      boxes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      boxes.castShadow = true;
      boxes.receiveShadow = true;
      boxes.userData.physics = { mass: 1 };
      scene.add(boxes);
      boxesRef.current = boxes;

      // Initialize boxes
      for (let i = 0; i < boxes.count; i++) {
        matrix.setPosition(
          Math.random() - 0.5,
          Math.random() * 2,
          Math.random() - 0.5,
        );
        boxes.setMatrixAt(i, matrix);
        boxes.setColorAt(i, color.setHex(0xffffff * Math.random()));
      }

      // Spheres setup
      const geometrySphere = new THREE.IcosahedronGeometry(0.05, 4);
      const spheres = new THREE.InstancedMesh(geometrySphere, material, 400);
      spheres.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
      spheres.castShadow = true;
      spheres.receiveShadow = true;
      spheres.userData.physics = { mass: 1 };
      scene.add(spheres);
      spheresRef.current = spheres;

      // Initialize spheres
      for (let i = 0; i < spheres.count; i++) {
        matrix.setPosition(
          Math.random() - 0.5,
          Math.random() * 2,
          Math.random() - 0.5,
        );
        spheres.setMatrixAt(i, matrix);
        spheres.setColorAt(i, color.setHex(0xffffff * Math.random()));
      }

      physicsRef.current.addScene(scene);

      // Renderer setup
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.shadowMap.enabled = true;
      rendererRef.current = renderer;
      containerRef.current.appendChild(renderer.domElement);

      // Stats setup
      const stats = new Stats();
      statsRef.current = stats;
      containerRef.current.appendChild(stats.dom);

      // Controls setup
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.target.y = 0.5;
      controls.update();

      // Animation interval
      const intervalId = setInterval(() => {
        let index = Math.floor(Math.random() * boxes.count);
        position.set(0, Math.random() + 1, 0);
        physicsRef.current.setMeshPosition(boxes, position, index);

        index = Math.floor(Math.random() * spheres.count);
        position.set(0, Math.random() + 1, 0);
        physicsRef.current.setMeshPosition(spheres, position, index);
      }, 1000 / 60);

      // Animation loop
      const animate = () => {
        if (
          !rendererRef.current ||
          !sceneRef.current ||
          !cameraRef.current ||
          !statsRef.current
        )
          return;

        rendererRef.current.render(sceneRef.current, cameraRef.current);
        statsRef.current.update();
        requestAnimationFrame(animate);
      };
      animate();

      // Cleanup
      return () => {
        clearInterval(intervalId);
        if (containerRef.current) {
          containerRef.current.innerHTML = "";
        }
        renderer.dispose();
      };
    };

    init();
  }, []);

  return <div ref={containerRef} />;
}
