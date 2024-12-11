
const PlatformerGame = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const playerRef = useRef(null);
  const keysRef = useRef({});
  const playerVelocityRef = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Create platform
    const platformGeometry = new THREE.BoxGeometry(10, 0.5, 10);
    const platformMaterial = new THREE.MeshPhongMaterial({ color: 0x00ff00 });
    const platform = new THREE.Mesh(platformGeometry, platformMaterial);
    scene.add(platform);

    // Create player cube
    const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
    const playerMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
    const player = new THREE.Mesh(playerGeometry, playerMaterial);
    player.position.y = 2;
    scene.add(player);
    playerRef.current = player;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0x404040);
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Position camera
    camera.position.set(0, 5, 15);
    camera.lookAt(0, 0, 0);

    sceneRef.current = { scene, camera, renderer };

    // Handle keyboard input
    const handleKeyDown = (e) => {
      keysRef.current[e.key] = true;
    };

    const handleKeyUp = (e) => {
      keysRef.current[e.key] = false;
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // Game loop
    const moveSpeed = 0.1;
    let animationFrameId;

    const animate = () => {
      const keys = keysRef.current;
      const player = playerRef.current;
      const playerVelocity = playerVelocityRef.current;

      // Handle movement
      if (keys['ArrowLeft'] || keys['a']) {
        playerVelocity.x = -moveSpeed;
      } else if (keys['ArrowRight'] || keys['d']) {
        playerVelocity.x = moveSpeed;
      } else {
        playerVelocity.x = 0;
      }

      if (keys['ArrowUp'] || keys['w']) {
        playerVelocity.z = -moveSpeed;
      } else if (keys['ArrowDown'] || keys['s']) {
        playerVelocity.z = moveSpeed;
      } else {
        playerVelocity.z = 0;
      }

      // Apply movement
      player.position.add(playerVelocity);

      // Keep player on platform
      const platformHalfWidth = 5;
      player.position.x = Math.max(-platformHalfWidth, Math.min(platformHalfWidth, player.position.x));
      player.position.z = Math.max(-platformHalfWidth, Math.min(platformHalfWidth, player.position.z));

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      const { camera, renderer } = sceneRef.current;
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div className="w-full h-screen" ref={containerRef}>
      <div className="absolute top-4 left-4 text-white p-4 bg-black bg-opacity-50 rounded">
        Use WASD or Arrow Keys to move
      </div>
    </div>
  );
};