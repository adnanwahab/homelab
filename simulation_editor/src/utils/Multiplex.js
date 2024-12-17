import * as THREE from 'three';

const CANVAS_COUNT = 2;
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;

const renderHtml = function () {
    const html = `
       <div class="multiplex-views h-48 border-2 border-gray-300">
        <h1>Multiplex</h1>
        <div class="multiplex-canvas"></div>
    </div>
    
    
    
    
    
    <div class="editor-container h-48 border-2 border-gray-300">
    
    <div>
        <!-- <label for="comment" class="block text-sm/6 font-medium text-gray-900">Add your comment</label> -->
        <div class="mt-2">
          <textarea rows="4" name="comment" id="comment" class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"></textarea>
        </div>
      </div>
    <button id="send">Generate 3 possibilites</button>


    <button id="autocomplete">change styling of css to slate blue 300</button>

</div>`
const div = document.createElement('div')
div.innerHTML = html;
document.body.appendChild(div);

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

return div;
}

class MultiCubeRenderer {
    constructor(multiplex_canvas, count) {

        this.count = count;
        this.count = 5
        console.log(multiplex_canvas, 'multiplex_canvas');
        this.container = multiplex_canvas;
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
        for (let i = 0; i < this.count; i++) {
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

export default function Multiplex(multiplex_canvas) {

    const multiplex_container = renderHtml();
       const instance = {
        init: (count) => {
            count = count || 5;
            console.log('niggar');

            return new MultiCubeRenderer(multiplex_container, count);
        }
    }
    //instance.init(5);

    return instance;
}

// To clean up later if needed:
// app.dispose();
