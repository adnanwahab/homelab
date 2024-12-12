// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap';
// import * as THREE from 'three';
import Game from './games/mixed_mode.js';
import GamePhysics from './games/physics.js';
import Multiplex from './utils/Multiplex.js';
import auto_debugger from './utils/auto_debugger.ts';
import initializeWebSocket from './utils/websocket.js';
import music_game from './games/music_game.js';
import wiki_game from './utils/wiki-game.ts';
import platformer from './games/platformer.js';

//utils 
auto_debugger();
//initializeWebSocket();
//games
// const game = new Game(document.querySelector('.canvas-red'));
// new game_music(document.querySelector('.canvas-blue'));

new music_game(document.querySelector('.canvas-blue'));
GamePhysics(document.querySelector('.canvas-green'));
platformer(document.querySelector('.canvas-red'));

// drawing(document.querySelector('.canvas-purple'));

// scienceLab(document.querySelector('.canvas-teal'));

//Multiplex(document.querySelector('.multiplex-canvas'));


import Games_collection from './utils/games_collection.json';

//console.log(Games_collection);


import games_list_view from './utils/games_list_view.js';

//src/utils/games_list_view.js
//games_list_view();

// const gameContainer = document.getElementById('game-container');
// gameContainer.addEventListener('mouseenter', (e) => {
//     console.log(e.target.id);
// });
