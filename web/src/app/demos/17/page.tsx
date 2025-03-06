'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MetaballShader = () => {
  const canvasRef = useRef(null);
  const frameIdRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Initialize Three.js scene
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector3(canvas.clientWidth, canvas.clientHeight, 1.0) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;

        float opSmoothUnion(float d1, float d2, float k) {
          float h = clamp(0.5 + 0.5*(d2-d1)/k, 0.0, 1.0);
          return mix(d2, d1, h) - k*h*(1.0-h);
        }

        float sdSphere(vec3 p, float s) {
          return length(p)-s;
        } 

        float map(vec3 p) {
          float d = 2.0;
          for (int i = 0; i < 16; i++) {
            float fi = float(i);
            float time = iTime * (fract(fi * 412.531 + 0.513) - 0.5) * 2.0;
            d = opSmoothUnion(
              sdSphere(p + sin(time + fi * vec3(52.5126, 64.62744, 632.25)) * vec3(2.0, 2.0, 0.8), mix(0.5, 1.0, fract(fi * 412.531 + 0.5124))),
              d,
              0.4
            );
          }
          return d;
        }

        vec3 calcNormal(in vec3 p) {
          const float h = 1e-5;
          const vec2 k = vec2(1,-1);
          return normalize(k.xyy*map(p + k.xyy*h) + 
                          k.yyx*map(p + k.yyx*h) + 
                          k.yxy*map(p + k.yxy*h) + 
                          k.xxx*map(p + k.xxx*h));
        }

        void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec2 uv = fragCoord/iResolution.xy;
          
          // screen size is 6m x 6m
          vec3 rayOri = vec3((uv - 0.5) * vec2(iResolution.x/iResolution.y, 1.0) * 6.0, 3.0);
          vec3 rayDir = vec3(0.0, 0.0, -1.0);
          
          float depth = 0.0;
          vec3 p;
          
          for(int i = 0; i < 64; i++) {
            p = rayOri + rayDir * depth;
            float dist = map(p);
            depth += dist;
            if (dist < 1e-6) {
              break;
            }
          }
          
          depth = min(6.0, depth);
          vec3 n = calcNormal(p);
          float b = max(0.0, dot(n, vec3(0.577)));
          vec3 col = (0.5 + 0.5 * cos((b + iTime * 3.0) + uv.xyx * 2.0 + vec3(0,2,4))) * (0.85 + b * 0.35);
          col *= exp(-depth * 0.15);
          
          // maximum thickness is 2m in alpha channel
          gl_FragColor = vec4(col, 1.0 - (depth - 0.5) / 2.0);
        }
      `,
      transparent: true
    });

    // Create a full screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(quad);

    // Animation loop
    const animate = () => {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
      shaderMaterial.uniforms.iTime.value = elapsedTime;
      
      renderer.render(scene, camera);
      frameIdRef.current = requestAnimationFrame(animate);
    };

    // Handle resize
    const handleResize = () => {
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
      
      // Update camera
      camera.updateProjectionMatrix();
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Start animation
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(frameIdRef.current);
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-900">
      <canvas 
        ref={canvasRef} 
        className="w-full h-full"
      />
    </div>
  );
};

export default MetaballShader;