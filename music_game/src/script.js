// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap';
// import * as THREE from 'three';

import MultiCubeRenderer from './SimpleCube.js';
import auto_debugger from './utils/auto_debugger.ts';
import Game from './Game.js';
import GamePhysics from './jolt.js';
import initializeWebSocket from './utils/websocket.js';
import game_music from './Game_music.js';


//utils 
auto_debugger();
initializeWebSocket();


//games
//const app = new MultiCubeRenderer();

const game = new Game(document.querySelector('.canvas-red'));
new game_music(document.querySelector('.canvas-blue'));
GamePhysics(document.querySelector('.canvas-green'));