'use client';

import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const ShaderVisualization = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Setup
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Create a plane that fills the screen
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(width, height) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        
        #define t iTime
        #define r iResolution.xy
        
        void main() {
          vec3 c;
          float l, z = t;
          
          for(int i = 0; i < 3; i++) {
            vec2 uv, p = gl_FragCoord.xy / r;
            uv = p;
            p -= 0.5;
            p.x *= r.x / r.y;
            z += 0.07;
            l = length(p);
            uv += p / l * (sin(z) + 1.0) * abs(sin(l * 9.0 - z - z));
            c[i] = 0.01 / length(mod(uv, 1.0) - 0.5);
          }
          
          gl_FragColor = vec4(c / l, t);
        }
      `
    });

    // Create mesh and add to scene
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Animation loop
    let animationFrameId;
    const startTime = Date.now();

    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      shaderMaterial.uniforms.iTime.value = elapsedTime;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      renderer.setSize(newWidth, newHeight);
      shaderMaterial.uniforms.iResolution.value.set(newWidth, newHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      <div 
        ref={containerRef} 
        className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg"
      />

    </div>
  );
};

export default ShaderVisualization;