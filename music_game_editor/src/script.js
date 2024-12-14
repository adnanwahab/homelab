import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { WebGPURenderer } from 'three/examples/jsm/renderers/webgpu/WebGPURenderer';

// Wrap everything in an IIFE to handle async initialization
(function() {
    async function init() {
        try {
            if (!navigator.gpu) {
                throw new Error('WebGPU not supported');
            }

            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
            camera.position.z = 2;

            const scene = new THREE.Scene();
            
            const geometry = new THREE.BoxGeometry( 0.5, 0.5, 0.5 );
            const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
            const cube = new THREE.Mesh( geometry, material );
            scene.add( cube );

            const renderer = new WebGPURenderer({ antialias: true });
            try {
                await renderer.init();
            } catch (error) {
                throw new Error('Failed to initialize WebGPU renderer: ' + error.message);
            }

            renderer.setSize( window.innerWidth, window.innerHeight );
            document.body.appendChild( renderer.domElement );

            const controls = new OrbitControls( camera, renderer.domElement );

            window.addEventListener( 'resize', () => {
                camera.aspect = window.innerWidth / window.innerHeight;
                camera.updateProjectionMatrix();
                renderer.setSize( window.innerWidth, window.innerHeight );
            });

            function animate() {
                requestAnimationFrame( animate );
                cube.rotation.x += 0.01;
                cube.rotation.y += 0.01;
                renderer.render( scene, camera );
            }

            animate();

        } catch (error) {
            showErrorMessage(error.message);
        }
    }

    init();
})();