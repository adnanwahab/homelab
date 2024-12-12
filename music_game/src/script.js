// import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
// import gsap from 'gsap';
// import * as THREE from 'three';
import Game from './games/mixed_mode.js';
import GamePhysics from './games/physics.js';

import Multiplex from './utils/Multiplex.js';
import auto_debugger from './utils/auto_debugger.ts';
import initializeWebSocket from './utils/websocket.js';
import game_music from './Game_music.js';
import wiki_game from './utils/wiki-game.ts';
//utils 
auto_debugger();
//initializeWebSocket();
//games
// const game = new Game(document.querySelector('.canvas-red'));
// new game_music(document.querySelector('.canvas-blue'));
// GamePhysics(document.querySelector('.canvas-green'));



    const inputElement = document.querySelector('textarea');
    
    if (!inputElement) {
        console.error('Input element not found');
    }

    inputElement.addEventListener('input', (e) => {
        console.log('Input value:', e.target.value);
        const multiplexCanvas = document.querySelector('.multiplex-canvas');
        console.log(multiplexCanvas);
        // if (!multiplexCanvas) {
        //     console.error('Multiplex canvas not found');
        //     return;
        // }

        const app = Multiplex(multiplexCanvas);
        app.init(e.target.value);
    });
    console.log(inputElement);

