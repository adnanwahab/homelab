'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const FlowerShader = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const resolutionRef = useRef({ width: 0, height: 0 });
  const animationFrameRef = useRef(null);
  const startTimeRef = useRef(Date.now());

  useEffect(() => {
    // Initialize Three.js scene
    const canvas = canvasRef.current;
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });

    resolutionRef.current = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    
    renderer.setSize(resolutionRef.current.width, resolutionRef.current.height);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Create geometry that covers the entire viewport
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Define the shader material using the provided GLSL code
    const shaderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0.0 },
        iResolution: { value: new THREE.Vector2(resolutionRef.current.width, resolutionRef.current.height) },
        iMouse: { value: new THREE.Vector2(0, 0) }
      },
      vertexShader: `
        void main() {
          gl_Position = vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform float iTime;
        uniform vec2 iResolution;
        uniform vec2 iMouse;
        
        #define PI 3.14159
        
        float lineWidth = 0.01;
        
        float sdfCircle(float radius, vec2 center, vec2 uv) {
            return length(uv-center)-radius;
        }
        
        float sdfHexagon( in vec2 p, in float r )
        {
            const vec3 k = vec3(-0.866025404,0.5,0.577350269);
            p = abs(p);
            p -= 2.0*min(dot(k.xy,p),0.0)*k.xy;
            p -= vec2(clamp(p.x, -k.z*r, k.z*r), r);
            return length(p)*sign(p.y);
        }
        
        float udSegment( in vec2 p, in vec2 a, in vec2 b )
        {
            vec2 ba = b-a;
            vec2 pa = p-a;
            float h =clamp( dot(pa,ba)/dot(ba,ba), 0.0, 1.0 );
            return length(pa-h*ba);
        }
        
        vec2 rotate(vec2 vector, float angle) {
            return vec2(
                cos(angle)*vector.x-sin(angle)*vector.y,
                sin(angle)*vector.x+cos(angle)*vector.y
            );
        }
        
        float colorInsidePerimeter(float dist, float lineWidth) {
            float smoothDist = 0.007;
            float halfLineWidth = lineWidth/2.;
            float col1 = smoothstep(lineWidth, lineWidth-smoothDist, dist);
            float col2 = smoothstep(-lineWidth, -lineWidth+smoothDist, dist);
            return min(col1, col2);
        }
        
        float colorInside(float dist) {
            float smoothDist = 0.004;
            return smoothstep(0., -smoothDist, dist);
        }
        
        float lineSegments(float baseAngle, vec2 uv, float angle, float offset, float petalDistance, float lengthMultiplier) {
            float line1a = udSegment(uv, vec2(0,0), rotate(vec2(0, lengthMultiplier*0.6), 0.5*angle+offset+baseAngle));
            float lineSegment1a = colorInsidePerimeter(max(line1a, -petalDistance), lineWidth);
            float line1b = udSegment(uv, rotate(vec2(-0.03, 0.0), 0.5*angle+offset+baseAngle), rotate(vec2(-0.03, lengthMultiplier*0.55), 0.5*angle+offset+baseAngle));
            float lineSegment1b = colorInsidePerimeter(max(line1b, -petalDistance), lineWidth);
            float line1c = udSegment(uv, rotate(vec2(0.03, 0.0), 0.5*angle+offset+baseAngle), rotate(vec2(0.03, lengthMultiplier*0.55), 0.5*angle+offset+baseAngle));
            float lineSegment1c = colorInsidePerimeter(max(line1c, -petalDistance), lineWidth);
            float line1d = udSegment(uv, rotate(vec2(-0.06, 0.0), 0.5*angle+offset+baseAngle), rotate(vec2(-0.06, lengthMultiplier*0.6), 0.5*angle+offset+baseAngle));
            float lineSegment1d = colorInsidePerimeter(max(line1d, -petalDistance), lineWidth);
            float line1e = udSegment(uv, rotate(vec2(0.06, 0.0), 0.5*angle+offset+baseAngle), rotate(vec2(0.06, lengthMultiplier*0.6), 0.5*angle+offset+baseAngle));
            float lineSegment1e = colorInsidePerimeter(max(line1e, -petalDistance), lineWidth);
            
            float lines = max(
               max(
                   max(
                    lineSegment1a,
                    lineSegment1b
                   ),
                   max(
                    lineSegment1c,
                    lineSegment1d
                   )
               ),
               lineSegment1e
            );
            
            return lines;
        }
        
        void mainImage( out vec4 fragColor, in vec2 fragCoord )
        {
            // Normalized pixel coordinates (from 0 to 1)
            float lengthMultiplier = (sin(min((iTime*PI*2.)-0.5*PI, 0.7*PI))+1.)/2.;
            float radius = lengthMultiplier*0.5*0.9;
            vec2 mouseUv = (2. * iMouse.xy - iResolution.xy) / iResolution.y;
            vec2 uv = (2. * fragCoord - iResolution.xy) / iResolution.y;
            
            //float offset = 0.;    
            float offset = -smoothstep(0., 1., (max(.3, iTime)-.3)*2.)*iTime;
            float angle = -PI/3.;
            vec2 baseVector = rotate(vec2(0., radius), offset-angle/2.);
            
            float circle1 = sdfCircle(radius, baseVector, uv);
            float circle2 = sdfCircle(radius, rotate(baseVector, angle), uv);
            float circle3 = sdfCircle(radius, rotate(baseVector, angle*2.), uv);
            float circle4 = sdfCircle(radius, rotate(baseVector, angle*3.), uv);
            float circle5 = sdfCircle(radius, rotate(baseVector, angle*4.), uv);
            float circle6 = sdfCircle(radius, rotate(baseVector, angle*5.), uv);
            
            float fPetal1 = max(circle1, circle2);
            float petal6 = max(max(circle6, circle1), -fPetal1);
            float petal5 = max(max(circle5, circle6), -petal6);
            float petal4 = max(max(circle4, circle5), -petal5);
            float petal3 = max(max(circle3, circle4), -petal4);
            float petal2 = max(max(circle2, circle3), -petal3);
            float petal1 = max(fPetal1, -petal2);
            
            float allPetals = min(
                min(
                    min(petal1, petal2),
                    min(petal3, petal4)
                ),
                min(petal5, petal6)
            );
            
            
            float hexagon = sdfHexagon(rotate(uv, -offset), radius*1.5);
            float circleSection1 = sdfCircle(radius*1.57, rotate(baseVector*2.8, angle*-.5), uv);
            float circleSection2 = sdfCircle(radius*1.57, rotate(baseVector*2.8, angle*.5), uv);
            float circleSection3 = sdfCircle(radius*1.57, rotate(baseVector*2.8, angle*1.5), uv);
            float circleSection4 = sdfCircle(radius*1.57, rotate(baseVector*2.8, angle*2.5), uv);
            float circleSection5 = sdfCircle(radius*1.57, rotate(baseVector*2.8, angle*3.5), uv);
            float circleSection6 = sdfCircle(radius*1.57, rotate(baseVector*2.8, angle*4.5), uv);
            float cscol1 = colorInside(max(max(circleSection1, -petal6), hexagon));
            float cscol2 = colorInside(max(max(circleSection2, -petal1), hexagon));
            float cscol3 = colorInside(max(max(circleSection3, -petal2), hexagon));
            float cscol4 = colorInside(max(max(circleSection4, -petal3), hexagon));
            float cscol5 = colorInside(max(max(circleSection5, -petal4), hexagon));
            float cscol6 = colorInside(max(max(circleSection6, -petal5), hexagon));
           
        
            //float col1 = colorInsidePerimeter(circle1, lineWidth);
            //float col2 = colorInsidePerimeter(circle2, lineWidth);
            //float col3 = colorInsidePerimeter(circle3, lineWidth);
            //float col4 = colorInsidePerimeter(circle4, lineWidth);
            
            float pcol1 = colorInsidePerimeter(petal1, lineWidth);
            float pcol2 = colorInsidePerimeter(petal2, lineWidth);
            float pcol3 = colorInsidePerimeter(petal3, lineWidth);
            float pcol4 = colorInsidePerimeter(petal4, lineWidth);
            float pcol5 = colorInsidePerimeter(petal5, lineWidth);
            float pcol6 = colorInsidePerimeter(petal6, lineWidth);
            
            float lines1 = lineSegments(0., uv, angle, offset, allPetals, lengthMultiplier);
            float lines2 = lineSegments(angle, uv, angle, offset, allPetals, lengthMultiplier);
            float lines3 = lineSegments(angle*2., uv, angle, offset, allPetals, lengthMultiplier);
            float lines4 = lineSegments(angle*3., uv, angle, offset, allPetals, lengthMultiplier);
            float lines5 = lineSegments(angle*4., uv, angle, offset, allPetals, lengthMultiplier);
            float lines6 = lineSegments(angle*5., uv, angle, offset, allPetals, lengthMultiplier);
            
            
            float colorIntensity = 
                max(
                    max(
                        max(
                            max(pcol1, pcol2), 
                            max(pcol3, pcol4)
                        ),
                        max(
                            max(pcol5, pcol6),
                            max(cscol1, cscol2)
                        )
                    ),
                    max(
                        max(
                            max(
                                max(cscol3, cscol4),
                                max(cscol5, cscol6)
                            ),                
                            max(
                                max(lines1, lines2),
                                max(lines3, lines4)
                            )
                        ),
                        max(
                            lines5, lines6
                        )
                    )
                );
            
            vec3 col = mix(vec3(1.), vec3(0., 0., 0.), colorIntensity);
            
        
            // Output to screen
            fragColor = vec4(vec3(col), 1.0);
        }
        
        void main() {
          vec4 fragColor;
          mainImage(fragColor, gl_FragCoord.xy);
          gl_FragColor = fragColor;
        }
      `
    });

    // Create a mesh and add it to the scene
    const mesh = new THREE.Mesh(geometry, shaderMaterial);
    scene.add(mesh);

    // Animation loop
    const animate = () => {
      const elapsedTime = (Date.now() - startTimeRef.current) / 1000;
      shaderMaterial.uniforms.iTime.value = elapsedTime;
      shaderMaterial.uniforms.iMouse.value.set(
        mouseRef.current.x, 
        resolutionRef.current.height - mouseRef.current.y // Flip y coordinate
      );
      
      renderer.render(scene, camera);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      renderer.setSize(width, height);
      shaderMaterial.uniforms.iResolution.value.set(width, height);
      
      resolutionRef.current = { width, height };
    };

    // Handle mouse movement
    const handleMouseMove = (event) => {
      mouseRef.current = {
        x: event.clientX,
        y: event.clientY
      };
    };

    // Add event listeners
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    // Start animation
    animate();

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      // Dispose Three.js resources
      geometry.dispose();
      shaderMaterial.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        width: '100vw', 
        height: '100vh', 
        display: 'block' 
      }}
    />
  );
};

export default FlowerShader;