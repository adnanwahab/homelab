'use client'
import { useRef, useEffect, useState } from 'react';
import * as THREE from 'three';

export default function Platformer() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // Store game state in refs since we don't need to trigger re-renders
    const gameRef = useRef({
        scene: new THREE.Scene(),
        player: null as THREE.Mesh | null,
        platform: null as THREE.Mesh | null,
        velocity: 0,
        gravity: 0.5,
        jumpForce: -15,
        grounded: false,
        keys: {} as { [key: string]: boolean }
    });

    useEffect(() => {
        if (!canvasRef.current) return;
        
        const game = gameRef.current;
        const camera = new THREE.PerspectiveCamera(
            75,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );
        
        const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current });
        renderer.setSize(window.innerWidth, window.innerHeight);
        camera.position.z = 500;

        // Player setup
        const playerGeometry = new THREE.BoxGeometry(50, 50, 1);
        const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        game.player = new THREE.Mesh(playerGeometry, playerMaterial);
        game.scene.add(game.player);

        // Platform setup
        const platformGeometry = new THREE.BoxGeometry(200, 20, 1);
        const platformMaterial = new THREE.MeshBasicMaterial({ color: 0x808080 });
        game.platform = new THREE.Mesh(platformGeometry, platformMaterial);
        game.platform.position.y = -100;
        game.scene.add(game.platform);

        // Event listeners
        const handleKeyDown = (e: KeyboardEvent) => game.keys[e.code] = true;
        const handleKeyUp = (e: KeyboardEvent) => game.keys[e.code] = false;
        
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };
        
        window.addEventListener('resize', handleResize);

        // Game update logic
        function update() {
            if (!game.player || !game.platform) return;

            // Horizontal movement
            if (game.keys['ArrowLeft']) {
                game.player.position.x -= 5;
            }
            if (game.keys['ArrowRight']) {
                game.player.position.x += 5;
            }

            // Apply gravity
            game.velocity += game.gravity;
            game.player.position.y -= game.velocity;

            // Platform collision
            if (game.player.position.y - 25 < game.platform.position.y + 10 &&
                game.player.position.y + 25 > game.platform.position.y - 10 &&
                game.player.position.x + 25 > game.platform.position.x - 100 &&
                game.player.position.x - 25 < game.platform.position.x + 100) {
                game.player.position.y = game.platform.position.y + 35;
                game.velocity = 0;
                game.grounded = true;
            } else {
                game.grounded = false;
            }

            // Jump
            if (game.keys['Space'] && game.grounded) {
                game.velocity = game.jumpForce;
                game.grounded = false;
            }
        }

        // Animation loop
        function animate() {
            requestAnimationFrame(animate);
            update();
            renderer.render(game.scene, camera);
        }

        animate();

        // Cleanup
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return <canvas ref={canvasRef}

style={{ width: '50%', height: '50%' }}
className="webgl border border-gray-200" />;
}

            