"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import example1Code from './shaderToy1';
import example2Code from './shaderToy2';
import ShaderToyNode from './ShaderToyNode';
import { bloom } from "three/addons/tsl/display/BloomNode.js";
import { TSL } from "three/webgpu";

export default function Page() {

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

        let camera: THREE.PerspectiveCamera, scene: THREE.Scene;
    let renderer: THREE.WebGPURenderer, postProcessing: any, controls: OrbitControls, clock: THREE.Clock;

    const screenPointer = new THREE.Vector2();
    const scenePointer = new THREE.Vector3();
    const raycastPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const raycaster = new THREE.Raycaster();

    // ========== Initialization Function ==========
    function init() {
      //console.log("init", THREE.Node);
      camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(0, 0, 10);

      scene = new THREE.Scene();

      clock = new THREE.Clock();

      // Renderer (attach to our ref canvas)
      renderer = new THREE.WebGPURenderer({ canvas, antialias: true });
      renderer.setClearColor(0x14171a);
      renderer.setPixelRatio(window.devicePixelRatio);
      renderer.setSize(window.innerWidth, window.innerHeight);

   
    // Create a plane geometry that fills the screen
    const geometry = new THREE.PlaneGeometry(10, 10);

    const uniformsData = new Float32Array(8); // 2 for resolution, 1 for time, 4 for mouse, 1 padding
    const shaderToy1Node = new ShaderToyNode();
    shaderToy1Node.parse( example1Code );

    const shaderToy2Node = new ShaderToyNode();
    shaderToy2Node.parse( example2Code );

    let material_1 = new THREE.MeshBasicNodeMaterial({});

    // material_1.colorNode = shaderToy1Node.mix(
    //     shaderToy2Node,
    //     TSL.oscSine(TSL.time.mul(0.3))
    // );

    material_1.colorNode = TSL.oscSine( TSL.time.mul( .3 ) ).mix( shaderToy1Node, shaderToy2Node );

    console.log("material_1", THREE.Node);

    //material_1.colorNode = TSL.oscSine( TSL.time.mul( .3 ) ).mix( shaderToy1Node, shaderToy2Node );

    const mesh = new THREE.Mesh(geometry, material_1);
    scene.add(mesh);

      
      controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      
      controls.maxDistance = 75;

    
      renderer.setAnimationLoop(animate);
    }


    // === Pointer Move ===
    function onPointerMove(e: PointerEvent) {
      screenPointer.x = (e.clientX / window.innerWidth) * 2 - 1;
      screenPointer.y = -(e.clientY / window.innerHeight) * 2 + 1;
    }

    // === Update pointer intersection ===
    function updatePointer() {
      raycaster.setFromCamera(screenPointer, camera);
      raycaster.ray.intersectPlane(raycastPlane, scenePointer);
    }

    const startTime = performance.now();
    // === Animation Loop ===
    function animate() {
 
      // rotate colors
      const delta = clock.getDelta();
   
      const elapsedTime = clock.getElapsedTime();
      let elapsed = (performance.now() - startTime) * 0.001;

 
      //material.uniforms.iTime.value = elapsed;

      controls.update();
      //postProcessing.render();
      renderer.render(scene, camera);
    }

    // Initialize everything
    init();

    // === Cleanup on unmount ===
    return () => {
      // If you'd like to remove the GUI and/or kill the renderer
    };

  }, []);

  // The canvas is rendered by Next/React; we attach Three.js to this canvas in our useEffect
  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}
