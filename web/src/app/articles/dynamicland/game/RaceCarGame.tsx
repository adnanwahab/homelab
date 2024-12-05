import * as THREE from "three";

export default function RaceCarGame() {
  // import * as THREE from "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.jss

  // Set up scene, camera, and renderer
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x4444aa);
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);
  
  // Create track
  function createTrack() {
      const trackGroup = new THREE.Group();
      console.log(trackGroup)
      // Base track
      const trackGeometry = new THREE.BoxGeometry(100, 1, 10);
      const trackMaterial = new THREE.MeshPhongMaterial({ color: 0x333333 });
      const track = new THREE.Mesh(trackGeometry, trackMaterial);
      trackGroup.add(track);
      
      // Create loop
      const curve = new THREE.CubicBezierCurve3(
          new THREE.Vector3(20, 0, 0),
          new THREE.Vector3(40, 20, 0),
          new THREE.Vector3(60, 20, 0),
          new THREE.Vector3(80, 0, 0)
      );
      
      const points = curve.getPoints(50);
      const loopGeometry = new THREE.BufferGeometry().setFromPoints(points);
      const loopMaterial = new THREE.LineBasicMaterial({ color: 0x333333, linewidth: 10 });
      const loopMesh = new THREE.Line(loopGeometry, loopMaterial);
      trackGroup.add(loopMesh);
      
      return trackGroup;
  }
  
  // Create car
  function createCar() {
      const carGroup = new THREE.Group();
      
      // Car body
      const bodyGeometry = new THREE.BoxGeometry(4, 1.5, 2);
      const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0x33ff33 }); // Green color
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      carGroup.add(body);
      
      // Wheels
      const wheelGeometry = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 32);
      const wheelMaterial = new THREE.MeshPhongMaterial({ color: 0x111111 });
      
      const wheels = [];
      const wheelPositions = [
          [-1.5, -0.5, 1], [1.5, -0.5, 1],
          [-1.5, -0.5, -1], [1.5, -0.5, -1]
      ];
      
      wheelPositions.forEach(position => {
          const wheel = new THREE.Mesh(wheelGeometry, wheelMaterial);
          wheel.rotation.z = Math.PI / 2;
          wheel.position.set(...position);
          wheels.push(wheel);
          carGroup.add(wheel);
      });
      
      return carGroup;
  }
  
  // Add lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);
  
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(0, 20, 10);
  scene.add(directionalLight);
  
  // Add track and car to scene
  const track = createTrack();
  scene.add(track);
  
  const car = createCar();
  car.position.set(-40, 2, 0);
  scene.add(car);
  
  // Position camera
  camera.position.set(0, 20, 30);
  camera.lookAt(0, 0, 0);
  
  // Animation variables
  let carPosition = -40;
  let speed = 0.3;
  
  // Animation loop
  function animate() {
      requestAnimationFrame(animate);
      
      // Move car
      carPosition += speed;
      car.position.x = carPosition;
      
      // Reset car position when it reaches the end
      if (carPosition > 40) {
          carPosition = -40;
      }
      
      // Add some bouncing effect
      car.position.y = 2 + Math.sin(carPosition * 0.1) * 0.1;
      
      // Rotate wheels
      car.children.slice(1).forEach(wheel => {
          wheel.rotation.x += 0.1;
      });
      
      renderer.render(scene, camera);
  }
  
  // Handle window resize
  window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
  });
  
  // Start animation
  animate();

}