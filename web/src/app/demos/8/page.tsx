'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeJsScene() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    
    // Colors palette
    const Colors = {
      cyan: 0x248079,
      brown: 0xA98F78,
      brownDark: 0x9A6169,
      green: 0x65BB61,
      greenLight: 0xABD66A,
      blue: 0x6BC6FF
    };

    // Scene setup
    const scene = new THREE.Scene();
    const h = window.innerHeight;
    const w = window.innerWidth;
    const aspectRatio = w / h;
    const fieldOfView = 25;
    const nearPlane = 0.1;
    const farPlane = 1000;
    
    const camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true
    });

    const dpi = window.devicePixelRatio;
    renderer.setSize(w * dpi, h * dpi);
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    camera.position.set(-5, 6, 8);
    camera.lookAt(new THREE.Vector3(0, 0, 0));

    // Lighting
    const light = new THREE.AmbientLight(0xffffff, 0.5);

    const shadowLight = new THREE.DirectionalLight(0xffffff, 0.5);
    shadowLight.position.set(200, 200, 200);
    shadowLight.castShadow = true;

    const backLight = new THREE.DirectionalLight(0xffffff, 0.2);
    backLight.position.set(-100, 200, 50);
    backLight.castShadow = true;
    
    scene.add(backLight);
    scene.add(light);
    scene.add(shadowLight);

    // Custom shadow function
    function customizeShadow(t: THREE.Mesh, a: number) {
      const material_shadow = new THREE.ShadowMaterial({ opacity: a });
      const mesh_shadow = new THREE.Mesh(t.geometry, material_shadow);
      mesh_shadow.position.set(t.position.x, t.position.y, t.position.z);
      mesh_shadow.receiveShadow = true;
      scene.add(mesh_shadow);
    }

    // Grassland left
    const geometry_left = new THREE.BoxGeometry(2, 0.2, 2);
    const material_grass = new THREE.MeshLambertMaterial({ color: Colors.greenLight });
    const ground_left = new THREE.Mesh(geometry_left, material_grass);
    ground_left.position.set(-1, 0.1, 0);
    scene.add(ground_left);
    customizeShadow(ground_left, 0.25);

    // River
    const geometry_river = new THREE.BoxGeometry(1, 0.1, 2);
    const material_river = new THREE.MeshLambertMaterial({ color: Colors.blue });
    const river = new THREE.Mesh(geometry_river, material_river);
    river.position.set(0.5, 0.1, 0);
    scene.add(river);
    customizeShadow(river, 0.08);
    
    // River bed
    const geometry_bed = new THREE.BoxGeometry(1, 0.05, 2);
    const bed = new THREE.Mesh(geometry_bed, material_grass);
    bed.position.set(0.5, 0.025, 0);
    scene.add(bed);

    // Grassland right
    const geometry_right = new THREE.BoxGeometry(1, 0.2, 2);
    const ground_right = new THREE.Mesh(geometry_right, material_grass);
    ground_right.position.set(1.5, 0.1, 0);
    scene.add(ground_right);
    customizeShadow(ground_right, 0.25);

    // Tree constructor
    function Tree(x: number, z: number) {
      // Trunk
      const material_trunk = new THREE.MeshLambertMaterial({ color: Colors.brownDark });
      const geometry_trunk = new THREE.BoxGeometry(0.15, 0.15, 0.15);
      const trunk = new THREE.Mesh(geometry_trunk, material_trunk);
      trunk.position.set(x, 0.275, z);
      trunk.castShadow = true;
      trunk.receiveShadow = true;
      scene.add(trunk);
      
      // Leaves
      const geometry_leaves = new THREE.BoxGeometry(0.25, 0.4, 0.25);
      const material_leaves = new THREE.MeshLambertMaterial({ color: Colors.green });
      const leaves = new THREE.Mesh(geometry_leaves, material_leaves);
      leaves.position.set(x, 0.2 + 0.15 + 0.4 / 2, z);
      leaves.castShadow = true;
      customizeShadow(leaves, 0.25);
      scene.add(leaves);
    }

    // Create trees
    // Left side
    Tree(-1.75, -0.85);
    Tree(-1.75, -0.15);
    Tree(-1.5, -0.5);
    Tree(-1.5, 0.4);
    Tree(-1.25, -0.85);
    Tree(-1.25, 0.75);
    Tree(-0.75, -0.85);
    Tree(-0.75, -0.25);
    Tree(-0.25, -0.85);
    // Right side
    Tree(1.25, -0.85);
    Tree(1.25, 0.75);
    Tree(1.5, -0.5);
    Tree(1.75, -0.85);
    Tree(1.75, 0.35);

    // Bridge materials
    const material_wood = new THREE.MeshLambertMaterial({ color: Colors.brown });

    // Bridge - wood blocks
    for (let i = 0; i < 6; i++) {
      const geometry_block = new THREE.BoxGeometry(0.15, 0.02, 0.4);
      const block = new THREE.Mesh(geometry_block, material_wood);
      block.position.set(0 + 0.2 * i, 0.21, 0.2);
      block.castShadow = true;
      block.receiveShadow = true;
      scene.add(block);
    }
    
    // Bridge - rails
    const geometry_rail_v = new THREE.BoxGeometry(0.04, 0.3, 0.04);
    
    const rail_1 = new THREE.Mesh(geometry_rail_v, material_wood);
    rail_1.position.set(-0.1, 0.35, 0.4);
    rail_1.castShadow = true;
    customizeShadow(rail_1, 0.2);
    scene.add(rail_1);

    const rail_2 = new THREE.Mesh(geometry_rail_v, material_wood);
    rail_2.position.set(1.1, 0.35, 0.4);
    rail_2.castShadow = true;
    customizeShadow(rail_2, 0.2);
    scene.add(rail_2);

    const rail_3 = new THREE.Mesh(geometry_rail_v, material_wood);
    rail_3.position.set(-0.1, 0.35, 0);
    rail_3.castShadow = true;
    customizeShadow(rail_3, 0.2);
    scene.add(rail_3);

    const rail_4 = new THREE.Mesh(geometry_rail_v, material_wood);
    rail_4.position.set(1.1, 0.35, 0);
    rail_4.castShadow = true;
    customizeShadow(rail_4, 0.2);
    scene.add(rail_4);

    const geometry_rail_h = new THREE.BoxGeometry(1.2, 0.04, 0.04);
    
    const rail_h1 = new THREE.Mesh(geometry_rail_h, material_wood);
    rail_h1.position.set(0.5, 0.42, 0.4);
    rail_h1.castShadow = true;
    customizeShadow(rail_h1, 0.2);
    scene.add(rail_h1);

    const rail_h2 = new THREE.Mesh(geometry_rail_h, material_wood);
    rail_h2.position.set(0.5, 0.42, 0);
    rail_h2.castShadow = true;
    customizeShadow(rail_h2, 0.2);
    scene.add(rail_h2);

    // Water drop class
    class Drop {
      geometry: THREE.BoxGeometry;
      drop: THREE.Mesh;
      speed: number;
      lifespan: number;

      constructor() {
        this.geometry = new THREE.BoxGeometry(0.1, 0.1, 0.1);
        this.drop = new THREE.Mesh(this.geometry, material_river);
        this.drop.position.set(
          0.1 + Math.random() * 0.8,
          0.1,
          1 + (Math.random() - 0.5) * 0.1
        );
        scene.add(this.drop);
        this.speed = 0;
        this.lifespan = (Math.random() * 50) + 50;
      }

      update() {
        this.speed += 0.0007;
        this.lifespan--;
        this.drop.position.x += (0.5 - this.drop.position.x) / 70;
        this.drop.position.y -= this.speed;
      }
    }

    const drops: Drop[] = [];
    let count = 0;

    // Animation loop
    function animate() {
      requestAnimationFrame(animate);
      
      if (count % 3 === 0) {
        for (let i = 0; i < 5; i++) {
          drops.push(new Drop());
        }
      }
      
      count++;
      
      for (let i = 0; i < drops.length; i++) {
        drops[i].update();
        if (drops[i].lifespan < 0) {
          scene.remove(drops[i].drop);
          drops.splice(i, 1);
          i--;
        }
      }
      
      renderer.render(scene, camera);
    }

    // Handle window resize
    function handleResize() {
      const newWidth = window.innerWidth;
      const newHeight = window.innerHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      
      const newDpi = window.devicePixelRatio;
      renderer.setSize(newWidth * newDpi, newHeight * newDpi);
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;
    }

    window.addEventListener('resize', handleResize);
    
    // Start animation
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', handleResize);
      
      // Dispose geometries and materials to prevent memory leaks
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          
          if (object.material instanceof THREE.Material) {
            object.material.dispose();
          } else if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          }
        }
      });
      
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
}
