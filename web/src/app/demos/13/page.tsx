'use client';

import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { gsap } from 'gsap';

// RoundedBoxGeometry implementation
class RoundedBoxGeometry extends THREE.BufferGeometry {
  constructor(width, height, depth, radius, radiusSegments) {
    super();
    
    this.type = 'RoundedBoxGeometry';

    // Validate params
    radiusSegments = !isNaN(radiusSegments) ? Math.max(1, Math.floor(radiusSegments)) : 1;
    width = !isNaN(width) ? width : 1;
    height = !isNaN(height) ? height : 1;
    depth = !isNaN(depth) ? depth : 1;
    radius = !isNaN(radius) ? radius : 0.15;
    radius = Math.min(radius, Math.min(width, Math.min(height, Math.min(depth))) / 2);

    const edgeHalfWidth = width / 2 - radius;
    const edgeHalfHeight = height / 2 - radius;
    const edgeHalfDepth = depth / 2 - radius;

    // Store parameters
    this.parameters = {
      width: width,
      height: height,
      depth: depth,
      radius: radius,
      radiusSegments: radiusSegments
    };

    // Calculate vertices count
    const rs1 = radiusSegments + 1; // radius segments + 1
    const totalVertexCount = (rs1 * radiusSegments + 1) << 3;

    // Make buffers
    const positions = new THREE.BufferAttribute(new Float32Array(totalVertexCount * 3), 3);
    const normals = new THREE.BufferAttribute(new Float32Array(totalVertexCount * 3), 3);

    // Some vars
    const cornerVerts = [];
    const cornerNormals = [];
    const normal = new THREE.Vector3();
    const vertex = new THREE.Vector3();
    const vertexPool = [];
    const normalPool = [];
    const indices = [];

    const lastVertex = rs1 * radiusSegments;
    const cornerVertNumber = rs1 * radiusSegments + 1;

    // Helper functions
    const doVertices = () => {
      // Corner offsets
      const cornerLayout = [
        new THREE.Vector3(1, 1, 1),
        new THREE.Vector3(1, 1, -1),
        new THREE.Vector3(-1, 1, -1),
        new THREE.Vector3(-1, 1, 1),
        new THREE.Vector3(1, -1, 1),
        new THREE.Vector3(1, -1, -1),
        new THREE.Vector3(-1, -1, -1),
        new THREE.Vector3(-1, -1, 1)
      ];

      // Corner holder
      for (let j = 0; j < 8; j++) {
        cornerVerts.push([]);
        cornerNormals.push([]);
      }

      // Construct 1/8 sphere
      const PIhalf = Math.PI / 2;
      const cornerOffset = new THREE.Vector3(edgeHalfWidth, edgeHalfHeight, edgeHalfDepth);

      for (let y = 0; y <= radiusSegments; y++) {
        const v = y / radiusSegments;
        const va = v * PIhalf; // Arrange in 90 deg
        const cosVa = Math.cos(va); // Scale of vertical angle
        const sinVa = Math.sin(va);

        if (y === radiusSegments) {
          vertex.set(0, 1, 0);
          const vert = vertex.clone().multiplyScalar(radius).add(cornerOffset);
          cornerVerts[0].push(vert);
          vertexPool.push(vert);
          
          const norm = vertex.clone();
          cornerNormals[0].push(norm);
          normalPool.push(norm);
          continue; // Skip row loop
        }

        for (let x = 0; x <= radiusSegments; x++) {
          const u = x / radiusSegments;
          const ha = u * PIhalf;

          // Make 1/8 sphere points
          vertex.x = cosVa * Math.cos(ha);
          vertex.y = sinVa;
          vertex.z = cosVa * Math.sin(ha);

          // Copy sphere point, scale by radius, offset by half whd
          const vert = vertex.clone().multiplyScalar(radius).add(cornerOffset);
          cornerVerts[0].push(vert);
          vertexPool.push(vert);
          
          // Sphere already normalized, just clone
          const norm = vertex.clone().normalize();
          cornerNormals[0].push(norm);
          normalPool.push(norm);
        }
      }

      // Distribute corner verts
      for (let i = 1; i < 8; i++) {
        for (let j = 0; j < cornerVerts[0].length; j++) {
          const vert = cornerVerts[0][j].clone().multiply(cornerLayout[i]);
          cornerVerts[i].push(vert);
          vertexPool.push(vert);

          const norm = cornerNormals[0][j].clone().multiply(cornerLayout[i]);
          cornerNormals[i].push(norm);
          normalPool.push(norm);
        }
      }
    };

    const doCorners = () => {
      const flips = [
        true,
        false,
        true,
        false,
        false,
        true,
        false,
        true
      ];

      const lastRowOffset = rs1 * (radiusSegments - 1);

      for (let i = 0; i < 8; i++) {
        const cornerOffset = cornerVertNumber * i;

        for (let v = 0; v < radiusSegments - 1; v++) {
          const r1 = v * rs1; // Row offset
          const r2 = (v + 1) * rs1; // Next row

          for (let u = 0; u < radiusSegments; u++) {
            const u1 = u + 1;
            const a = cornerOffset + r1 + u;
            const b = cornerOffset + r1 + u1;
            const c = cornerOffset + r2 + u;
            const d = cornerOffset + r2 + u1;

            if (!flips[i]) {
              indices.push(a);
              indices.push(b);
              indices.push(c);

              indices.push(b);
              indices.push(d);
              indices.push(c);
            } else {
              indices.push(a);
              indices.push(c);
              indices.push(b);

              indices.push(b);
              indices.push(c);
              indices.push(d);
            }
          }
        }
        
        for (let u = 0; u < radiusSegments; u++) {
          const a = cornerOffset + lastRowOffset + u;
          const b = cornerOffset + lastRowOffset + u + 1;
          const c = cornerOffset + lastVertex;

          if (!flips[i]) {
            indices.push(a);
            indices.push(b);
            indices.push(c);
          } else {
            indices.push(a);
            indices.push(c);
            indices.push(b);
          }
        }
      }
    };

    const doFaces = () => {
      // Top
      let a = lastVertex;
      let b = lastVertex + cornerVertNumber;
      let c = lastVertex + cornerVertNumber * 2;
      let d = lastVertex + cornerVertNumber * 3;

      indices.push(a);
      indices.push(b);
      indices.push(c);
      indices.push(a);
      indices.push(c);
      indices.push(d);

      // Bottom
      a = lastVertex + cornerVertNumber * 4;
      b = lastVertex + cornerVertNumber * 5;
      c = lastVertex + cornerVertNumber * 6;
      d = lastVertex + cornerVertNumber * 7;

      indices.push(a);
      indices.push(c);
      indices.push(b);
      indices.push(a);
      indices.push(d);
      indices.push(c);

      // Left
      a = 0;
      b = cornerVertNumber;
      c = cornerVertNumber * 4;
      d = cornerVertNumber * 5;

      indices.push(a);
      indices.push(c);
      indices.push(b);
      indices.push(b);
      indices.push(c);
      indices.push(d);

      // Right
      a = cornerVertNumber * 2;
      b = cornerVertNumber * 3;
      c = cornerVertNumber * 6;
      d = cornerVertNumber * 7;

      indices.push(a);
      indices.push(c);
      indices.push(b);
      indices.push(b);
      indices.push(c);
      indices.push(d);

      // Front
      a = radiusSegments;
      b = radiusSegments + cornerVertNumber * 3;
      c = radiusSegments + cornerVertNumber * 4;
      d = radiusSegments + cornerVertNumber * 7;

      indices.push(a);
      indices.push(b);
      indices.push(c);
      indices.push(b);
      indices.push(d);
      indices.push(c);

      // Back
      a = radiusSegments + cornerVertNumber;
      b = radiusSegments + cornerVertNumber * 2;
      c = radiusSegments + cornerVertNumber * 5;
      d = radiusSegments + cornerVertNumber * 6;

      indices.push(a);
      indices.push(c);
      indices.push(b);
      indices.push(b);
      indices.push(c);
      indices.push(d);
    };

    const doHeightEdges = () => {
      for (let i = 0; i < 4; i++) {
        const cOffset = i * cornerVertNumber;
        const cRowOffset = 4 * cornerVertNumber + cOffset;
        const needsFlip = i & 1 === 1;
        
        for (let u = 0; u < radiusSegments; u++) {
          const u1 = u + 1;
          const a = cOffset + u;
          const b = cOffset + u1;
          const c = cRowOffset + u;
          const d = cRowOffset + u1;

          if (!needsFlip) {
            indices.push(a);
            indices.push(b);
            indices.push(c);
            indices.push(b);
            indices.push(d);
            indices.push(c);
          } else {
            indices.push(a);
            indices.push(c);
            indices.push(b);
            indices.push(b);
            indices.push(c);
            indices.push(d);
          }
        }
      }
    };

    const doDepthEdges = () => {
      const cStarts = [0, 2, 4, 6];
      const cEnds = [1, 3, 5, 7];
        
      for (let i = 0; i < 4; i++) {
        const cStart = cornerVertNumber * cStarts[i];
        const cEnd = cornerVertNumber * cEnds[i];
        const needsFlip = 1 >= i;

        for (let u = 0; u < radiusSegments; u++) {
          const urs1 = u * rs1;
          const u1rs1 = (u + 1) * rs1;

          const a = cStart + urs1;
          const b = cStart + u1rs1;
          const c = cEnd + urs1;
          const d = cEnd + u1rs1;

          if (needsFlip) {
            indices.push(a);
            indices.push(c);
            indices.push(b);
            indices.push(b);
            indices.push(c);
            indices.push(d);
          } else {
            indices.push(a);
            indices.push(b);
            indices.push(c);
            indices.push(b);
            indices.push(d);
            indices.push(c);
          }
        }
      }
    };

    const doWidthEdges = () => {
      const end = radiusSegments - 1;
      const cStarts = [0, 1, 4, 5];
      const cEnds = [3, 2, 7, 6];
      const needsFlip = [0, 1, 1, 0];

      for (let i = 0; i < 4; i++) {
        const cStart = cStarts[i] * cornerVertNumber;
        const cEnd = cEnds[i] * cornerVertNumber;
        
        for (let u = 0; u <= end; u++) {
          const a = cStart + radiusSegments + u * rs1;
          const b = cStart + (u !== end ? radiusSegments + (u + 1) * rs1 : cornerVertNumber - 1);
          const c = cEnd + radiusSegments + u * rs1;
          const d = cEnd + (u !== end ? radiusSegments + (u + 1) * rs1 : cornerVertNumber - 1);

          if (!needsFlip[i]) {
            indices.push(a);
            indices.push(b);
            indices.push(c);
            indices.push(b);
            indices.push(d);
            indices.push(c);
          } else {
            indices.push(a);
            indices.push(c);
            indices.push(b);
            indices.push(b);
            indices.push(c);
            indices.push(d);
          }
        }
      }
    };

    // Execute helper functions to build geometry
    doVertices();
    doFaces();
    doCorners();
    doHeightEdges();
    doWidthEdges();
    doDepthEdges();

    // Fill buffers
    let index = 0;
    for (let i = 0; i < vertexPool.length; i++) {
      positions.setXYZ(
        index,
        vertexPool[i].x,
        vertexPool[i].y,
        vertexPool[i].z
      );

      normals.setXYZ(
        index,
        normalPool[i].x,
        normalPool[i].y,
        normalPool[i].z
      );

      index++;
    }

    this.setIndex(new THREE.BufferAttribute(new Uint16Array(indices), 1));
    this.setAttribute('position', positions);
    this.setAttribute('normal', normals);
  }
}

