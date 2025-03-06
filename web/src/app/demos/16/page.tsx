'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const FractalPyramidShader = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    // Canvas and renderer setup
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    // Create shader material
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) },
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;
        
        vec3 palette(float d) {
          return mix(vec3(0.2, 0.7, 0.9), vec3(1.0, 0.0, 1.0), d);
        }
        
        vec2 rotate(vec2 p, float a) {
          float c = cos(a);
          float s = sin(a);
          return p * mat2(c, s, -s, c);
        }
        
        float map(vec3 p) {
          for(int i = 0; i < 8; ++i) {
            float t = iTime * 0.2;
            p.xz = rotate(p.xz, t);
            p.xy = rotate(p.xy, t * 1.89);
            p.xz = abs(p.xz);
            p.xz -= 0.5;
          }
          return dot(sign(p), p) / 5.0;
        }
        
        vec4 rm(vec3 ro, vec3 rd) {
          float t = 0.0;
          vec3 col = vec3(0.0);
          float d;
          
          for(float i = 0.0; i < 64.0; i++) {
            vec3 p = ro + rd * t;
            d = map(p) * 0.5;
            
            if(d < 0.02) {
              break;
            }
            
            if(d > 100.0) {
              break;
            }
            
            col += palette(length(p) * 0.1) / (400.0 * (d));
            t += d;
          }
          
          return vec4(col, 1.0 / (d * 100.0));
        }
        
        void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec2 uv = (fragCoord - (iResolution.xy / 2.0)) / iResolution.x;
          
          vec3 ro = vec3(0.0, 0.0, -50.0);
          ro.xz = rotate(ro.xz, iTime);
          
          vec3 cf = normalize(-ro);
          vec3 cs = normalize(cross(cf, vec3(0.0, 1.0, 0.0)));
          vec3 cu = normalize(cross(cf, cs));
          
          vec3 uuv = ro + cf * 3.0 + uv.x * cs + uv.y * cu;
          vec3 rd = normalize(uuv - ro);
          
          vec4 col = rm(ro, rd);
          
          gl_FragColor = col;
        }
      `,
    });
    
    // Create a full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);
    
    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height, 1);
    };
    
    window.addEventListener('resize', handleResize);
    
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
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      shaderMaterial.dispose();
    };
  }, []);
  
  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%'
      }}
    />
  );
};

export default FractalPyramidShader;