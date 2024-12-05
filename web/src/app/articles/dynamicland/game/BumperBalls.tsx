function BumperBalls() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer>();
  const sceneRef = useRef<THREE.Scene>();
  const cameraRef = useRef<THREE.PerspectiveCamera>();
  const playersRef = useRef<THREE.Mesh[]>([]);
  const ballRef = useRef<THREE.Mesh>();
  const animationFrameIdRef = useRef<number>();
  const controlsRef = useRef<Record<string, boolean>>({});

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb); // Sky blue background
    sceneRef.current = scene;

    // Camera Setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 10, 20);
    camera.lookAt(0, 0, 0);
    cameraRef.current = camera;

    // Renderer Setup
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 10, 7.5);
    scene.add(directionalLight);

    // Create Platform
    const platformGeometry = new THREE.CylinderGeometry(15, 15, 1, 64);
    const platformMaterial = new THREE.MeshStandardMaterial({
      color: 0x228b22,
    });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    platform.position.y = -0.5;
    scene.add(platform);

    // Players Setup
    const createPlayer = (color: number, position: THREE.Vector3) => {
      const sphereGeometry = new THREE.SphereGeometry(1, 32, 32);
      const sphereMaterial = new THREE.MeshStandardMaterial({ color });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
      sphere.position.copy(position);
      sphere.userData = { velocity: new THREE.Vector3() };
      scene.add(sphere);
      return sphere;
    };

    // Add Players
    const player1 = createPlayer(0xff0000, new THREE.Vector3(-5, 1, 0)); // Red
    const player2 = createPlayer(0x0000ff, new THREE.Vector3(5, 1, 0));  // Blue
    playersRef.current.push(player1, player2);

    // Animation Loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);

      // Update Players
      playersRef.current.forEach((player, index) => {
        const velocity = player.userData.velocity as THREE.Vector3;

        // Simple friction
        velocity.multiplyScalar(0.98);

        // Update position
        player.position.add(velocity);

        // Keep players on platform
        const distanceFromCenter = player.position.length();
        if (distanceFromCenter > 14) {
          // Push back towards center
          const normal = player.position.clone().normalize();
          player.position.sub(normal.multiplyScalar(distanceFromCenter - 14));
          // Reverse velocity upon collision
          velocity.reflect(normal);
        }

        // Check for collisions with other players
        for (let i = index + 1; i < playersRef.current.length; i++) {
          const otherPlayer = playersRef.current[i];
          const distance = player.position.distanceTo(otherPlayer.position);
          if (distance < 2) {
            // Resolve collision
            const normal = player.position
              .clone()
              .sub(otherPlayer.position)
              .normalize();
            const relativeVelocity = (otherPlayer.userData
              .velocity as THREE.Vector3)
              .clone()
              .sub(velocity);
            const speed = relativeVelocity.dot(normal);
            if (speed < 0) continue;
            const impulse = (2 * speed) / 2;
            velocity.addScaledVector(normal, impulse);
            (otherPlayer.userData.velocity as THREE.Vector3).subScaledVector(
              normal,
              impulse
            );
          }
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Event Handlers
    const handleKeyDown = (event: KeyboardEvent) => {
      controlsRef.current[event.key.toLowerCase()] = true;
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      controlsRef.current[event.key.toLowerCase()] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Handle Resizing
    const handleResize = () => {
      if (containerRef.current && rendererRef.current && cameraRef.current) {
        const width = containerRef.current.clientWidth;
        const height = containerRef.current.clientHeight;
        rendererRef.current.setSize(width, height);
        cameraRef.current.aspect = width / height;
        cameraRef.current.updateProjectionMatrix();
      }
    };

    window.addEventListener('resize', handleResize);

    // Clean Up
    return () => {
      if (animationFrameIdRef.current)
        cancelAnimationFrame(animationFrameIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      if (rendererRef.current) rendererRef.current.dispose();
      playersRef.current = [];
    };
  }, []);

  useEffect(() => {
    // Player Controls
    const updateControls = () => {
      const player = playersRef.current[0];
      if (player) {
        const velocity = player.userData.velocity as THREE.Vector3;

        const speed = 0.2;
        const direction = new THREE.Vector3();

        if (controlsRef.current['arrowup'] || controlsRef.current['w']) {
          direction.z -= 1;
        }
        if (controlsRef.current['arrowdown'] || controlsRef.current['s']) {
          direction.z += 1;
        }
        if (controlsRef.current['arrowleft'] || controlsRef.current['a']) {
          direction.x -= 1;
        }
        if (controlsRef.current['arrowright'] || controlsRef.current['d']) {
          direction.x += 1;
        }

        direction.normalize();
        velocity.addScaledVector(direction, speed);
      }
    };

    const interval = setInterval(updateControls, 16); // 60 fps
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', position: 'relative' }}
    >
      <div
        style={{
          position: 'absolute',
          top: 10,
          left: 10,
          padding: '8px',
          backgroundColor: 'rgba(0,0,0,0.5)',
          color: 'white',
          borderRadius: '4px',
        }}
      >
        <p>Use WASD or Arrow Keys to move the Red Ball.</p>
        <p>Bump the Blue Ball off the platform!</p>
      </div>
    </div>
  );
}