const AnimatedBoxes = ({ 
  gridSize = 40, 
  boxSize = 1,
  backgroundColor = '#43fa8e', 
  lightColor = '#7d7d7d', 
  darkColor = '#25222f',
  lightEmissive = '#0f3855',
  darkEmissive = '#031e31'
}) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const requestRef = useRef(null);
  const oddBoxesRef = useRef([]);
  const evenBoxesRef = useRef([]);
  
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(20, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(-20, 20, -20);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.04;
    controlsRef.current = controls;

    // Add event listeners for cursor changes
    controls.addEventListener("start", () => {
      requestAnimationFrame(() => {
        document.body.style.cursor = "-webkit-grabbing";
      });
    });

    controls.addEventListener("end", () => {
      requestAnimationFrame(() => {
        document.body.style.cursor = "-webkit-grab";
      });
    });

    // Set initial cursor style
    document.body.style.cursor = "-webkit-grab";

    // Add ambient light
    const ambientLight = new THREE.AmbientLight('#ffffff', 1);
    scene.add(ambientLight);

    // Add spot light
    const spotLight = new THREE.SpotLight(0xffffff);
    spotLight.position.set(0, 500, 0);
    scene.add(spotLight);

    // Add point lights
    const light = new THREE.PointLight(0xffffff, 1, 1000);
    light.position.set(0, 20, 0);
    light.castShadow = true;
    scene.add(light);

    const light1 = new THREE.PointLight(0x00ff00, 1, 100);
    light1.position.set(0, 20, 0);
    light1.castShadow = true;
    scene.add(light1);

    const light2 = new THREE.PointLight(0xff00ff, 1, 1000);
    light2.position.set(-50, 50, -20);
    scene.add(light2);

    // Create materials
    const lightMaterial = new THREE.MeshPhongMaterial({
      color: lightColor,
      emissive: lightEmissive
    });

    const darkMaterial = new THREE.MeshPhongMaterial({
      color: darkColor,
      emissive: darkEmissive
    });

    // Create boxes
    const roundedGeometry = new RoundedBoxGeometry(boxSize, boxSize, boxSize, 0.04, 0.4);
    const odds = [];
    const evens = [];

    const getRandomInt = (min, max) => {
      return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const getMaterial = () => {
      const number = getRandomInt(0, gridSize * 2);
      return number % 2 === 0 ? lightMaterial : darkMaterial;
    };

    // Add boxes to the scene
    for (let i = 0; i < gridSize; i++) {
      for (let j = 0; j < gridSize; j++) {
        const box = new THREE.Mesh(roundedGeometry, getMaterial());
        box.position.set((i * boxSize) + gridSize * -0.5, 2, (j * boxSize) + gridSize * -0.5);
        box.castShadow = true;
        box.receiveShadow = true;

        if ((i + j) % 2 === 0) {
          evens.push(box);
        } else {
          odds.push(box);
        }

        scene.add(box);
      }
    }

    oddBoxesRef.current = odds;
    evenBoxesRef.current = evens;

    // Set background color
    document.body.style.backgroundColor = backgroundColor;

    // Animation function
    const animate = () => {
      if (controlsRef.current) controlsRef.current.update();
      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
      requestRef.current = requestAnimationFrame(animate);
    };

    // Start animation loop
    requestRef.current = requestAnimationFrame(animate);

    // Animate boxes
    const radians = (degrees) => degrees * Math.PI / 180;
    
    const animateBoxes = (boxes) => {
      boxes.forEach((box, i) => {
        gsap.to(box.position, {
          y: 3,
          duration: 1.5,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1
        });
        
        gsap.to(box.rotation, {
          z: `-=${radians(180)}`,
          duration: 0.6,
          delay: 1 + (i/1000),
          ease: "sine.inOut"
        });
      });
    };

    // Start animations with delay between odd and even boxes
    animateBoxes(odds);
    setTimeout(() => animateBoxes(evens), 1500);

    // Handle window resize
    const handleResize = () => {
      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = window.innerWidth / window.innerHeight;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(window.innerWidth, window.innerHeight);
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean up
    return () => {
      window.removeEventListener('resize', handleResize);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      if (rendererRef.current && rendererRef.current.domElement && containerRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Remove event listeners
      if (controlsRef.current) {
        controlsRef.current.dispose();
      }
    };
  }, [gridSize, boxSize, backgroundColor, lightColor, darkColor, lightEmissive, darkEmissive]);

  // Toggle between light and dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.style.backgroundColor = isDarkMode ? backgroundColor : '#222';
  };

  return (
    <div className="relative w-full h-screen">
      <div ref={containerRef} className="w-full h-full" />
      <div className="absolute top-4 right-4 z-10">
        <button 
          onClick={toggleDarkMode}
          className="px-4 py-2 bg-white bg-opacity-20 rounded-md text-white hover:bg-opacity-30 transition-all"
        >
          Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
        </button>
      </div>
    </div>
  );
};

export default AnimatedBoxes;