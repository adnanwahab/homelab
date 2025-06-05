"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three/webgpu";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const example1Code = `
float random(float x) {
 
				return fract(sin(x) * 10000.);
					  
			}
			
			float noise(vec2 p) {
			
				return random(p.x + p.y * 10000.);
						
			}
			
			vec2 sw(vec2 p) { return vec2(floor(p.x), floor(p.y)); }
			vec2 se(vec2 p) { return vec2(ceil(p.x), floor(p.y)); }
			vec2 nw(vec2 p) { return vec2(floor(p.x), ceil(p.y)); }
			vec2 ne(vec2 p) { return vec2(ceil(p.x), ceil(p.y)); }
			
			float smoothNoise(vec2 p) {
			
				vec2 interp = smoothstep(0., 1., fract(p));
				float s = mix(noise(sw(p)), noise(se(p)), interp.x);
				float n = mix(noise(nw(p)), noise(ne(p)), interp.x);
				return mix(s, n, interp.y);
					
			}
			
			float fractalNoise(vec2 p) {
			
				float x = 0.;
				x += smoothNoise(p      );
				x += smoothNoise(p * 2. ) / 2.;
				x += smoothNoise(p * 4. ) / 4.;
				x += smoothNoise(p * 8. ) / 8.;
				x += smoothNoise(p * 16.) / 16.;
				x /= 1. + 1./2. + 1./4. + 1./8. + 1./16.;
				return x;
						
			}
			
			float movingNoise(vec2 p) {
			 
				float x = fractalNoise(p + iTime);
				float y = fractalNoise(p - iTime);
				return fractalNoise(p + vec2(x, y));   
				
			}
			
			// call this for water noise function
			float nestedNoise(vec2 p) {
				
				float x = movingNoise(p);
				float y = movingNoise(p + 100.);
				return movingNoise(p + vec2(x, y));
				
			}

			void mainImage( out vec4 fragColor, in vec2 fragCoord )
			{
				vec2 uv = fragCoord.xy / iResolution.xy;
				float n = nestedNoise(uv * 6.);

				fragColor = vec4(mix(vec3(.4, .6, 1.), vec3(.1, .2, 1.), n), 1.);
			}
`;


const example2Code = `
	// https://www.shadertoy.com/view/3tcBzH

			float rand(vec2 co){
				return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
			}
			
			float hermite(float t)
			{
			  return t * t * (3.0 - 2.0 * t);
			}
			
			float noise(vec2 co, float frequency)
			{
			  vec2 v = vec2(co.x * frequency, co.y * frequency);
			
			  float ix1 = floor(v.x);
			  float iy1 = floor(v.y);
			  float ix2 = floor(v.x + 1.0);
			  float iy2 = floor(v.y + 1.0);
			
			  float fx = hermite(fract(v.x));
			  float fy = hermite(fract(v.y));
			
			  float fade1 = mix(rand(vec2(ix1, iy1)), rand(vec2(ix2, iy1)), fx);
			  float fade2 = mix(rand(vec2(ix1, iy2)), rand(vec2(ix2, iy2)), fx);
			
			  return mix(fade1, fade2, fy);
			}
			
			float pnoise(vec2 co, float freq, int steps, float persistence)
			{
			  float value = 0.0;
			  float ampl = 1.0;
			  float sum = 0.0;
			  for(int i=0 ; i<steps ; i++)
			  {
				sum += ampl;
				value += noise(co, freq) * ampl;
				freq *= 2.0;
				ampl *= persistence;
			  }
			  return value / sum;
			}
			
			void mainImage( out vec4 fragColor, in vec2 fragCoord ) {
				vec2 uv = fragCoord.xy / iResolution.xy;
				float gradient = 1.0 - uv.y;
				float gradientStep = 0.2;
				
				vec2 pos = fragCoord.xy / iResolution.x;
				pos.y -= iTime * 0.3125;
				
				vec4 brighterColor = vec4(1.0, 0.65, 0.1, 0.25);
				vec4 darkerColor = vec4(1.0, 0.0, 0.15, 0.0625);
				vec4 middleColor = mix(brighterColor, darkerColor, 0.5);
			
				float noiseTexel = pnoise(pos, 10.0, 5, 0.5);
				
				float firstStep = smoothstep(0.0, noiseTexel, gradient);
				float darkerColorStep = smoothstep(0.0, noiseTexel, gradient - gradientStep);
				float darkerColorPath = firstStep - darkerColorStep;
				vec4 color = mix(brighterColor, darkerColor, darkerColorPath);
			
				float middleColorStep = smoothstep(0.0, noiseTexel, gradient - 0.2 * 2.0);
				
				color = mix(color, middleColor, darkerColorStep - middleColorStep);
				color = mix(vec4(0.0), color, firstStep);
				fragColor = color;
			}
`;


import Transpiler from 'three/addons/transpiler/Transpiler.js';
import ShaderToyDecoder from 'three/addons/transpiler/ShaderToyDecoder.js';
import TSLEncoder from 'three/addons/transpiler/TSLEncoder.js';
//import { TSL } from "three/webgpu";

class ShaderToyNode extends THREE.Node {

				constructor() {

					super( 'vec4' );

					this.mainImage = null;

				}

				transpile( glsl, iife = false ) {

					const decoder = new ShaderToyDecoder();

					const encoder = new TSLEncoder();
					encoder.iife = iife;
					encoder.uniqueNames = true;

					const jsCode = new Transpiler( decoder, encoder ).parse( glsl );

					return jsCode;

				}

				parse( glsl ) {

					const jsCode = this.transpile( glsl, true );

					const { mainImage } = eval( jsCode )( TSL );

					this.mainImage = mainImage;

				}

				async parseAsync( glsl ) {

					const jsCode = this.transpile( glsl );
					
					// Create a function from the transpiled code instead of using dynamic import
					const mainImageFunc = new Function('TSL', `
						${jsCode}
						return { mainImage };
					`);
					
					const { mainImage } = mainImageFunc(TSL);
					this.mainImage = mainImage;

				}

				setup( builder ) {

					if ( this.mainImage === null ) {

						throw new Error( 'ShaderToyNode: .parse() must be called first.' );

					}

					return this.mainImage();

				}


			}

            
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
