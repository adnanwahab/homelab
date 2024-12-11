Certainly! Below is a React component that creates a mini-game using Three.js and the `useRef` hook to reference the canvas. This game is a simple action-platformer where a character can move left and right and jump over obstacles.

**Note:** To run this code, you'll need to have `react`, `react-dom`, and `three` installed in your project.

```jsx
// Import necessary modules
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function MiniGame() {
  const mountRef = useRef(null);

  useEffect(() => {
    // Get the mount point
    const mount = mountRef.current;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background

    const camera = new THREE.PerspectiveCamera(
      75,
      mount.clientWidth / mount.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    camera.position.y = 1;

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    // Ground
    const groundGeometry = new THREE.PlaneGeometry(20, 10);
    const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x228b22 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.5;
    scene.add(ground);

    // Player Character
    const characterGeometry = new THREE.BoxGeometry(0.5, 1, 0.5);
    const characterMaterial = new THREE.MeshLambertMaterial({ color: 0xff6347 });
    const character = new THREE.Mesh(characterGeometry, characterMaterial);
    character.position.y = 0.5;
    scene.add(character);

    // Obstacles
    const obstacles = [];
    const obstacleGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    const obstacleMaterial = new THREE.MeshLambertMaterial({ color: 0x8b4513 });

    for (let i = 0; i < 5; i++) {
      const obstacle = new THREE.Mesh(obstacleGeometry, obstacleMaterial);
      obstacle.position.x = Math.random() * 10 - 5;
      obstacle.position.y = 0.25;
      scene.add(obstacle);
      obstacles.push(obstacle);
    }

    // Game State
    const state = {
      moveLeft: false,
      moveRight: false,
      velocityY: 0,
      onGround: true,
    };

    // Input Handling
    function handleKeyDown(event) {
      switch (event.code) {
        case 'ArrowLeft':
          state.moveLeft = true;
          break;
        case 'ArrowRight':
          state.moveRight = true;
          break;
        case 'Space':
          if (state.onGround) {
            state.velocityY = 0.1;
            state.onGround = false;
          }
          break;
        default:
          break;
      }
    }

    function handleKeyUp(event) {
      switch (event.code) {
        case 'ArrowLeft':
          state.moveLeft = false;
          break;
        case 'ArrowRight':
          state.moveRight = false;
          break;
        default:
          break;
      }
    }

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game Loop
    const clock = new THREE.Clock();

    function animate() {
      requestAnimationFrame(animate);

      const delta = clock.getDelta();

      // Horizontal movement
      if (state.moveLeft) {
        character.position.x -= delta * 2;
      }
      if (state.moveRight) {
        character.position.x += delta * 2;
      }

      // Vertical movement (simple gravity)
      if (!state.onGround) {
        state.velocityY -= delta * 0.5; // Gravity
        character.position.y += state.velocityY;

        if (character.position.y <= 0.5) {
          character.position.y = 0.5;
          state.onGround = true;
          state.velocityY = 0;
        }
      }

      // Collision detection
      obstacles.forEach((obstacle) => {
        if (
          Math.abs(character.position.x - obstacle.position.x) < 0.5 &&
          Math.abs(character.position.y - obstacle.position.y) < 0.5
        ) {
          // Simple collision response
          character.position.x = 0; // Reset position
          character.position.y = 0.5;
        }
      });

      renderer.render(scene, camera);
    }

    animate();

    // Cleanup on unmount
    return () => {
      mount.removeChild(renderer.domElement);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '800px', height: '600px', margin: '0 auto' }}
    />
  );
}

export default MiniGame;
```

**Explanation:**

- **Refs and useEffect:** We use `useRef` to get a reference to the DOM element where we mount our Three.js scene. The `useEffect` hook initializes the scene after the component mounts.

- **Scene Setup:**
  - We create a `scene`, `camera`, and `renderer`.
  - The `camera` is positioned to have a good view of the game area.
  - Ambient light is added to illuminate the scene.

- **Ground:** A simple plane represents the ground.

- **Player Character:** A box geometry represents the player.

- **Obstacles:** Randomly placed boxes that the player must avoid.

- **Input Handling:** We listen for `keydown` and `keyup` events to manage player movement.

- **Game Loop (animate function):**
  - Handles player movement and gravity.
  - Checks for collisions between the player and obstacles.
  - Renders the scene.

- **Cleanup:** When the component unmounts, we clean up event listeners and remove the renderer.

**Controls:**

- **Left Arrow:** Move left.
- **Right Arrow:** Move right.
- **Spacebar:** Jump.

**To Use This Component:**

1. **Install Dependencies:**
   ```
   npm install three
   ```

2. **Import and Render the Component:**
   ```jsx
   import React from 'react';
   import ReactDOM from 'react-dom';
   import MiniGame from './MiniGame'; // Adjust the path as needed

   ReactDOM.render(<MiniGame />, document.getElementById('root'));
   ```

**Notes:**

- This is a simplified example to demonstrate integrating Three.js with React using `useRef`.
- The game mechanics are basic. For a more advanced game, you might integrate physics engines like Cannon.js or Ammo.js.
- Ensure that the component's parent element (`div` in this case) has dimensions; otherwise, the renderer will have a size of 0.

**Feel free to customize the game further to suit your preferences!**