"use client";

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Pane } from 'tweakpane';
import { OrbitControls } from 'three/examples/jsm/Addons.js';
import { EffectComposer, RenderPass, OutputPass, UnrealBloomPass, ShaderPass } from 'three/examples/jsm/Addons.js';
import { TeapotGeometry } from 'three/examples/jsm/Addons.js';
import { BladeApi } from 'tweakpane';

const snoise = `
vec4 permute(vec4 x) {
    return mod(((x * 34.0) + 1.0) * x, 289.0);
}
vec4 taylorInvSqrt(vec4 r) {
    return 1.79284291400159 - 0.85373472095314 * r;
}

float snoise(vec3 v) {
    const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
    const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);

    // First corner
    vec3 i = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    // Other corners
    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    //  x0 = x0 - 0. + 0.0 * C
    vec3 x1 = x0 - i1 + 1.0 * C.xxx;
    vec3 x2 = x0 - i2 + 2.0 * C.xxx;
    vec3 x3 = x0 - 1. + 3.0 * C.xxx;

    // Permutations
    i = mod(i, 289.0);
    vec4 p = permute(permute(permute(
                    i.z + vec4(0.0, i1.z, i2.z, 1.0))
                    + i.y + vec4(0.0, i1.y, i2.y, 1.0))
                + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    // Gradients
    // ( N*N points uniformly over a square, mapped onto an octahedron.)
    float n_ = 1.0 / 7.0; // N=7
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z); //  mod(p,N*N)

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_); // mod(j,N)

    vec4 x = x_ * ns.x + ns.yyyy;
    vec4 y = y_ * ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0) * 2.0 + 1.0;
    vec4 s1 = floor(b1) * 2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    //Normalise gradients
    vec4 norm = taylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
    p0 *= norm.x;
    p1 *= norm.y;
    p2 *= norm.z;
    p3 *= norm.w;

    // Mix final noise value
    vec4 m = max(0.6 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1),
                dot(p2, x2), dot(p3, x3)));
}
`;

