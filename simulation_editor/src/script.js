// import observablehq_sim_editor from "./utils/observablehq_sim_editor.js";
// observablehq_sim_editor()
// import Game from "./games/mixed_mode.js";
// import GamePhysics from "./games/physics.js";
// import Multiplex from "./utils/Multiplex.js";
// import auto_debugger from "./utils/auto_debugger.ts";
// import initializeWebSocket from "./utils/websocket.js";
// import music_game from "./games/music_game.js";
// import wiki_game from "./utils/wiki-game.ts";
// import platformer from "./games/platformer.js";
// import { label as label_one } from "./games/platformer.js";

// import { label as label_two } from "./games/music_game.js";
// import { label as label_three } from "./games/physics.js";

import GamePhysics from "./games/physics.js";

//GamePhysics(document.querySelector('canvas'));

GamePhysics(
  document.querySelector("canvas"),
  [
    {
      type: "box",
      position: [0, 0, 0],
      size: [1, 1, 1],
    },
  ],
  function (add_object) {
    console.log("done");
    setInterval(() => {
      console.log("done");
      add_object();
    }, 1000);
    window.addEventListener("mousemove", add_object);
  },
);  


// // drawing(document.querySelector('.canvas-purple'));

// scienceLab(document.querySelector('.canvas-teal'));

//Multiplex(document.querySelector('.multiplex-canvas'));

//import games_collection from "./utils/games_collection.json";

//console.log(Games_collection);

//import games_list_view from "./utils/games_list_view.js";

//src/utils/games_list_view.js
//games_list_view();

// const gameContainer = document.getElementById('game-container');
// gameContainer.addEventListener('mouseenter', (e) => {
//     console.log(e.target.id);
// });

// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap';
// import * as THREE from 'three';
import cool from "./games/cool";
//document.body.innerHTML = "<h1>new</h1>";
//cool();
// collective consciousness - berekley 


// if (window.location.pathname === "/new") {
//   document.body.innerHTML = "<h1>new</h1>";
//   //cool();
// }
// else {
//   //utils
// auto_debugger();
// //initializeWebSocket();
// //games
// // const game = new Game(document.querySelector('.canvas-red'));
// // new game_music(document.querySelector('.canvas-blue'));


// document.getElementById("label-one").innerHTML = label_one;

// document.getElementById("label-two").innerHTML = label_two;


// document.getElementById("label-three").innerHTML = label_three;

// platformer(document.querySelector(".canvas-red"));
// new music_game(document.querySelector(".canvas-blue"));
// GamePhysics(
//   document.querySelector(".canvas-green"),
//   [
//     {
//       type: "box",
//       position: [0, 0, 0],
//       size: [1, 1, 1],
//     },
//   ],
//   function (add_object) {
//     console.log("done");
//     setInterval(() => {
//       console.log("done");
//       add_object();
//     }, 1000);
//     window.addEventListener("mousemove", add_object);
//   },
// );

// }

// // import * as THREE from 'three';
// // import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// // import { WebGPURenderer } from 'three/examples/jsm/renderers/webgpu/WebGPURenderer';

// // // Wrap everything in an IIFE to handle async initialization
// // (function() {
// //     async function init() {
// //         try {
// //             if (!navigator.gpu) {
// //                 throw new Error('WebGPU not supported');
// //             }

// //             const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
// //             camera.position.z = 2;

// //             const scene = new THREE.Scene();
            
// //             const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
// //             const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// //             const cube = new THREE.Mesh( geometry, material );
// //             scene.add( cube );

// //             const renderer = new WebGPURenderer({ antialias: true });
// //             try {
// //                 await renderer.init();
// //             } catch (error) {
// //                 throw new Error('Failed to initialize WebGPU renderer: ' + error.message);
// //             }

// //             renderer.setSize( window.innerWidth, window.innerHeight );
// //             document.body.appendChild( renderer.domElement );

// //             const controls = new OrbitControls( camera, renderer.domElement );

// //             window.addEventListener( 'resize', () => {
// //                 camera.aspect = window.innerWidth / window.innerHeight;
// //                 camera.updateProjectionMatrix();
// //                 renderer.setSize( window.innerWidth, window.innerHeight );
// //             });

// //             function animate() {
// //                 requestAnimationFrame( animate );
// //                 cube.rotation.x += 0.01;
// //                 cube.rotation.y += 0.01;
// //                 renderer.render( scene, camera );
// //             }

// //             animate();

// //         } catch (error) {
// //             showErrorMessage(error.message);
// //         }
// //     }

// //     init();
// // })();