// script.js
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/Addons.js';

import GUI from 'three/examples/jsm/libs/lil-gui.module.min.js';

let camera, scene, renderer;
let mesh;

function init() {

  // Create a PerspectiveCamera with an FOV of 70.
  camera = new THREE.PerspectiveCamera( 70, window.innerWidth / window.innerHeight, 0.1, 100 );
  // Set the camera back so it's position does not intersect with the center of the cube mesh
  camera.position.z = 2;

  scene = new THREE.Scene();

  // Access texture via the relative path to the texture's file.
  const texture = new THREE.TextureLoader().load( 'textures/crate.gif' );
  // Bring the texture into the correct color space.
  // Removing this line will make the texture seem desaturated or washed out.
  texture.colorSpace = THREE.SRGBColorSpace;

  // Apply a texture map to the material.
  const material = new THREE.MeshBasicMaterial( { map: texture } );

  // Define the geometry of our mesh.
  const geometry = new THREE.BoxGeometry(1, 1, 1);
 
  // Create a mesh with the specified geometry and material
  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );
  // Rotate the mesh slightly
  mesh.rotation.y += Math.PI / 4;

  // Create a renderer and set it's animation loop.
  renderer = new THREE.WebGPURenderer({ antialias: false })
  // Set the renderer's pixel ratio.
  renderer.setPixelRatio( window.devicePixelRatio );
  // Set size of the renderer to cover the full size of the window.
  renderer.setSize( window.innerWidth, window.innerHeight );
  // Tell renderer to run the 'animate' function per frame.
  renderer.setAnimationLoop( animate );
  document.body.appendChild( renderer.domElement );

  const controls = new OrbitControls( camera, renderer.domElement );
  // Distance is defined as distance away from origin in the z-direction.
  controls.minDistance = 1;
  controls.maxDistance = 20;

  // Define the application's behavior upon window resize.
  window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

  // Update the camera's aspect ratio and the renderer's size to reflect
  // the new screen dimensions upon a browser window resize.
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
  // Render one frame
  renderer.render( scene, camera );

}

init();