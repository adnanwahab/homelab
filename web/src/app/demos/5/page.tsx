'use client'
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import { CSS3DRenderer, CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer";
import TWEEN from "@tweenjs/tween.js";

// The same periodic table data from the original example
import tableData from "./periodicTableData";

export default function PeriodicTable() {
  const containerRef = useRef(null);

  // Refs for Three.js stuff
  const cameraRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const controlsRef = useRef(null);

  // We will store all CSS3DObjects in here
  const objectsRef = useRef([]);
  // We store the four target layouts here
  const targetsRef = useRef({
    table: [],
    sphere: [],
    helix: [],
    grid: []
  });

  useEffect(() => {
    // --- SETUP CAMERA ---
    const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.z = 3000;
    cameraRef.current = camera;

    // --- SETUP SCENE ---
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // --- CREATE OBJECTS (CSS3D) ---
    const objects = [];
    for (let i = 0; i < tableData.length; i += 5) {
      const element = document.createElement("div");
      element.className = "element";
      // You could style these in your CSS, or set them inline:
      element.style.width = "120px";
      element.style.height = "160px";
      element.style.backgroundColor = `rgba(0,127,127,${Math.random() * 0.5 + 0.25})`;
      element.style.boxShadow = "0px 0px 12px rgba(0,255,255,0.5)";
      element.style.border = "1px solid rgba(127,255,255,0.25)";
      element.style.fontFamily = "Helvetica, sans-serif";
      element.style.textAlign = "center";
      element.style.lineHeight = "normal";
      element.style.position = "relative";
      element.style.cursor = "default";

      const number = document.createElement("div");
      number.className = "number";
      number.textContent = i / 5 + 1;
      number.style.position = "absolute";
      number.style.top = "20px";
      number.style.right = "20px";
      number.style.fontSize = "12px";
      number.style.color = "rgba(127,255,255,0.75)";
      element.appendChild(number);

      const symbol = document.createElement("div");
      symbol.className = "symbol";
      symbol.textContent = tableData[i];
      symbol.style.position = "absolute";
      symbol.style.top = "40px";
      symbol.style.left = "0px";
      symbol.style.right = "0px";
      symbol.style.fontSize = "60px";
      symbol.style.fontWeight = "bold";
      symbol.style.color = "rgba(255,255,255,0.75)";
      symbol.style.textShadow = "0 0 10px rgba(0,255,255,0.95)";
      element.appendChild(symbol);

      const details = document.createElement("div");
      details.className = "details";
      details.innerHTML = tableData[i + 1] + "<br>" + tableData[i + 2];
      details.style.position = "absolute";
      details.style.bottom = "15px";
      details.style.left = "0px";
      details.style.right = "0px";
      details.style.fontSize = "12px";
      details.style.color = "rgba(127,255,255,0.75)";
      element.appendChild(details);

      const cssObject = new CSS3DObject(element);
      // Random starting position
      cssObject.position.x = Math.random() * 4000 - 2000;
      cssObject.position.y = Math.random() * 4000 - 2000;
      cssObject.position.z = Math.random() * 4000 - 2000;
      scene.add(cssObject);
      objects.push(cssObject);
    }
    objectsRef.current = objects;

    // --- CREATE TARGETS (table, sphere, helix, grid) ---

    // 1) TABLE layout
    const tableTargets = [];
    for (let i = 0; i < objects.length; i++) {
      const itemIndex = i * 5;
      // row/column from table data
      const col = tableData[itemIndex + 3];
      const row = tableData[itemIndex + 4];
      const object3D = new THREE.Object3D();
      object3D.position.x = col * 140 - 1330;
      object3D.position.y = -(row * 180) + 990;
      tableTargets.push(object3D);
    }

    // 2) SPHERE layout
    const sphereTargets = [];
    const vector = new THREE.Vector3();
    const length = objects.length;
    for (let i = 0; i < length; i++) {
      const phi = Math.acos(-1 + (2 * i) / length);
      const theta = Math.sqrt(length * Math.PI) * phi;
      const object3D = new THREE.Object3D();
      object3D.position.setFromSphericalCoords(800, phi, theta);
      vector.copy(object3D.position).multiplyScalar(2);
      object3D.lookAt(vector);
      sphereTargets.push(object3D);
    }

    // 3) HELIX layout
    const helixTargets = [];
    for (let i = 0; i < length; i++) {
      const theta = i * 0.175 + Math.PI;
      const y = -(i * 8) + 450;
      const object3D = new THREE.Object3D();
      object3D.position.setFromCylindricalCoords(900, theta, y);
      vector.x = object3D.position.x * 2;
      vector.y = object3D.position.y;
      vector.z = object3D.position.z * 2;
      object3D.lookAt(vector);
      helixTargets.push(object3D);
    }

    // 4) GRID layout
    const gridTargets = [];
    for (let i = 0; i < length; i++) {
      const object3D = new THREE.Object3D();
      object3D.position.x = ((i % 5) * 400) - 800;
      object3D.position.y = (-(Math.floor(i / 5) % 5) * 400) + 800;
      object3D.position.z = (Math.floor(i / 25)) * 1000 - 2000;
      gridTargets.push(object3D);
    }

    targetsRef.current.table = tableTargets;
    targetsRef.current.sphere = sphereTargets;
    targetsRef.current.helix = helixTargets;
    targetsRef.current.grid = gridTargets;

    // --- SETUP RENDERER ---
    const renderer = new CSS3DRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    if (containerRef.current) {
      containerRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // --- SETUP CONTROLS ---
    const controls = new TrackballControls(camera, renderer.domElement);
    controls.minDistance = 500;
    controls.maxDistance = 6000;
    controls.addEventListener("change", renderScene);
    controlsRef.current = controls;

    // --- INITIAL TRANSFORM (TABLE by default) ---
    transform(targetsRef.current.table, 2000);

    // --- HANDLE RESIZE ---
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderScene();
    }
    window.addEventListener("resize", onWindowResize);

    // --- ANIMATE LOOP ---
    let animationId;
    function animate() {
      animationId = requestAnimationFrame(animate);
      TWEEN.update();
      controls.update();
    }
    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", onWindowResize);
      cancelAnimationFrame(animationId);
      controls.dispose();
      // optionally remove renderer domElement if needed
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Helper function to render
  function renderScene() {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    rendererRef.current.render(sceneRef.current, cameraRef.current);
  }

  // The transform function from the original example, adapted
  function transform(targets, duration) {
    if (!objectsRef.current.length) return;
    TWEEN.removeAll();

    objectsRef.current.forEach((obj, i) => {
      const target = targets[i];
      new TWEEN.Tween(obj.position)
        .to(
          {
            x: target.position.x,
            y: target.position.y,
            z: target.position.z
          },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();

      new TWEEN.Tween(obj.rotation)
        .to(
          {
            x: target.rotation.x,
            y: target.rotation.y,
            z: target.rotation.z
          },
          Math.random() * duration + duration
        )
        .easing(TWEEN.Easing.Exponential.InOut)
        .start();
    });

    // Dummy tween to call render onUpdate
    new TWEEN.Tween({})
      .to({}, duration * 2)
      .onUpdate(renderScene)
      .start();
  }

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden" }}>
      {/* Info/title bar (optional) */}
      <div
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          color: "#8ff",
          zIndex: 10
        }}
      >
        <a href="https://threejs.org" target="_blank" rel="noopener noreferrer" style={{ color: "#8ff" }}>
          three.js
        </a>{" "}
        css3d – periodic table.
      </div>

      {/* Our 3D scene container */}
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />

      {/* Layout buttons */}
      <div
        style={{
          position: "absolute",
          bottom: 20,
          width: "100%",
          textAlign: "center",
          zIndex: 10
        }}
      >
        <button onClick={() => transform(targetsRef.current.table, 2000)}>TABLE</button>
        <button onClick={() => transform(targetsRef.current.sphere, 2000)}>SPHERE</button>
        <button onClick={() => transform(targetsRef.current.helix, 2000)}>HELIX</button>
        <button onClick={() => transform(targetsRef.current.grid, 2000)}>GRID</button>
      </div>
    </div>
  );
}
