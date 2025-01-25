"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three/webgpu";
//import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { color, cos, float, mix, range, sin, time, uniform, uv, vec3, vec4, PI2 } from 'three/tsl';

export default function WebGPUGalaxy() {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;
    if (!navigator.gpu) {
      console.warn("WebGPU is not supported in this browser.");
      return;
    }

    let renderer, scene, camera, controls;

    const init = async () => {
      // Create WebGPU renderer
      renderer = new THREE.WebGPURenderer({ antialias: true });
      await renderer.init();

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      renderer.setSize(width, height);
      containerRef.current.appendChild(renderer.domElement);

      // Scene setup
      scene = new THREE.Scene();
      scene.background = new THREE.Color(0x201919);

      // Camera setup
      camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 100);
      camera.position.set(4, 2, 5);

      // Controls
      //controls = new OrbitControls(camera, renderer.domElement);
      // controls.enableDamping = true;
      // controls.minDistance = 0.1;
      // controls.maxDistance = 50;

      // Galaxy material
      const material = new THREE.SpriteNodeMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending
      });

      const size = uniform(0.08);
      material.scaleNode = range(0, 1).mul(size);

      const radiusRatio = range(0, 1);
      const radius = radiusRatio.pow(1.5).mul(5).toVar();

      const branches = 3;
      const branchAngle = range(0, branches).floor().mul(PI2.div(branches));
      const angle = branchAngle.add(time.mul(radiusRatio.oneMinus()));

      const position = vec3(
        cos(angle),
        0,
        sin(angle)
      ).mul(radius);

      const randomOffset = range(vec3(-1), vec3(1)).pow(3).mul(radiusRatio).add(0.2);
      material.positionNode = position.add(randomOffset);

      const colorInside = uniform(color('#ffa575'));
      const colorOutside = uniform(color('#311599'));
      const colorFinal = mix(colorInside, colorOutside, radiusRatio.oneMinus().pow(2).oneMinus());
      const alpha = float(0.1).div(uv().sub(0.5).length()).sub(0.2);
      material.colorNode = vec4(colorFinal, alpha);

      // Create particle system
      const mesh = new THREE.InstancedMesh(new THREE.PlaneGeometry(1, 1), material, 20000);
      scene.add(mesh);

      // Animation loop
      renderer.setAnimationLoop(() => {
        controls.update();
        renderer.render(scene, camera);
      });
    };

    init();

    // Cleanup
    return () => {
      if (containerRef.current && renderer?.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }
      // if (controls) {
      //   controls.dispose();
      // }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        width: "100%",
        height: "100vh",
        border: "1px solid #ccc",
      }}
    />
  );
}