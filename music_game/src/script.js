// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap';
// import * as THREE from 'three';
import MultiCubeRenderer from './games/Multiplex.js';
import Game from './games/mixed_mode.js';
import GamePhysics from './games/physics.js';


import auto_debugger from './utils/auto_debugger.ts';
import initializeWebSocket from './utils/websocket.js';
import game_music from './Game_music.js';
//utils 
auto_debugger();
//initializeWebSocket();
//games
//const app = new MultiCubeRenderer();
const game = new Game(document.querySelector('.canvas-red'));
new game_music(document.querySelector('.canvas-blue'));
GamePhysics(document.querySelector('.canvas-green'));