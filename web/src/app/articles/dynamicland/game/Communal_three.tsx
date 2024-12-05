'use client';
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

const Communal_three = () => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  
  const [cameraAngle, setCameraAngle] = useState(0);
  const [cameraHeight, setCameraHeight] = useState(8);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf0f0f0);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.set(8, 8, 8);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // Create dynamic timeline
    const createTimeline = () => {
      const timelineGroup = new THREE.Group();
      
      // Create cards
      for (let i = 0; i < 8; i++) {
        const cardGeometry = new THREE.PlaneGeometry(0.8, 0.8);
        const cardMaterial = new THREE.MeshPhongMaterial({
          color: 0x87ceeb,
          side: THREE.DoubleSide,
        });
        const card = new THREE.Mesh(cardGeometry, cardMaterial);
        card.position.set(i * 1.2 - 4, 4, 0);
        card.rotation.x = Math.PI * 0.1;
        timelineGroup.add(card);
      }
      
      return timelineGroup;
    };

    // Create cell membrane model
    const createCellMembrane = () => {
      const membraneGroup = new THREE.Group();
      
      // Create membrane layers
      const layerGeometry = new THREE.PlaneGeometry(4, 3);
      const layerMaterial = new THREE.MeshPhongMaterial({
        color: 0xffa500,
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });

      // Create multiple layers with slight offset
      for (let i = 0; i < 5; i++) {
        const layer = new THREE.Mesh(layerGeometry, layerMaterial);
        layer.position.z = i * 0.2;
        membraneGroup.add(layer);
        
        // Add protein channels
        const channelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.4, 8);
        const channelMaterial = new THREE.MeshPhongMaterial({ color: 0xff69b4 });
        for (let j = 0; j < 3; j++) {
          const channel = new THREE.Mesh(channelGeometry, channelMaterial);
          channel.position.set(
            Math.random() * 3 - 1.5,
            Math.random() * 2 - 1,
            i * 0.2
          );
          channel.rotation.x = Math.PI / 2;
          membraneGroup.add(channel);
        }
      }
      
      return membraneGroup;
    };

    // Create program cards implementation area
    const createProgramCards = () => {
      const cardsGroup = new THREE.Group();
      
      // Create table
      const tableGeometry = new THREE.BoxGeometry(4, 0.1, 2);
      const tableMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
      const table = new THREE.Mesh(tableGeometry, tableMaterial);
      cardsGroup.add(table);
      
      // Add program cards
      const cardGeometry = new THREE.BoxGeometry(0.4, 0.02, 0.6);
      const cardMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
      
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {
          const card = new THREE.Mesh(cardGeometry, cardMaterial);
          card.position.set(
            i * 0.8 - 1.2,
            0.06,
            j * 0.7 - 0.7
          );
          cardsGroup.add(card);
        }
      }
      
      return cardsGroup;
    };

    // Create signal processing sandbox
    const createSignalProcessing = () => {
      const signalGroup = new THREE.Group();
      
      // Create display screen
      const screenGeometry = new THREE.PlaneGeometry(3, 2);
      const screenMaterial = new THREE.MeshPhongMaterial({
        color: 0x000000,
        side: THREE.DoubleSide,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      
      // Add signal wave visualization
      const waveGeometry = new THREE.BufferGeometry();
      const wavePoints = [];
      for (let i = 0; i < 50; i++) {
        wavePoints.push(
          i * 0.06 - 1.5,
          Math.sin(i * 0.2) * 0.3,
          0.01
        );
      }
      waveGeometry.setAttribute('position', new THREE.Float32BufferAttribute(wavePoints, 3));
      const waveMaterial = new THREE.LineBasicMaterial({ color: 0x00ff00 });
      const wave = new THREE.Line(waveGeometry, waveMaterial);
      
      signalGroup.add(screen);
      signalGroup.add(wave);
      
      return signalGroup;
    };

    // Add all components to scene
    const timeline = createTimeline();
    timeline.position.set(0, 2, -5);
    scene.add(timeline);

    const membrane = createCellMembrane();
    membrane.position.set(-4, 0, 0);
    membrane.rotation.y = Math.PI * 0.2;
    scene.add(membrane);

    const programCards = createProgramCards();
    programCards.position.set(0, -2, 0);
    scene.add(programCards);

    const signalProcessing = createSignalProcessing();
    signalProcessing.position.set(4, 0, 2);
    signalProcessing.rotation.y = -Math.PI * 0.2;
    scene.add(signalProcessing);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      if (cameraRef.current) {
        const radius = 12;
        cameraRef.current.position.x = radius * Math.cos(cameraAngle);
        cameraRef.current.position.z = radius * Math.sin(cameraAngle);
        cameraRef.current.position.y = cameraHeight;
        cameraRef.current.lookAt(0, 0, 0);
      }

      if (membrane) {
        membrane.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      if (cameraRef.current && rendererRef.current) {
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
        rendererRef.current.setSize(width, height);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [cameraAngle, cameraHeight]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      switch (event.key) {
        case 'ArrowLeft':
          setCameraAngle(prev => prev - 0.1);
          break;
        case 'ArrowRight':
          setCameraAngle(prev => prev + 0.1);
          break;
        case 'ArrowUp':
          setCameraHeight(prev => Math.min(prev + 0.5, 15));
          break;
        case 'ArrowDown':
          setCameraHeight(prev => Math.max(prev - 0.5, 2));
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="w-full h-screen">
      <canvas ref={canvasRef} className="w-full h-full" />
      <div className="absolute bottom-4 left-4 text-sm text-gray-600 bg-white/80 p-2 rounded">
        Use arrow keys to rotate camera (←→) and adjust height (↑↓)
      </div>
    </div>
  );
};

export default Communal_three;