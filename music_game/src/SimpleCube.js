import * as THREE from 'three';

const CANVAS_COUNT = 2;
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;

class MultiCubeRenderer {
    constructor() {
        this.container = document.createElement('div');
        this.container.style.display = 'flex';
        this.container.style.flexWrap = 'wrap';
        document.body.appendChild(this.container);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            75,
            CANVAS_WIDTH / CANVAS_HEIGHT,
            0.1,
            1000
        );
        this.camera.position.z = 2.5;

        // Create cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial();
        this.cube = new THREE.Mesh(geometry, material);
        this.scene.add(this.cube);

        // Create renderers
        this.renderers = [];
        this.setupRenderers();
        this.animate();
    }

    setupRenderers() {
        for (let i = 0; i < CANVAS_COUNT; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            this.container.appendChild(canvas);

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true
            });
            renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
            renderer.setClearColor(0x000000, 1);
            this.renderers.push(renderer);
        }
    }

    animate() {
        requestAnimationFrame(() => this.animate());

        this.cube.rotation.x += 0.01;
        this.cube.rotation.y += 0.01;

        this.renderers.forEach(renderer => {
            renderer.render(this.scene, this.camera);
        });
    }

    dispose() {
        this.renderers.forEach(renderer => renderer.dispose());
        this.cube.geometry.dispose();
        this.cube.material.dispose();
        document.body.removeChild(this.container);
    }
}

// Usage
//const app = new MultiCubeRenderer();

export default MultiCubeRenderer;

// To clean up later if needed:
// app.dispose();