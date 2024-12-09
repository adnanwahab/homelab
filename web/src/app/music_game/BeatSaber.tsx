export default function BeatSaber() {
  return <div>BeatSaber</div>;
}


// import * as THREE from 'three';

// let scene, camera, renderer, controller1, controller2;

// function init() {
//   scene = new THREE.Scene();
  
//   camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
//   camera.position.set(0, 1.6, 0); // approximate player height
//   scene.add(camera);
  
//   renderer = new THREE.WebGLRenderer({ antialias: true });
//   renderer.setSize(window.innerWidth, window.innerHeight);
//   renderer.setAnimationLoop(render);
//   document.body.appendChild(renderer.domElement);
  
//   // Enable VR
//   renderer.xr.enabled = true;
//   document.body.appendChild(VRButton.createButton(renderer));
  
//   // Add lights
//   const light = new THREE.AmbientLight(0xffffff, 0.5);
//   scene.add(light);
  
//   // Controllers for VR
//   controller1 = renderer.xr.getController(0);
//   controller2 = renderer.xr.getController(1);
//   scene.add(controller1);
//   scene.add(controller2);

//   // Load sabers, environment, etc.
//   loadSabers();
//   loadEnvironment();
// }

// function render(time, frame) {
//   // Update logic (notes movement, collision checks) here
//   renderer.render(scene, camera);
// }