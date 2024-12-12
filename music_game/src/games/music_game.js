import * as THREE from 'three';
import { dimensions } from '../utils/constants.js';

class GameMusic {
    constructor(canvas) {
        // Audio setup
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.setupAudio();

        // Three.js setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, dimensions.width / dimensions.height, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ canvas: canvas });
        this.renderer.setSize(dimensions.width, dimensions.height);
        //document.body.appendChild(this.renderer.domElement);

        // Create sphere
        this.sphere = new THREE.Mesh(
            new THREE.SphereGeometry(1, 32, 32),
            new THREE.MeshPhongMaterial({ color: 0x00ff00 })
        );
        this.sphere.position.y = 10;
        this.scene.add(this.sphere);

        // Create floor
        this.floor = new THREE.Mesh(
            new THREE.PlaneGeometry(20, 20),
            new THREE.MeshPhongMaterial({ color: 0x808080 })
        );
        this.floor.rotation.x = -Math.PI / 2;
        this.scene.add(this.floor);

        // Add lights
        const light = new THREE.PointLight(0xffffff, 1, 100);
        light.position.set(0, 10, 10);
        this.scene.add(light);
        this.scene.add(new THREE.AmbientLight(0x404040));

        // Set camera position
        this.camera.position.z = 15;
        this.camera.position.y = 5;
        this.camera.lookAt(0, 0, 0);

        // Physics variables
        this.velocity = 0;
        this.gravity = 0.098;
        this.damping = 0.8;
        this.isColliding = false;

        // Start animation
        this.animate();

        // Add resize event listener
        window.addEventListener('resize', this.handleResize.bind(this));
    }

    setupAudio() {
        // Create oscillator for bounce sound
        this.oscillator = this.audioContext.createOscillator();
        this.gainNode = this.audioContext.createGain();
        
        this.oscillator.connect(this.gainNode);
        this.gainNode.connect(this.audioContext.destination);
        
        this.oscillator.type = 'sine';
        this.oscillator.frequency.setValueAtTime(440, this.audioContext.currentTime);
        this.gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        this.oscillator.start();
    }

    playBounceSound() {
        const now = this.audioContext.currentTime;
        this.gainNode.gain.cancelScheduledValues(now);
        this.gainNode.gain.setValueAtTime(0.5, now);
        this.gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        this.gainNode.gain.setValueAtTime(0, now + 0.1);
    }

    animate() {
        requestAnimationFrame(this.animate.bind(this));

        // Apply gravity
        this.velocity += this.gravity;
        this.sphere.position.y -= this.velocity;

        // Check for collision with floor
        if (this.sphere.position.y <= 1 && !this.isColliding) {
            this.sphere.position.y = 1;
            this.velocity = -this.velocity * this.damping;
            this.isColliding = true;
            
            // Play sound only for significant bounces
            if (Math.abs(this.velocity) > 0.1) {
                this.playBounceSound();
            }
        } else if (this.sphere.position.y > 1) {
            this.isColliding = false;
        }

        this.renderer.render(this.scene, this.camera);
    }

    // Add window resize handler
    handleResize() {
        dimensions.width = window.innerWidth / 2;
        dimensions.height = window.innerHeight / 2;
        this.camera.aspect = dimensions.width / dimensions.height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(dimensions.width, dimensions.height);
    }
}

// Create and export instance
//const game = new GameMusic();
export default GameMusic;