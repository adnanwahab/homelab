'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const SingularityShader = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
    camera.position.z = 1;

    // Shader material
    const singularityShader = {
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector3(window.innerWidth, window.innerHeight, 1) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec3 iResolution;

        /*
            "Singularity" by @XorDev
            I'll come back to clean up the code later.
            Feel free to code golf!
        */
        void mainImage(out vec4 O, in vec2 F) {
            vec2 p = (F*2.-iResolution.xy)/(iResolution.y*.7),
            d = vec2(-1,1),
            c = p*mat2(1,1,d/(.1+5./dot(5.*p-d,5.*p-d))),
            v = c;
            v *= mat2(cos(log(length(v))+iTime*.2+vec4(0,33,11,0)))*5.;
            vec4 o = vec4(0);
            for(float i = 0.0; i++<9.;o+=sin(v.xyyx)+1.)
              v += .7*sin(v.yx*i+iTime)/i+.5;
            O = 1.-exp(-exp(c.x*vec4(.6,-.4,-1,0))/o
            /(.1+.1*pow(length(sin(v/.3)*.2+c*vec2(1,2))-1.,2.))
            /(1.+7.*exp(.3*c.y-dot(c,c)))
            /(.03+abs(length(p)-.7))*.2);
        }

        void main() {
          vec2 fragCoord = gl_FragCoord.xy;
          vec4 fragColor;
          mainImage(fragColor, fragCoord);
          gl_FragColor = fragColor;
        }
      `
    };

    // Create a full-screen quad
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial(singularityShader);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      material.uniforms.iResolution.value.set(width, height, 1);
    };

    window.addEventListener('resize', handleResize);

    // Animation loop
    let animationFrameId;
    const startTime = Date.now();
    
    const animate = () => {
      const elapsedTime = (Date.now() - startTime) / 1000;
      material.uniforms.iTime.value = elapsedTime;
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      scene.remove(mesh);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        display: 'block', 
        width: '100vw', 
        height: '100vh' 
      }} 
    />
  );
};

export default SingularityShader;