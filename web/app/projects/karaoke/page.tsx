'use client'
import React, { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';
import { Play, Pause, RotateCcw } from 'lucide-react';

const KaraokeDemo = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [currentLine, setCurrentLine] = useState(0);
  const animationRef = useRef(null);
  const startTimeRef = useRef(null);
  const pausedTimeRef = useRef(0);

  // Sample karaoke data
  const lyrics = [
    { text: "Welcome to the karaoke stage", start: 0, end: 3 },
    { text: "Sing along with the floating words", start: 3, end: 6 },
    { text: "Watch the colors dance and glow", start: 6, end: 9 },
    { text: "This is your moment to shine", start: 9, end: 12 },
    { text: "Let your voice fill the virtual space", start: 12, end: 15 },
    { text: "Music and lights all around", start: 15, end: 18 },
    { text: "Every word lights up in time", start: 18, end: 21 },
    { text: "Karaoke magic comes alive", start: 21, end: 24 }
  ];

  useEffect(() => {
    if (!mountRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0a0a);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 8);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    mountRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Stage platform
    const stageGeometry = new THREE.CylinderGeometry(4, 4, 0.2, 32);
    const stageMaterial = new THREE.MeshPhongMaterial({ 
      color: 0x2a2a2a,
      shininess: 100 
    });
    const stage = new THREE.Mesh(stageGeometry, stageMaterial);
    stage.position.y = -1;
    stage.receiveShadow = true;
    scene.add(stage);

    // Spotlights
    const spotlight1 = new THREE.SpotLight(0xff6b6b, 1, 20, Math.PI / 6, 0.3);
    spotlight1.position.set(-3, 5, 2);
    spotlight1.target.position.set(0, 0, 0);
    spotlight1.castShadow = true;
    scene.add(spotlight1);
    scene.add(spotlight1.target);

    const spotlight2 = new THREE.SpotLight(0x4ecdc4, 1, 20, Math.PI / 6, 0.3);
    spotlight2.position.set(3, 5, 2);
    spotlight2.target.position.set(0, 0, 0);
    spotlight2.castShadow = true;
    scene.add(spotlight2);
    scene.add(spotlight2.target);

    const spotlight3 = new THREE.SpotLight(0xffe66d, 1, 20, Math.PI / 6, 0.3);
    spotlight3.position.set(0, 6, -2);
    spotlight3.target.position.set(0, 0, 0);
    spotlight3.castShadow = true;
    scene.add(spotlight3);
    scene.add(spotlight3.target);

    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3);
    scene.add(ambientLight);

    // Disco ball
    const discoBallGeometry = new THREE.SphereGeometry(0.5, 16, 16);
    const discoBallMaterial = new THREE.MeshPhongMaterial({ 
      color: 0xffffff,
      shininess: 1000,
      reflectivity: 1 
    });
    const discoBall = new THREE.Mesh(discoBallGeometry, discoBallMaterial);
    discoBall.position.set(0, 4, 0);
    discoBall.castShadow = true;
    scene.add(discoBall);

    // Particles for atmosphere
    const particleGeometry = new THREE.BufferGeometry();
    const particleCount = 200;
    const positions = new Float32Array(particleCount * 3);
    
    for (let i = 0; i < particleCount * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 20;
      positions[i + 1] = Math.random() * 10;
      positions[i + 2] = (Math.random() - 0.5) * 20;
    }
    
    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particleMaterial = new THREE.PointsMaterial({ 
      color: 0xffffff, 
      size: 0.05,
      transparent: true,
      opacity: 0.6 
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);
      
      const time = Date.now() * 0.001;
      
      // Rotate disco ball
      discoBall.rotation.y += 0.02;
      discoBall.rotation.x += 0.01;
      
      // Animate spotlights
      spotlight1.intensity = 0.5 + Math.sin(time * 2) * 0.3;
      spotlight2.intensity = 0.5 + Math.sin(time * 2 + Math.PI / 3) * 0.3;
      spotlight3.intensity = 0.5 + Math.sin(time * 2 + 2 * Math.PI / 3) * 0.3;
      
      // Rotate particles
      particles.rotation.y += 0.001;
      
      // Camera gentle movement
      camera.position.x = Math.sin(time * 0.1) * 0.5;
      camera.lookAt(0, 1, 0);
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  // Timer effect for karaoke progression
  useEffect(() => {
    let interval;
    
    if (isPlaying) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now() - pausedTimeRef.current * 1000;
      }
      
      interval = setInterval(() => {
        const elapsed = (Date.now() - startTimeRef.current) / 1000;
        setCurrentTime(elapsed);
        
        // Find current line
        const line = lyrics.findIndex(l => elapsed >= l.start && elapsed < l.end);
        if (line !== -1) {
          setCurrentLine(line);
        }
        
        // Reset when song ends
        if (elapsed >= 24) {
          setIsPlaying(false);
          setCurrentTime(0);
          setCurrentLine(0);
          startTimeRef.current = null;
          pausedTimeRef.current = 0;
        }
      }, 100);
    } else if (startTimeRef.current) {
      pausedTimeRef.current = currentTime;
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying, currentTime]);

  const togglePlayback = () => {
    setIsPlaying(!isPlaying);
  };

  const resetSong = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setCurrentLine(0);
    startTimeRef.current = null;
    pausedTimeRef.current = 0;
  };

  const getWordProgress = (lineIndex) => {
    if (lineIndex !== currentLine) return 0;
    const line = lyrics[lineIndex];
    if (!line) return 0;
    const progress = (currentTime - line.start) / (line.end - line.start);
    return Math.max(0, Math.min(1, progress));
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <div ref={mountRef} className="absolute inset-0" />
      
      {/* Karaoke UI Overlay */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Title */}
        <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
            🎤 3D Karaoke Stage
          </h1>
        </div>
        
        {/* Lyrics Display */}
        <div className="absolute bottom-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl px-8">
          <div className="space-y-4">
            {lyrics.map((line, index) => {
              const isActive = index === currentLine;
              const isPast = index < currentLine;
              const progress = getWordProgress(index);
              
              return (
                <div
                  key={index}
                  className={`text-center transition-all duration-300 ${
                    isActive 
                      ? 'text-4xl font-bold transform scale-110' 
                      : isPast 
                        ? 'text-2xl text-gray-400'
                        : 'text-2xl text-gray-600'
                  }`}
                >
                  <div className="relative inline-block">
                    <span className="relative z-10">
                      {line.text}
                    </span>
                    {isActive && (
                      <div
                        className="absolute inset-0 bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent transition-all duration-100"
                        style={{
                          clipPath: `inset(0 ${100 - progress * 100}% 0 0)`
                        }}
                      >
                        {line.text}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Controls */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 pointer-events-auto">
          <div className="flex items-center space-x-4 bg-black/50 backdrop-blur-sm rounded-full px-6 py-3">
            <button
              onClick={togglePlayback}
              className="flex items-center justify-center w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full hover:from-pink-600 hover:to-purple-600 transition-all duration-200 transform hover:scale-105"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 text-white" />
              ) : (
                <Play className="w-6 h-6 text-white ml-1" />
              )}
            </button>
            
            <button
              onClick={resetSong}
              className="flex items-center justify-center w-12 h-12 bg-gray-600 rounded-full hover:bg-gray-500 transition-all duration-200 transform hover:scale-105"
            >
              <RotateCcw className="w-5 h-5 text-white" />
            </button>
            
            {/* Progress bar */}
            <div className="w-48 h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-pink-400 to-purple-400 transition-all duration-100"
                style={{ width: `${(currentTime / 24) * 100}%` }}
              />
            </div>
            
            <span className="text-white text-sm font-mono">
              {Math.floor(currentTime)}s / 24s
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KaraokeDemo;