import React, { useRef, useEffect } from 'react';
import { useParams } from 'react-router-dom';

//playgame

//import particles from './particles.ts';
//particles();

//import tsl_test from './tsl_test.ts';
///tsl_test();

import { loadGLTFModel } from "../utils/gltf-loader.js";
import { Clock } from "three";
import { initGraphics } from "../initGraphics.js";
import { onWindowResize as handleWindowResize } from "../onWindowResize.js";
import { initPhysics } from "../initPhysics.js";
import { renderLoop } from "../renderLoop.js";
import { setupExample } from "../setupExample.js";
import { handleUserInput } from "../utils/handleUserInput.js";
import initJolt from "../utils/jolt-physics.wasm-compat.js";
//import AudioVisualizer from "../utils/play_karaoke.js";
//import lyricDetector from './utils/lyricDetector.js';
import * as THREE from "three";
import editScene from "../utils/edit_scene.js";
//new AudioVisualizer();
//import tsl from 'three/tsl'
import { setupLighting } from "../lighting.js";
import { createBox } from "../createBox.js";
import { addToScene } from "../addToScene.js";
import { getThreeObjectForBody } from "../getThreeObjectForBody.js";

import initGenerateObject from "../mutateScene.ts";

// Function to load level data and create cuboids with Jolt physics
async function loadLevelCuboids(levelId, Jolt, bodyInterface, scene, dynamicObjects) {
    try {
        // Dynamically import the level JSON file
        const levelModule = await import(`../levels/${levelId}.json`);
        const levelData = levelModule.default || levelModule;
        console.log('Loaded level data:', levelData);
        
        // Extract objects from the first item in the array
        if (levelData && levelData.length > 0 && levelData[0].objects) {
            const objects = levelData[0].objects;
            
            // Create red material for cuboids
            const redMaterial = new THREE.MeshStandardMaterial({ 
                color: 0xff0000,
                metalness: 0.3,
                roughness: 0.7
            });
            
            // Collision layer for static platforms (same as walls/floor)
            const LAYER_NON_MOVING = 0;
            
            // Create a physics-enabled cuboid for each object
            objects.forEach((obj, index) => {
                if (obj.type === 'cuboid') {
                    // Convert size to half-extent for Jolt (half of each dimension)
                    const halfExtent = new Jolt.Vec3(
                        obj.size[0] / 2,
                        obj.size[1] / 2,
                        obj.size[2] / 2
                    );
                    
                    // Create position vector
                    const position = new Jolt.RVec3(
                        obj.position[0],
                        obj.position[1],
                        obj.position[2]
                    );
                    
                    // Create rotation quaternion
                    // If rotation is [0,0,0], use identity, otherwise create from Euler
                    let rotation;
                    if (obj.rotation[0] === 0 && obj.rotation[1] === 0 && obj.rotation[2] === 0) {
                        rotation = Jolt.Quat.prototype.sIdentity();
                    } else {
                        // Convert Euler angles (in radians) to quaternion
                        // Using Three.js to help with conversion
                        const euler = new THREE.Euler(
                            obj.rotation[0],
                            obj.rotation[1],
                            obj.rotation[2],
                            'XYZ'
                        );
                        const quat = new THREE.Quaternion();
                        quat.setFromEuler(euler);
                        rotation = new Jolt.Quat(
                            quat.x,
                            quat.y,
                            quat.z,
                            quat.w
                        );
                    }
                    
                    // Create static physics body (so player can jump on it)
                    const cuboidBody = createBox(
                        Jolt,
                        bodyInterface,
                        (body) => addToScene(
                            body, 
                            Jolt, 
                            bodyInterface, 
                            scene, 
                            dynamicObjects, 
                            getThreeObjectForBody, 
                            redMaterial
                        ),
                        position,
                        rotation,
                        halfExtent,
                        Jolt.EMotionType_Static, // Static so it doesn't move
                        LAYER_NON_MOVING
                    );
                    
                    console.log(`Created physics cuboid ${index + 1} at position:`, obj.position);
                }
            });
        }
    } catch (error) {
        console.error('Error loading level cuboids:', error);
    }
}

