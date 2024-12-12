import Game from './Game.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import * as THREE from 'three';

// Instantiate the game



import jolt from './jolt.js';


const game = new Game();
jolt();


import game_music from './Game_music.js';
new game_music();
import initializeWebSocket from './websocket.js';
initializeWebSocket();