export default function Demo24() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const meshRef = useRef<THREE.Mesh | null>(null);
  const particleMeshRef = useRef<THREE.Points | null>(null);
  const paneRef = useRef<Pane | null>(null);
  const meshBladeRef = useRef<BladeApi | null>(null);
  const progressBindingRef = useRef<any>(null);
  const clockRef = useRef(new THREE.Clock());
  const animationFrameRef = useRef<number | null>(null);

  // State for all the variables that were previously global
  const [isMobile, setIsMobile] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [dissolving, setDissolving] = useState(true);
  const [geoIdx, setGeoIdx] = useState(0);
  
  // Initialize all the refs and setup the scene
  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      const isMobileDevice = /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      setIsMobile(isMobileDevice);
      setScale(isMobileDevice ? 0.7 : 1.0);
      return isMobileDevice;
    };
    
    const isMobileDevice = checkMobile();
    
    if (!canvasRef.current) return;
    
    // Setup scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Setup camera
    const cam = new THREE.PerspectiveCamera(
      75, 
      canvasRef.current.clientWidth / canvasRef.current.clientHeight, 
      0.001, 
      100
    );
    
    if (isMobileDevice) cam.position.set(0, 8, 18);
    else cam.position.set(0, 1, 14);
    
    const blackColor = new THREE.Color(0x000000);
    scene.background = blackColor;
    cameraRef.current = cam;
    
    // Setup renderer
    const re = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current, 
      antialias: true 
    });
    re.setPixelRatio(window.devicePixelRatio);
    re.setSize(
      canvasRef.current.clientWidth * (isMobileDevice ? 0.7 : 1.0), 
      canvasRef.current.clientHeight * (isMobileDevice ? 0.7 : 1.0), 
      false
    );
    re.toneMapping = THREE.CineonToneMapping;
    re.outputColorSpace = THREE.SRGBColorSpace;
    rendererRef.current = re;
    
    // Setup all the rest of your code here...
    // (Effect composers, materials, geometries, etc.)
    
    // Initialize all the variables that were previously global
    const segments1 = isMobileDevice ? 90 : 140;
    const segments2 = isMobileDevice ? 18 : 32;
    
    const sphere = new THREE.SphereGeometry(4.5, segments1, segments1);
    const teaPot = new TeapotGeometry(3, segments2);
    const torus = new THREE.TorusGeometry(3, 1.5, segments1, segments1);
    const torusKnot = new THREE.TorusKnotGeometry(2.5, 0.8, segments1, segments1);
    const geoNames = ["TorusKnot", "Tea Pot", "Sphere", "Torus"];
    const geometries = [torusKnot, teaPot, sphere, torus];
    
    // Create material for the mesh
    const material = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.5,
      roughness: 0.5,
    });
    
    // Create the mesh with the initial geometry and add it to the scene
    const mesh = new THREE.Mesh(geometries[geoIdx], material);
    scene.add(mesh);
    meshRef.current = mesh;
    
    // Add lighting
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);
    
    // Continue setting up your scene, materials, etc.
    
    // Setup orbit controls
    const orbCtrls = new OrbitControls(cam, canvasRef.current);
    
    // Setup tweakpane
    const pane = new Pane();
    paneRef.current = pane;
    
    // Add Tweakpane controls
    const PARAMS = {
      geometry: geoNames[geoIdx],
      dissolve: dissolving,
      progress: 0.0,
      particleSize: 0.05,
      particleCount: isMobileDevice ? 100000 : 200000,
      bloomStrength: 1.5,
      bloomRadius: 0.75,
      bloomThreshold: 0.2,
      rotationSpeed: 0.5
    };
    
    // Geometry selection
    pane.addBinding(PARAMS, 'geometry', {
      options: geoNames.reduce((acc, name, idx) => {
        acc[name] = name;
        return acc;
      }, {})
    }).on('change', (ev) => {
      const newIdx = geoNames.indexOf(ev.value);
      setGeoIdx(newIdx);
      if (meshRef.current) {
        meshRef.current.geometry = geometries[newIdx];
      }
    });
    
    // Dissolve toggle
    pane.addBinding(PARAMS, 'dissolve').on('change', (ev) => {
      setDissolving(ev.value);
    });
    
    // Progress slider
    progressBindingRef.current = pane.addBinding(PARAMS, 'progress', {
      min: 0.0,
      max: 1.0,
      step: 0.01
    });
    
    // Particle controls
    const particleFolder = pane.addFolder({ title: 'Particles' });
    particleFolder.addBinding(PARAMS, 'particleSize', {
      min: 0.01,
      max: 0.2,
      step: 0.01
    }).on('change', (ev) => {
      if (particleMeshRef.current) {
        (particleMeshRef.current.material as THREE.PointsMaterial).size = ev.value;
      }
    });
    
    particleFolder.addBinding(PARAMS, 'particleCount', {
      min: 10000,
      max: isMobileDevice ? 150000 : 300000,
      step: 10000
    }).on('change', (ev) => {
      // This would typically require recreating the particle system
      // For simplicity, we'll just log it for now
      console.log("Particle count changed to:", ev.value);
      // You would need to implement the particle system recreation here
    });
    
    // Bloom controls
    const bloomFolder = pane.addFolder({ title: 'Bloom Effect' });
    bloomFolder.addBinding(PARAMS, 'bloomStrength', {
      min: 0.0,
      max: 3.0,
      step: 0.1
    }).on('change', (ev) => {
      // Update bloom pass strength
      // You would need to implement this with your effect composer
    });
    
    bloomFolder.addBinding(PARAMS, 'bloomRadius', {
      min: 0.0,
      max: 1.0,
      step: 0.01
    }).on('change', (ev) => {
      // Update bloom pass radius
      // You would need to implement this with your effect composer
    });
    
    bloomFolder.addBinding(PARAMS, 'bloomThreshold', {
      min: 0.0,
      max: 1.0,
      step: 0.01
    }).on('change', (ev) => {
      // Update bloom pass threshold
      // You would need to implement this with your effect composer
    });
    
    // Animation controls
    const animationFolder = pane.addFolder({ title: 'Animation' });
    animationFolder.addBinding(PARAMS, 'rotationSpeed', {
      min: 0.0,
      max: 2.0,
      step: 0.1
    });
    
    // Setup animation loop
    const animate = () => {
      const delta = clockRef.current.getDelta();
      
      // Update rotation based on speed parameter
      if (meshRef.current) {
        meshRef.current.rotation.y += delta * PARAMS.rotationSpeed;
      }
      
      // Update progress value for dissolve effect
      if (dissolving) {
        PARAMS.progress = (PARAMS.progress + delta * 0.2) % 1.0;
        if (progressBindingRef.current) {
          progressBindingRef.current.refresh();
        }
      }
      
      // Render the scene
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      
      animationFrameRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup function
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      
      if (paneRef.current) {
        paneRef.current.dispose();
      }
      
      // Clean up any other resources
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);
  
  // Handle orientation change
  const handleOrientationChange = () => {
    window.location.reload();
  };
  
  useEffect(() => {
    window.addEventListener('orientationchange', handleOrientationChange);
    return () => {
      window.removeEventListener('orientationchange', handleOrientationChange);
    };
  }, []);

  return (
    <div>
      <canvas ref={canvasRef} id="c" style={{ width: '100%', height: '100vh' }} />
    </div>
  );
}