export default function Game() {
    const { game_id } = useParams();
    const containerRef = useRef(null);
    const canvasRef = useRef(null);
    const gameStateRef = useRef({
        renderer: null,
        scene: null,
        camera: null,
        controls: null,
        clock: null,
        inputState: null,
        onExampleUpdateRef: null,
        joltInterface: null,
        physicsSystem: null,
        bodyInterface: null,
        dynamicObjects: null,
        Jolt: null,
        generateObject: null,
        cleanup: null
    });

    useEffect(() => {
        if (!containerRef.current || !canvasRef.current) return;

        const container = containerRef.current;
        const canvas = canvasRef.current;
        
        const size = { width: window.innerWidth * 0.9, height: window.innerHeight * 0.9 };
        
        // Initialize graphics
        const { renderer, scene, camera, controls } = initGraphics(
            canvas,
            container,
            size,
        );

        setupLighting(scene);

        const inputState = {
            forwardPressed: false,
            backwardPressed: false,
            leftPressed: false,
            rightPressed: false,
            jump: false,
            crouched: false,
        };
        const clock = new Clock();
        const onExampleUpdateRef = { fn: null };

        // Store in ref for cleanup
        gameStateRef.current.renderer = renderer;
        gameStateRef.current.scene = scene;
        gameStateRef.current.camera = camera;
        gameStateRef.current.controls = controls;
        gameStateRef.current.clock = clock;
        gameStateRef.current.inputState = inputState;
        gameStateRef.current.onExampleUpdateRef = onExampleUpdateRef;

        let cleanupFunctions = [];
        let isMounted = true;

        // Set up window resize handler
        const handleResize = () => {
            if (!isMounted || !renderer || !camera) return;
            const newSize = { 
                width: window.innerWidth * 0.9, 
                height: window.innerHeight * 0.9 
            };
            handleWindowResize(newSize, camera, renderer);
        };
        window.addEventListener('resize', handleResize);
        cleanupFunctions.push(() => {
            window.removeEventListener('resize', handleResize);
        });

        initJolt().then(async (Jolt) => {
            // Check if component is still mounted
            if (!isMounted) return;

            await renderer.init();
            const { joltInterface, physicsSystem, bodyInterface } = initPhysics(Jolt);
            
            // Check again after async operations
            if (!isMounted) return;
            
            // Store physics objects
            gameStateRef.current.joltInterface = joltInterface;
            gameStateRef.current.physicsSystem = physicsSystem;
            gameStateRef.current.bodyInterface = bodyInterface;
            gameStateRef.current.Jolt = Jolt;

            // Collect dynamic objects in array
            const dynamicObjects = [];
            gameStateRef.current.dynamicObjects = dynamicObjects;

            // Set up your environment, spawn character, define onExampleUpdate
            setupExample(
                Jolt,
                bodyInterface,
                scene,
                dynamicObjects,
                onExampleUpdateRef,
                game_id
            );
            //editScene(scene);

            // Load level data and create cuboids with physics
            loadLevelCuboids(
                game_id, 
                Jolt, 
                bodyInterface, 
                scene, 
                dynamicObjects
            ).catch((error) => {
                console.error('Error loading level cuboids:', error);
            });

            // Prepare user input
            handleUserInput(inputState);

            // Provide a custom update function that calls the function from onExampleUpdateRef
            function onExampleUpdate(time, deltaTime) {
                // If setupExample assigned a function, call it
                if (onExampleUpdateRef.fn) {
                    onExampleUpdateRef.fn(time, deltaTime, inputState);
                }
            }

            const generateObject = initGenerateObject(Jolt, physicsSystem, scene);
            gameStateRef.current.generateObject = generateObject;

            // Add button event listener if it exists
            const addObjectsButton = document.getElementById('add-objects');
            if (addObjectsButton) {
                const handleClick = () => {
                    generateObject();
                };
                addObjectsButton.addEventListener('click', handleClick);
                cleanupFunctions.push(() => {
                    addObjectsButton.removeEventListener('click', handleClick);
                });
            }

            // Start render loop
            renderLoop(
                clock,
                onExampleUpdate,
                renderer,
                scene,
                camera,
                joltInterface,
                dynamicObjects,
                Jolt,
                controls,
                {},
            );
        }).catch((error) => {
            console.error('Error initializing game:', error);
        });

        // Cleanup on unmount
        return () => {
            isMounted = false;
            cleanupFunctions.forEach(fn => fn());
            
            // Cleanup renderer if it exists
            const renderer = gameStateRef.current.renderer;
            if (renderer && typeof renderer.dispose === 'function') {
                try {
                    renderer.dispose();
                } catch (error) {
                    console.error('Error disposing renderer:', error);
                }
            }
            
            // Clear refs
            gameStateRef.current.renderer = null;
            gameStateRef.current.scene = null;
            gameStateRef.current.camera = null;
            gameStateRef.current.controls = null;
        };
    }, [game_id]); // Re-initialize if game_id changes

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ 
                marginBottom: '20px',
                borderBottom: '2px solid #e5e7eb',
                paddingBottom: '10px'
            }}>
                <h1 style={{ 
                    margin: 0,
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: 'white'
                }}>
                    Level {game_id}
                </h1>
            </div>
            <div 
                ref={containerRef} 
                id="container"
                style={{ width: '100%', height: '90vh' }}
            >
                <canvas ref={canvasRef} id="canvas"></canvas>
            </div>
        </div>
    );
}

