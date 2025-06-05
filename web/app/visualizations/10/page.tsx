"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

export default function SphereDemo() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      95,
      window.innerWidth / window.innerHeight,
      0.1,
      5000
    );

    const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
    renderer.setClearColor(0xe2ded2, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Geometry and material setup
    const geometry = new THREE.SphereGeometry(6, 64, 64);

    const uniforms = THREE.UniformsUtils.merge([
      THREE.UniformsLib["ambient"],
      THREE.UniformsLib["lights"],
      THREE.UniformsUtils.clone(THREE.ShaderLib.phong.uniforms),
      {
        diffuse: {
          type: "c",
          value: new THREE.Color(0xb19cd9)
        },
        dirSpecularWeight: {
          type: "v3",
          value: new THREE.Vector3(0.5, 0.5, 0.5)
        },
        time: {
          type: "f",
          value: 0.0
        }
      }
    ]);

    // Shader code
    const vertexShader = `
      uniform float time;
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vNormal = normalize(normalMatrix * normal);
        vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
        vViewPosition = -mvPosition.xyz;
        gl_Position = projectionMatrix * mvPosition;
      }
    `;

    const fragmentShader = `
      uniform vec3 diffuse;
      uniform vec3 dirSpecularWeight;
      uniform float shininess;
      uniform float time;
      
      varying vec3 vNormal;
      varying vec3 vViewPosition;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 viewPosition = normalize(vViewPosition);
        
        // Softer color variation
        vec3 color = diffuse * 0.8 * (1.0 + sin(time + vNormal.x * 2.0));
        
        // Softer lighting
        float light = dot(normal, vec3(1.0));
        color *= 0.7 + 0.3 * light;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const material = new THREE.ShaderMaterial({
      uniforms: uniforms,
      vertexShader,
      fragmentShader,
      lights: true
    });

    material.uniforms.shininess.value = 34.0;

    const sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);

    // Lighting
    const hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.6);
    hemiLight.color.setHSL(0.6, 0.5, 0.8);
    hemiLight.position.set(0, 10, 0);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.3);
    dirLight.color.setHSL(0.1, 0.5, 0.8);
    dirLight.position.set(-1, 1.75, 1);
    dirLight.position.multiplyScalar(30);
    scene.add(dirLight);

    camera.position.z = 10;

    // Animation
    function animate(timestamp: number) {
      const t = timestamp * 0.001;
      material.uniforms.time.value = t;
      sphere.rotation.z = -t * 0.02 - 0.2;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }

    // Start animation
    requestAnimationFrame(animate);

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      // Dispose of Three.js resources
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}