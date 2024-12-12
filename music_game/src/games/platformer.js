import * as THREE from 'three';
import { dimensions } from '../utils/constants.js';
function platformer(canvas) { 
    console.log('platformer');
// Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({canvas: canvas});
  renderer.setSize(dimensions.width, dimensions.height);
  //document.body.appendChild(renderer.domElement);

  // Create player cube
  const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
  const playerMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
  const player = new THREE.Mesh(playerGeometry, playerMaterial);
  player.position.y = 2;
  scene.add(player);

  // Create ground
  const groundGeometry = new THREE.BoxGeometry(20, 1, 20);
  const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.position.y = -0.5;
  scene.add(ground);

  // Create platforms
  const platforms = [];
  const createPlatform = (x, y, z) => {
      const platformGeometry = new THREE.BoxGeometry(3, 1, 3);
      const platformMaterial = new THREE.MeshPhongMaterial({ color: 0x8080ff });
      const platform = new THREE.Mesh(platformGeometry, platformMaterial);
      platform.position.set(x, y, z);
      scene.add(platform);
      platforms.push(platform);
  };

  // Add some platforms
  createPlatform(5, 2, 0);
  createPlatform(-5, 4, -2);
  createPlatform(0, 6, -5);

  // Add lights
  const ambientLight = new THREE.AmbientLight(0x404040);
  scene.add(ambientLight);
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(1, 3, 2);
  scene.add(directionalLight);

  // Set up camera
  camera.position.set(0, 10, 15);
  camera.lookAt(0, 0, 0);

  // Player physics
  const velocity = new THREE.Vector3();
  const GRAVITY = -0.01;
  const JUMP_FORCE = 0.2;
  const MOVE_SPEED = 0.15;
  let canJump = false;

  // Input handling
  const keys = {};
  document.addEventListener('keydown', (e) => keys[e.key.toLowerCase()] = true);
  document.addEventListener('keyup', (e) => keys[e.key.toLowerCase()] = false);

  // Check collision with ground and platforms
  function checkCollision() {
      // Ground collision
      if (player.position.y - 0.5 <= ground.position.y + 0.5) {
          player.position.y = ground.position.y + 1;
          velocity.y = 0;
          canJump = true;
      }

      // Platform collision
      for (const platform of platforms) {
          if (Math.abs(player.position.x - platform.position.x) < 2 &&
              Math.abs(player.position.z - platform.position.z) < 2 &&
              player.position.y - 0.5 <= platform.position.y + 0.5 &&
              player.position.y > platform.position.y) {
              player.position.y = platform.position.y + 1;
              velocity.y = 0;
              canJump = true;
              return;
          }
      }
  }

  // Animation loop
  function animate() {
      requestAnimationFrame(animate);

      // Handle input
      if (keys['w']) player.position.z -= MOVE_SPEED;
      if (keys['s']) player.position.z += MOVE_SPEED;
      if (keys['a']) player.position.x -= MOVE_SPEED;
      if (keys['d']) player.position.x += MOVE_SPEED;
      if (keys[' '] && canJump) {
          velocity.y = JUMP_FORCE;
          canJump = false;
      }

      // Apply gravity
      velocity.y += GRAVITY;
      player.position.y += velocity.y;

      // Check collisions
      checkCollision();

      // Keep player within bounds
      player.position.x = Math.max(-10, Math.min(10, player.position.x));
      player.position.z = Math.max(-10, Math.min(10, player.position.z));

      renderer.render(scene, camera);
  }


  animate();
}

export default platformer;