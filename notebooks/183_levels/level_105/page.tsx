Here's a React.js component that creates a mini-game using Three.js and `useRef`. This mini-game is inspired by **"Kingdom Two Crowns"**, a co-op strategy game published by **Raw Fury** on **2018-12-11**. In this simple game, you control a character that can move left and right across a plane. You can extend this basic setup to add more features as needed.

```jsx
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const MiniGame = () => {
  const canvasRef = useRef();

  useEffect(() => {
    // Get the canvas from the ref
    const canvas = canvasRef.current;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    // Create a Three.js renderer
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(width, height);

    // Create a scene
    const scene = new THREE.Scene();

    // Set up a camera
    const camera = new THREE.OrthographicCamera(
      width / -200, width / 200,   // left and right
      height / 200, height / -200, // top and bottom
      0.1, 1000                    // near and far
    );
    camera.position.z = 5;

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 10, 10);
    scene.add(directionalLight);

    // Add ground plane
    const groundGeometry = new THREE.PlaneGeometry(50, 50);
    const groundMaterial = new THREE.MeshPhongMaterial({ color: 0x808080 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add(ground);

    // Create a character (represented by a box)
    const characterSize = 1;
    const characterGeometry = new THREE.BoxGeometry(characterSize, characterSize, characterSize);
    const characterMaterial = new THREE.MeshPhongMaterial({ color: 0xffff00 }); // Yellow color
    const character = new THREE.Mesh(characterGeometry, characterMaterial);
    character.position.y = characterSize / 2;
    scene.add(character);

    // Game state variables
    let moveLeft = false;
    let moveRight = false;

    // Handle keyboard input
    const handleKeyDown = (event) => {
      if (event.code === 'ArrowLeft') moveLeft = true;
      if (event.code === 'ArrowRight') moveRight = true;
    };

    const handleKeyUp = (event) => {
      if (event.code === 'ArrowLeft') moveLeft = false;
      if (event.code === 'ArrowRight') moveRight = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      // Update character position
      if (moveLeft) character.position.x -= 0.1;
      if (moveRight) character.position.x += 0.1;

      // Keep the character within the ground boundaries
      if (character.position.x < -24.5) character.position.x = -24.5;
      if (character.position.x > 24.5) character.position.x = 24.5;

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Clean up event listeners on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />
    </div>
  );
};

export default MiniGame;
```

**Explanation:**

- **Canvas Reference (`useRef`):** We use the `useRef` hook to reference the canvas element where Three.js will render the scene.
- **Three.js Setup:**
  - **Renderer:** A WebGL renderer is created using the canvas reference.
  - **Scene:** A new Three.js scene is initialized.
  - **Camera:** An orthographic camera is set up for a 2D side-scrolling effect.
  - **Lighting:** Ambient and directional lights are added to illuminate the scene.
- **Game Elements:**
  - **Ground Plane:** A plane serves as the ground.
  - **Character:** A box geometry represents the player’s character.
- **Controls:**
  - **Keyboard Events:** Event listeners for `keydown` and `keyup` detect when the left or right arrow keys are pressed.
  - **Movement:** The character moves left or right based on the key presses.
- **Animation Loop:** The `animate` function updates the scene and re-renders it at every frame using `requestAnimationFrame`.
- **Cleanup:** Event listeners are removed when the component is unmounted to prevent memory leaks.

**Usage:**

To use this component, simply import it and include it in your JSX:

```jsx
import MiniGame from './MiniGame';

function App() {
  return (
    <div>
      <h1>Kingdom Two Crowns Mini-Game</h1>
      <MiniGame />
    </div>
  );
}

export default App;
```

**Note:** This is a basic setup meant to serve as a starting point. You can expand upon this by adding more game mechanics, assets, and interactivity to create a richer experience similar to **"Kingdom Two Crowns"**.