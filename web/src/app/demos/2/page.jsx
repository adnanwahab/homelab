"use client"; // If you're using the new app router in Next.js 13+, ensure client rendering
export default function FSKPage() {
  return <div>Hello</div>;
}

import React, { useEffect, useRef, useState, useCallback } from "react";

// Comment out Google Maps related imports
// import "./deps/map.js";
// import "./deps/progress.js";
// import "./deps/snackbar.js";
// import "./deps/tweet-button.js";
// import { GoogleStreetViewLoader } from "./deps/PanomNom/GoogleStreetViewLoader.js";
// import { getIdByLocation } from "./deps/PanomNom/utils.js";

import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Mesh,
  CanvasTexture,
  RepeatWrapping,
  TorusKnotBufferGeometry,
  DirectionalLight,
  IcosahedronBufferGeometry,
} from "./third_party/three.module.js";
import { OrbitControls } from "./third_party/OrbitControls.js";

import { EquirectangularToCubemap } from "./EquirectangularToCubemap.js";
import { material } from "./Material.js";
import { twixt } from "./deps/twixt.js";
import { material as backdropMaterial } from "./BackdropMaterial.js";


function actualFSKPage() {
  // Add state for material
  const [material, setMaterial] = useState(null);

  // --- Refs for DOM elements (map, progress, snack, etc.) ---
  const mapRef = useRef(null);
  const progressRef = useRef(null);
  const snackBarRef = useRef(null);
  const descriptionRef = useRef(null);

  // Three.js container and references
  const threeCanvasParentRef = useRef(null);
  const rendererRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const torusRef = useRef(null);
  const backdropRef = useRef(null);

  // Keep track of loaded location
  const [currentLocation, setCurrentLocation] = useState("");

  // Move twixt references inside useEffect
  const [running, setRunning] = useState(true);
  const timeRef = useRef(0);
  const prevTimeRef = useRef(0); // Changed from performance.now()

  // Remove twixt initialization from top level
  const speed = useRef(null);
  const textureScale = useRef(null);
  const innerScatter = useRef(null);
  const outerScatter = useRef(null);
  const normalScale = useRef(null);
  const reflectivity = useRef(null);
  const roughness = useRef(null);
  const darkness = useRef(null);
  const smoothness = useRef(null);

  // Replace canvasRef.current = document.createElement('canvas') with a React ref
  const textureCanvasRef = useRef(null);

  // Initialize twixt values in useEffect
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Import and initialize twixt
    import('./deps/twixt.js').then(({ twixt }) => {
      speed.current = twixt.create("speed", 1);
      textureScale.current = twixt.create("scale", 2);
      innerScatter.current = twixt.create("innerScatter", 5);
      outerScatter.current = twixt.create("outerScatter", 0);
      normalScale.current = twixt.create("normalScale", 0.5);
      reflectivity.current = twixt.create("reflectivity", 0);
      roughness.current = twixt.create("roughness", 1);
      darkness.current = twixt.create("darkness", 0);
      smoothness.current = twixt.create("smoothness", 0);
      
      // Set initial time
      prevTimeRef.current = performance.now();
    });
  }, []);

  // --- Helper to resize the renderer ---
  const handleResize = useCallback(() => {
    if (!rendererRef.current || !cameraRef.current) return;
    const w = window.innerWidth;
    const h = window.innerHeight;
    rendererRef.current.setSize(w, h);
    cameraRef.current.aspect = w / h;
    cameraRef.current.updateProjectionMatrix();
  }, []);

  // --- The main "load" function (similar to original code) ---
  const load = useCallback(
    async function (lat, lng) {
      console.log("Would load location:", lat, lng);
      
      if (!textureCanvasRef.current) return;

      const ctx = textureCanvasRef.current.getContext('2d');
      if (ctx) {
        const gradient = ctx.createLinearGradient(0, 0, textureCanvasRef.current.width, textureCanvasRef.current.height);
        gradient.addColorStop(0, '#2196f3');
        gradient.addColorStop(1, '#21f3a1');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, textureCanvasRef.current.width, textureCanvasRef.current.height);
      }

      // Create basic texture using the React canvas ref
      const texture = new CanvasTexture(textureCanvasRef.current);
      const equiToCube = new EquirectangularToCubemap(rendererRef.current);
      const cubemap = equiToCube.convert(texture, 1024);

      texture.wrapS = texture.wrapT = RepeatWrapping;
      cubemap.wrapS = cubemap.wrapT = RepeatWrapping;
      cubemap.offset.set(0.5, 0);

      // Update materials
      if (torusRef.current) {
        torusRef.current.material.uniforms.envMap.value = cubemap;
      }
      backdropMaterial.uniforms.envMap.value = texture;
    },
    []
  );

  // --- Event Handlers for the Buttons ---
  const pause = useCallback(() => {
    setRunning((prev) => {
      const newRunning = !prev;
      if (newRunning) {
        const s = 1 + Math.random() * 2;
        speed.current.to(s, s * 200, "OutQuint");
      } else {
        speed.current.to(0, speed.current.value * 200, "OutQuint");
      }
      return newRunning;
    });
  }, []);

  const randomize = useCallback(() => {
    textureScale.current.to(1 + Math.round(Math.random()) * 10, 200);
    innerScatter.current.to(Math.random() * 5, 200);
    outerScatter.current.to(Math.random() * 2, 200);
    normalScale.current.to(Math.random() * 2, 200);
    smoothness.current.to(Math.random(), 200);
    roughness.current.to(Math.random(), 200);
    darkness.current.to(Math.round(Math.random()), 200);
    reflectivity.current.to(Math.round(Math.random()), 200);
  }, []);

  const capture = useCallback(() => {
    if (!rendererRef.current) return;
    // rendererRef.current.domElement.toBlob((blob) => {
    //   const url = URL.createObjectURL(blob);
    //   const downloadBtn = document.createElement("a");
    //   downloadBtn.setAttribute(
    //     "download",
    //     `fsk-${performance.now()}-${currentLocation}.png`
    //   );
    //   downloadBtn.setAttribute("href", url);
    //   downloadBtn.click();
    // });
  }, [currentLocation]);

  const applyChrome = useCallback(() => {
    textureScale.current.to(1);
    innerScatter.current.to(0, 200);
    outerScatter.current.to(0, 200);
    normalScale.current.to(0, 200);
    reflectivity.current.to(1, 200);
    roughness.current.to(0, 200);
    smoothness.current.to(0, 200);
    darkness.current.to(0, 200);
  }, []);

  const applyGlass = useCallback(() => {
    textureScale.current.to(1);
    innerScatter.current.to(0, 200);
    outerScatter.current.to(0, 200);
    normalScale.current.to(0, 200);
    reflectivity.current.to(0, 200);
    smoothness.current.to(0, 200);
    roughness.current.to(0, 200);
    darkness.current.to(0, 200);
  }, []);

  // --- The main render loop (Similar to original "render" function) ---
  const animate = useCallback(() => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current || 
        !controlsRef.current || !material || !speed.current) // Add check for speed
      return;

    controlsRef.current.update();

    const now = performance.now();
    const dt = now - prevTimeRef.current;
    prevTimeRef.current = now;

    // If speed is 0, it effectively "pauses" the time
    timeRef.current += dt * speed.current.value;

    // Update material uniforms only if material exists
    if (material) {
      material.uniforms.repeat.value = textureScale.current.value;
      material.uniforms.innerScatter.value = innerScatter.current.value;
      material.uniforms.outerScatter.value = outerScatter.current.value;
      material.uniforms.normalScale.value = normalScale.current.value;
      material.uniforms.reflectivity.value = reflectivity.current.value;
      material.uniforms.roughness.value = roughness.current.value;
      material.uniforms.darkness.value = darkness.current.value;
      material.uniforms.smoothness.value = smoothness.current.value;
    }

    // rotate the Torus
    const t = timeRef.current / 10000;
    if (torusRef.current) {
      torusRef.current.rotation.x = 0.49 * t;
      torusRef.current.rotation.y = 0.5 * t;
      torusRef.current.rotation.z = 0.51 * t;
      material.uniforms.time.value = t;
    }

    rendererRef.current.render(sceneRef.current, cameraRef.current);

    // Request next frame
    requestAnimationFrame(animate);
  }, [material]);

  // Initialize material on client-side only
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Import material dynamically
      import('./Material.js').then(({ material }) => {
        setMaterial(material);
      });
    }
  }, []);

  // --- Setup the scene and initial loading once on mount ---
  useEffect(() => {
    if (typeof window === "undefined" || !material) return; // Wait for material to be loaded

    // Create the renderer
    const renderer = new WebGLRenderer({
      antialias: true,
      preserveDrawingBuffer: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    // attach to DOM
    if (threeCanvasParentRef.current) {
      threeCanvasParentRef.current.appendChild(renderer.domElement);
    }
    rendererRef.current = renderer;

    // Create scene, camera
    const scene = new Scene();
    sceneRef.current = scene;

    const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.001, 10);
    camera.position.set(0.2, -0.1, 0).normalize().multiplyScalar(0.2);
    camera.lookAt(scene.position);
    cameraRef.current = camera;

    // Orbit controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.minDistance = 0.1;
    controls.maxDistance = 1.9;
    controls.enablePan = false;
    controlsRef.current = controls;

    // Light
    const directLight = new DirectionalLight(0xffffff);
    scene.add(directLight);

    // Backdrop
    const backdropMesh = new Mesh(
      new IcosahedronBufferGeometry(2, 3),
      backdropMaterial
    );
    backdropMesh.rotation.y = Math.PI;
    scene.add(backdropMesh);
    backdropRef.current = backdropMesh;

    // Torus
    const torusMesh = new Mesh(
      new TorusKnotBufferGeometry(0.05, 0.015, 400, 36, 1, 3),
      material
    );
    scene.add(torusMesh);
    torusRef.current = torusMesh;

    // handle initial size
    handleResize();
    //window.addEventListener("resize", handleResize);

    // Keyboard events (if needed)
    const handleKeyDown = (e) => {
      // Avoid interfering if user is typing in input
      if (e.target && e.target.tagName === "INPUT") return;
      if (e.code === "Space") {
        pause();
      } else if (e.code === "KeyR") {
        randomize();
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    // Start animation
    requestAnimationFrame(animate);

    // If there's a hash location, try to load it
    const hash = window.location.hash.substring(1);
    const [lat, lng] = hash.split(",");
    if (lat && lng) {
      load(parseFloat(lat), parseFloat(lng));
    } else {
      // Or ask the map to randomize location
      // mapRef.current?.randomLocation();
      // For demonstration, let's just pick something:
      load(40.6892, -74.0445); // e.g. Statue of Liberty
    }

    // Cleanup on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("keydown", handleKeyDown);
      renderer.dispose();
    };
  }, [handleResize, pause, randomize, load, animate, material]);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", margin: 0 }}>
      {/* Add hidden canvas element for texture generation */}
      <canvas 
        ref={textureCanvasRef}
        width={1024}
        height={512}
        style={{ display: 'none' }}
      />

      {/* Comment out Google Maps related elements */}
      {/* <map-browser
        id="map-browser"
        ref={mapRef}
        style={{ display: "none" }}
      ></map-browser>
      <progress-bar ref={progressRef} style={{ display: "none" }}></progress-bar>
      <snack-bar ref={snackBarRef}></snack-bar> */}

      {/* Keep the rest of the UI */}
      <div
        id="description"
        ref={descriptionRef}
        style={{ position: "absolute", top: 0, left: 0, color: "#fff", padding: 8 }}
      >
        Three.js Demo (Google Maps disabled)
      </div>

      {/* Container for the Three.js renderer canvas */}
      <div ref={threeCanvasParentRef} style={{ width: "100%", height: "100%" }} />

      {/* Example Buttons */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          padding: "8px",
        }}
      >
        <button id="pauseBtn" onClick={pause}>
          Pause/Resume
        </button>
        <button id="snapBtn" onClick={capture}>
          Snap
        </button>
        <button id="chromeBtn" onClick={applyChrome}>
          Chrome
        </button>
        <button id="glassBtn" onClick={applyGlass}>
          Glass
        </button>
        <button id="randomBtn" onClick={randomize}>
          Random
        </button>
      </div>
    </div>
  );
}
