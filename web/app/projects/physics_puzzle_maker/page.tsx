import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as THREE from 'three';

const PhysicsPlatformer = () => {
  const canvasRef = useRef();
  const sceneRef = useRef();
  const rendererRef = useRef();
  const cameraRef = useRef();
  const playerRef = useRef();
  const gameObjectsRef = useRef([]);
  const keysRef = useRef({});
  const animationRef = useRef();
  const physicsRef = useRef({
    gravity: -0.8,
    friction: 0.85,
    jumpForce: 15
  });

  const [gameState, setGameState] = useState({
    level: 1,
    difficulty: 'easy',
    score: 0,
    lives: 3,
    gameOver: false,
    levelComplete: false
  });

  const [playerState, setPlayerState] = useState({
    position: { x: 0, y: 0 },
    velocity: { x: 0, y: 0 },
    onGround: false,
    health: 100
  });

  // Physics and collision detection
  const checkCollision = useCallback((rect1, rect2) => {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
  }, []);

  // Puzzle generator
  const generatePuzzleLevel = useCallback((difficulty) => {
    const platforms = [];
    const obstacles = [];
    const collectibles = [];
    const movingPlatforms = [];
    
    const configs = {
      easy: { platforms: 8, obstacles: 3, collectibles: 5, moving: 1 },
      medium: { platforms: 12, obstacles: 6, collectibles: 7, moving: 2 },
      hard: { platforms: 16, obstacles: 10, collectibles: 10, moving: 3 }
    };
    
    const config = configs[difficulty] || configs.easy;
    
    // Generate main platforms
    for (let i = 0; i < config.platforms; i++) {
      platforms.push({
        x: Math.random() * 40 - 20,
        y: Math.random() * 20 - 10,
        width: 3 + Math.random() * 4,
        height: 0.5,
        type: 'platform'
      });
    }
    
    // Generate obstacles (spikes, barriers)
    for (let i = 0; i < config.obstacles; i++) {
      obstacles.push({
        x: Math.random() * 30 - 15,
        y: Math.random() * 15 - 5,
        width: 1,
        height: 2,
        type: Math.random() > 0.5 ? 'spike' : 'barrier',
        damage: 20
      });
    }
    
    // Generate collectibles
    for (let i = 0; i < config.collectibles; i++) {
      collectibles.push({
        x: Math.random() * 35 - 17.5,
        y: Math.random() * 18 - 7,
        width: 0.8,
        height: 0.8,
        type: 'gem',
        points: 100,
        collected: false
      });
    }
    
    // Generate moving platforms
    for (let i = 0; i < config.moving; i++) {
      movingPlatforms.push({
        x: Math.random() * 20 - 10,
        y: Math.random() * 10 - 2,
        width: 4,
        height: 0.5,
        type: 'moving',
        speed: 0.02 + Math.random() * 0.03,
        direction: Math.random() > 0.5 ? 1 : -1,
        range: 5 + Math.random() * 5,
        startX: 0
      });
    }
    
    // Add ground
    platforms.push({
      x: 0,
      y: -12,
      width: 50,
      height: 1,
      type: 'ground'
    });
    
    // Add goal
    platforms.push({
      x: 18,
      y: 8,
      width: 2,
      height: 3,
      type: 'goal'
    });
    
    return { platforms, obstacles, collectibles, movingPlatforms };
  }, []);

  // Initialize game
  useEffect(() => {
    if (!canvasRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87CEEB);
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.OrthographicCamera(-20, 20, 15, -15, 0.1, 1000);
    camera.position.z = 10;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvasRef.current,
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    scene.add(ambientLight);
    
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    // Player setup
    const playerGeometry = new THREE.BoxGeometry(1, 1.5, 0.5);
    const playerMaterial = new THREE.MeshLambertMaterial({ color: 0xff4444 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.set(-15, 0, 0);
    player.castShadow = true;
    scene.add(player);
    playerRef.current = player;

    // Initialize level
    generateLevel();

    // Event listeners
    const handleKeyDown = (e) => {
      keysRef.current[e.code] = true;
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.code] = false;
    };

    const handleResize = () => {
      const aspect = window.innerWidth / window.innerHeight;
      camera.left = -20 * aspect;
      camera.right = 20 * aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('resize', handleResize);

    // Game loop
    const gameLoop = () => {
      updatePlayer();
      updatePhysics();
      updateCamera();
      renderer.render(scene, camera);
      animationRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoop();

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  const generateLevel = useCallback(() => {
    if (!sceneRef.current) return;

    // Clear existing game objects
    gameObjectsRef.current.forEach(obj => {
      sceneRef.current.remove(obj.mesh);
    });
    gameObjectsRef.current = [];

    // Generate new level
    const level = generatePuzzleLevel(gameState.difficulty);
    
    // Create platforms
    level.platforms.forEach(platform => {
      const geometry = new THREE.BoxGeometry(platform.width, platform.height, 0.5);
      let material;
      
      switch(platform.type) {
        case 'goal':
          material = new THREE.MeshLambertMaterial({ color: 0x00ff00 });
          break;
        case 'ground':
          material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
          break;
        default:
          material = new THREE.MeshLambertMaterial({ color: 0x666666 });
      }
      
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(platform.x, platform.y, 0);
      mesh.receiveShadow = true;
      sceneRef.current.add(mesh);
      
      gameObjectsRef.current.push({
        mesh,
        ...platform,
        bounds: {
          x: platform.x - platform.width/2,
          y: platform.y - platform.height/2,
          width: platform.width,
          height: platform.height
        }
      });
    });

    // Create obstacles
    level.obstacles.forEach(obstacle => {
      const geometry = new THREE.ConeGeometry(0.5, obstacle.height, 4);
      const material = new THREE.MeshLambertMaterial({ 
        color: obstacle.type === 'spike' ? 0xff0000 : 0x444444 
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(obstacle.x, obstacle.y, 0);
      mesh.castShadow = true;
      sceneRef.current.add(mesh);
      
      gameObjectsRef.current.push({
        mesh,
        ...obstacle,
        bounds: {
          x: obstacle.x - obstacle.width/2,
          y: obstacle.y - obstacle.height/2,
          width: obstacle.width,
          height: obstacle.height
        }
      });
    });

    // Create collectibles
    level.collectibles.forEach(collectible => {
      const geometry = new THREE.OctahedronGeometry(0.4);
      const material = new THREE.MeshLambertMaterial({ color: 0xffff00 });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(collectible.x, collectible.y, 0);
      sceneRef.current.add(mesh);
      
      gameObjectsRef.current.push({
        mesh,
        ...collectible,
        bounds: {
          x: collectible.x - collectible.width/2,
          y: collectible.y - collectible.height/2,
          width: collectible.width,
          height: collectible.height
        }
      });
    });

    // Create moving platforms
    level.movingPlatforms.forEach(platform => {
      const geometry = new THREE.BoxGeometry(platform.width, platform.height, 0.5);
      const material = new THREE.MeshLambertMaterial({ color: 0x9966ff });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(platform.x, platform.y, 0);
      mesh.receiveShadow = true;
      sceneRef.current.add(mesh);
      
      platform.startX = platform.x;
      gameObjectsRef.current.push({
        mesh,
        ...platform,
        bounds: {
          x: platform.x - platform.width/2,
          y: platform.y - platform.height/2,
          width: platform.width,
          height: platform.height
        }
      });
    });

    // Reset player position
    if (playerRef.current) {
      playerRef.current.position.set(-15, 0, 0);
      setPlayerState(prev => ({
        ...prev,
        position: { x: -15, y: 0 },
        velocity: { x: 0, y: 0 },
        onGround: false
      }));
    }
  }, [gameState.difficulty, generatePuzzleLevel]);

  const updatePlayer = useCallback(() => {
    if (!playerRef.current) return;

    const player = playerRef.current;
    const keys = keysRef.current;
    const physics = physicsRef.current;
    
    let newVelocity = { ...playerState.velocity };
    let newPosition = { ...playerState.position };
    let onGround = false;

    // Horizontal movement
    if (keys['KeyA'] || keys['ArrowLeft']) {
      newVelocity.x = Math.max(newVelocity.x - 0.5, -8);
    } else if (keys['KeyD'] || keys['ArrowRight']) {
      newVelocity.x = Math.min(newVelocity.x + 0.5, 8);
    } else {
      newVelocity.x *= physics.friction;
    }

    // Jumping
    if ((keys['KeyW'] || keys['ArrowUp'] || keys['Space']) && playerState.onGround) {
      newVelocity.y = physics.jumpForce;
    }

    // Apply gravity
    newVelocity.y += physics.gravity;

    // Update position
    newPosition.x += newVelocity.x * 0.016;
    newPosition.y += newVelocity.y * 0.016;

    // Collision detection
    const playerBounds = {
      x: newPosition.x - 0.5,
      y: newPosition.y - 0.75,
      width: 1,
      height: 1.5
    };

    // Check collisions with platforms
    gameObjectsRef.current.forEach(obj => {
      if (obj.type === 'platform' || obj.type === 'ground' || obj.type === 'moving') {
        if (checkCollision(playerBounds, obj.bounds)) {
          // Landing on top
          if (newVelocity.y < 0 && player.position.y > obj.mesh.position.y) {
            newPosition.y = obj.mesh.position.y + obj.height/2 + 0.75;
            newVelocity.y = 0;
            onGround = true;
          }
          // Hitting from below
          else if (newVelocity.y > 0 && player.position.y < obj.mesh.position.y) {
            newPosition.y = obj.mesh.position.y - obj.height/2 - 0.75;
            newVelocity.y = 0;
          }
          // Side collisions
          else if (Math.abs(newVelocity.x) > 0) {
            if (newPosition.x > obj.mesh.position.x) {
              newPosition.x = obj.mesh.position.x + obj.width/2 + 0.5;
            } else {
              newPosition.x = obj.mesh.position.x - obj.width/2 - 0.5;
            }
            newVelocity.x = 0;
          }
        }
      }

      // Check collectibles
      if (obj.type === 'gem' && !obj.collected && checkCollision(playerBounds, obj.bounds)) {
        obj.collected = true;
        sceneRef.current.remove(obj.mesh);
        setGameState(prev => ({ ...prev, score: prev.score + obj.points }));
      }

      // Check obstacles
      if ((obj.type === 'spike' || obj.type === 'barrier') && checkCollision(playerBounds, obj.bounds)) {
        setPlayerState(prev => ({ ...prev, health: Math.max(0, prev.health - obj.damage) }));
        // Knockback
        newVelocity.x = (newPosition.x > obj.mesh.position.x) ? 5 : -5;
        newVelocity.y = 8;
      }

      // Check goal
      if (obj.type === 'goal' && checkCollision(playerBounds, obj.bounds)) {
        setGameState(prev => ({ 
          ...prev, 
          levelComplete: true, 
          level: prev.level + 1,
          score: prev.score + 500
        }));
        setTimeout(() => {
          setGameState(prev => ({ ...prev, levelComplete: false }));
          generateLevel();
        }, 2000);
      }
    });

    // World boundaries
    if (newPosition.x < -25) newPosition.x = -25;
    if (newPosition.x > 25) newPosition.x = 25;
    if (newPosition.y < -20) {
      // Player fell off the world
      setPlayerState(prev => ({ ...prev, health: 0 }));
      resetPlayer();
      return;
    }

    // Update player mesh
    player.position.set(newPosition.x, newPosition.y, 0);

    // Update state
    setPlayerState(prev => ({
      ...prev,
      position: newPosition,
      velocity: newVelocity,
      onGround
    }));
  }, [playerState, checkCollision]);

  const updatePhysics = useCallback(() => {
    // Update moving platforms
    gameObjectsRef.current.forEach(obj => {
      if (obj.type === 'moving') {
        obj.x += obj.speed * obj.direction;
        
        if (Math.abs(obj.x - obj.startX) > obj.range/2) {
          obj.direction *= -1;
        }
        
        obj.mesh.position.x = obj.x;
        obj.bounds.x = obj.x - obj.width/2;
      }

      // Rotate collectibles
      if (obj.type === 'gem' && !obj.collected) {
        obj.mesh.rotation.y += 0.02;
      }
    });
  }, []);

  const updateCamera = useCallback(() => {
    if (!cameraRef.current || !playerRef.current) return;
    
    const camera = cameraRef.current;
    const player = playerRef.current;
    
    // Smooth camera follow
    const targetX = player.position.x;
    const targetY = Math.max(player.position.y, -5);
    
    camera.position.x += (targetX - camera.position.x) * 0.1;
    camera.position.y += (targetY - camera.position.y) * 0.1;
  }, []);

  const resetPlayer = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.position.set(-15, 0, 0);
      setPlayerState({
        position: { x: -15, y: 0 },
        velocity: { x: 0, y: 0 },
        onGround: false,
        health: 100
      });
    }
  }, []);

  const handleDifficultyChange = (e) => {
    setGameState(prev => ({ ...prev, difficulty: e.target.value }));
  };

  const handleGenerateLevel = () => {
    generateLevel();
  };

  const handleResetLevel = () => {
    resetPlayer();
    setPlayerState(prev => ({ ...prev, health: 100 }));
  };

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-blue-900 to-purple-900">
      <canvas ref={canvasRef} className="w-full h-full" />
      
      {/* UI Overlay */}
      <div className="absolute top-4 left-4 text-white z-10">
        <div className="bg-black bg-opacity-50 p-4 rounded-lg">
          <div className="flex gap-4 mb-2">
            <button
              onClick={handleGenerateLevel}
              className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-sm"
            >
              New Level
            </button>
            <button
              onClick={handleResetLevel}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded text-sm"
            >
              Reset
            </button>
          </div>
          <div className="mb-2">
            <label className="text-sm">Difficulty: </label>
            <select 
              value={gameState.difficulty} 
              onChange={handleDifficultyChange}
              className="bg-gray-700 text-white px-2 py-1 rounded text-sm"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>
      </div>

      {/* Game Stats */}
      <div className="absolute top-4 right-4 text-white z-10">
        <div className="bg-black bg-opacity-50 p-4 rounded-lg text-right">
          <div>Level: {gameState.level}</div>
          <div>Score: {gameState.score}</div>
          <div>Health: {playerState.health}%</div>
          <div className="w-32 bg-gray-700 rounded-full h-2 mt-1">
            <div 
              className="bg-red-600 h-2 rounded-full transition-all"
              style={{ width: `${playerState.health}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 text-white z-10">
        <div className="bg-black bg-opacity-50 p-3 rounded-lg text-sm">
          <div>WASD / Arrow Keys: Move</div>
          <div>Space: Jump</div>
          <div>Goal: Reach the green platform!</div>
        </div>
      </div>

      {/* Level Complete Message */}
      {gameState.levelComplete && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-green-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-2">Level Complete!</h2>
            <p>Score: +500 points</p>
            <p>Loading next level...</p>
          </div>
        </div>
      )}

      {/* Game Over */}
      {playerState.health <= 0 && (
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="bg-red-600 text-white p-8 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Game Over!</h2>
            <button
              onClick={handleResetLevel}
              className="bg-white text-red-600 px-6 py-2 rounded font-bold"
            >
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PhysicsPlatformer;