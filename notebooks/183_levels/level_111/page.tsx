Sure! Below is a React.js component that creates a simple mini-game inspired by "Omno" using Three.js and the `useRef` hook. This mini-game allows the player to navigate a 3D environment, collect orbs, and experience basic game mechanics akin to a puzzle-adventure genre.

**Prerequisites**:

- Ensure you have `react`, `react-dom`, and `three` installed in your project.
- This example uses functional components and React hooks.

**Installation**:

```bash
npm install three
```

**Code**:

```jsx
// OmnoMiniGame.js
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function OmnoMiniGame() {
  const mountRef = useRef(null);

  useEffect(() => {
    // References
    const currentMount = mountRef.current;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Light blue sky color

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      currentMount.clientWidth / currentMount.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 5, 10);

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
    currentMount.appendChild(renderer.domElement);

    // Resize Handling
    const handleResize = () => {
      renderer.setSize(currentMount.clientWidth, currentMount.clientHeight);
      camera.aspect = currentMount.clientWidth / currentMount.clientHeight;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', handleResize);

    // Light Setup
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(10, 10, 5);
    scene.add(directionalLight);

    // Ground Plane
    const planeGeometry = new THREE.PlaneGeometry(200, 200);
    const planeMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const groundPlane = new THREE.Mesh(planeGeometry, planeMaterial);
    groundPlane.rotation.x = -Math.PI / 2; // Rotate to make it horizontal
    scene.add(groundPlane);

    // Player (Cube)
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshStandardMaterial({ color: 0x8b4513 });
    const playerCube = new THREE.Mesh(playerGeometry, playerMaterial);
    playerCube.position.y = 0.5; // Half of height to sit on the plane
    scene.add(playerCube);

    // Orbs (Collectibles)
    const orbs = [];
    const orbGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const orbMaterial = new THREE.MeshStandardMaterial({ color: 0xffff00 });

    for (let i = 0; i < 10; i++) {
      const orb = new THREE.Mesh(orbGeometry, orbMaterial);
      orb.position.set(
        (Math.random() - 0.5) * 50,
        0.3,
        (Math.random() - 0.5) * 50
      );
      scene.add(orb);
      orbs.push(orb);
    }

    // Controls
    const keysPressed = {};

    const onKeyDown = (event) => {
      keysPressed[event.key.toLowerCase()] = true;
    };

    const onKeyUp = (event) => {
      keysPressed[event.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', onKeyDown);
    window.addEventListener('keyup', onKeyUp);

    // Animation Loop
    const clock = new THREE.Clock();

    const animate = () => {
      requestAnimationFrame(animate);

      // Calculate delta time
      const delta = clock.getDelta();
      const speed = 5; // Units per second

      // Movement Controls
      if (keysPressed['w'] || keysPressed['arrowup']) {
        playerCube.position.z -= speed * delta;
      }
      if (keysPressed['s'] || keysPressed['arrowdown']) {
        playerCube.position.z += speed * delta;
      }
      if (keysPressed['a'] || keysPressed['arrowleft']) {
        playerCube.position.x -= speed * delta;
      }
      if (keysPressed['d'] || keysPressed['arrowright']) {
        playerCube.position.x += speed * delta;
      }

      // Collision Detection with Orbs
      orbs.forEach((orb, index) => {
        const distance = playerCube.position.distanceTo(orb.position);
        if (distance < 0.7) {
          scene.remove(orb);
          orbs.splice(index, 1);
        }
      });

      // Camera follows player
      camera.position.lerp(
        new THREE.Vector3(
          playerCube.position.x,
          playerCube.position.y + 5,
          playerCube.position.z + 10
        ),
        0.1
      );
      camera.lookAt(playerCube.position);

      // Render the scene
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on Unmount
    return () => {
      currentMount.removeChild(renderer.domElement);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', onKeyDown);
      window.removeEventListener('keyup', onKeyUp);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{ width: '100%', height: '100vh', overflow: 'hidden' }}
    />
  );
}

export default OmnoMiniGame;
```

**Explanation**:

1. **Imports**:
   - We import `React`, the `useRef` and `useEffect` hooks, and `three`.

2. **Component Structure**:
   - `OmnoMiniGame` is a functional component that initializes the Three.js scene when the component mounts and cleans up when it unmounts.

3. **Scene Setup**:
   - We create a `scene`, `camera`, and `renderer`. The scene's background is set to a light blue color to simulate the sky.

4. **Lighting**:
   - Ambient and directional lights are added to illuminate the scene and the objects.

5. **Ground Plane**:
   - A large plane represents the ground. It's rotated to be horizontal and added to the scene.

6. **Player Cube**:
   - A cube represents the player character. It's positioned slightly above the ground to sit correctly on the plane.

7. **Orbs (Collectibles)**:
   - Spheres represent orbs scattered randomly across the ground for the player to collect.

8. **Controls**:
   - We set up event listeners for `keydown` and `keyup` to track the player's input.
   - The `keysPressed` object keeps track of which keys are currently pressed.

9. **Animation Loop**:
   - The `animate` function handles movement, collision detection, camera updates, and rendering.
   - Movement is frame-rate independent by using `delta`, the time difference between frames.
   - Collision detection checks if the player is close enough to an orb, then collects (removes) it.

10. **Camera Follow**:
    - The camera smoothly follows the player using `camera.position.lerp()`.
    - It always looks at the player's position.

11. **Cleanup**:
    - On component unmount, we remove the renderer's DOM element and event listeners to prevent memory leaks.

**Usage**:

Import and use the `OmnoMiniGame` component in your application:

```jsx
// App.js
import React from 'react';
import OmnoMiniGame from './OmnoMiniGame';

function App() {
  return (
    <div>
      <OmnoMiniGame />
    </div>
  );
}

export default App;
```

**Controls**:

- Use `W`, `A`, `S`, `D` or arrow keys to move the cube around.
- Collect all the orbs scattered around the map.

**Styling**:

- The parent `div` uses `width: '100%'` and `height: '100vh'` to make the canvas full-screen.
- `overflow: 'hidden'` prevents scrollbars from appearing.

**Notes**:

- This mini-game provides a basic foundation.
- You can expand upon this by adding textures, more complex models, shadows, and additional game mechanics like puzzles inspired by "Omno".
- Consider using advanced controls like `PointerLockControls` or libraries like `react-three-fiber` for more complex applications.

**Example of Enhancements**:

- **Adding Textures**: Load texture images to apply to the ground and player cube for a more realistic look.
- **Shadows**: Enable shadow mapping in the renderer and set up lights and objects to cast and receive shadows.
- **Player Model**: Replace the cube with a more detailed 3D model of a character.

By starting with this component, you can iteratively develop a more comprehensive game similar to "Omno".