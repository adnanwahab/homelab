import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
//wiki editable dynamicland - jason rubin

const template = `
<div class="point point-0">
    <div class="label">1</div>
    <div class="text">Front and top screen with HUD aggregating terrain and battle informations.</div>
</div>
`
class Game {
    constructor(canvas) {
        document.body.insertAdjacentHTML('beforeend', template);
        this.scene = new THREE.Scene();
        this.canvas = canvas
        this.sizes = {
            width: window.innerWidth / 3,
            height: window.innerHeight / 3
        };

        this.setLoadingManager();
        this.setRenderer();
        this.setCamera();
        this.setControls();
        this.setLights();
        this.setEnvironmentMap();
        this.addObjects();
        this.tick();
    }

    setLoadingManager() {
        const loadingBarElement = document.querySelector('.loading-bar');
        const overlayGeometry = new THREE.PlaneGeometry(2, 2, 1, 1);
        this.overlayMaterial = new THREE.ShaderMaterial({
            transparent: true,
            uniforms: {
                uAlpha: { value: 1 }
            },
            vertexShader: `
                void main() {
                    gl_Position = vec4(position, 1.0);
                }
            `,
            fragmentShader: `
                uniform float uAlpha;

                void main() {
                    gl_FragColor = vec4(0.0, 0.0, 0.0, uAlpha);
                }
            `
        });
        const overlay = new THREE.Mesh(overlayGeometry, this.overlayMaterial);
        this.scene.add(overlay);

        this.sceneReady = false;
        const loadingManager = new THREE.LoadingManager(
            // Loaded
            () => {
                window.setTimeout(() => {
                    // Animate overlay
                    gsap.to(this.overlayMaterial.uniforms.uAlpha, { duration: 3, value: 0, delay: 1 });
                    // Update loadingBarElement
                    loadingBarElement.classList.add('ended');
                    loadingBarElement.style.transform = '';
                }, 500);

                window.setTimeout(() => {
                    this.sceneReady = true;
                }, 2000);
            },
            // Progress
            (itemUrl, itemsLoaded, itemsTotal) => {
                // Calculate the progress and update the loadingBarElement
                const progressRatio = itemsLoaded / itemsTotal;
                //console.log(progressRatio);
                //loadingBarElement.style.transform = `scaleX(${progressRatio})`;
            }
        );

        this.gltfLoader = new GLTFLoader(loadingManager);
        this.cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.toneMapping = THREE.ReinhardToneMapping;
        this.renderer.toneMappingExposure = 3;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    }

    setCamera() {
        this.camera = new THREE.PerspectiveCamera(
            75,
            this.sizes.width / this.sizes.height,
            0.1,
            100
        );
        this.camera.position.set(4, 1, -4);
        this.scene.add(this.camera);
    }

    setControls() {
        this.controls = new OrbitControls(this.camera, this.canvas);
        this.controls.enableDamping = true;
    }

    setLights() {
        const directionalLight = new THREE.DirectionalLight('#ffffff', 3);
        directionalLight.castShadow = true;
        directionalLight.shadow.camera.far = 15;
        directionalLight.shadow.mapSize.set(1024, 1024);
        directionalLight.shadow.normalBias = 0.05;
        directionalLight.position.set(0.25, 3, -2.25);
        this.scene.add(directionalLight);
    }

    setEnvironmentMap() {
        const environmentMap = this.cubeTextureLoader.load([
            '/textures/environmentMaps/0/px.jpg',
            '/textures/environmentMaps/0/nx.jpg',
            '/textures/environmentMaps/0/py.jpg',
            '/textures/environmentMaps/0/ny.jpg',
            '/textures/environmentMaps/0/pz.jpg',
            '/textures/environmentMaps/0/nz.jpg'
        ]);
        environmentMap.colorSpace = THREE.SRGBColorSpace;

        this.environmentMap = environmentMap;
    }

    addObjects() {
        // Cube
        const cubeGeometry = new THREE.BoxGeometry(1, 1, 1);
        const cubeMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(cubeGeometry, cubeMaterial);
        cube.position.set(0, 0, 0);
        cube.castShadow = true;
        cube.receiveShadow = true;
        this.scene.add(cube);

        // Models
        // Uncomment to load models
        this.gltfLoader.load(
            '/models/DamagedHelmet/glTF/DamagedHelmet.gltf',
            (gltf) => {
                gltf.scene.scale.set(2.5, 2.5, 2.5);
                gltf.scene.rotation.y = Math.PI * 0.5;
                this.scene.add(gltf.scene);
                this.updateAllMaterials();
            }
        );

        // Points of Interest
        this.raycaster = new THREE.Raycaster();
        this.points = [
            {
                position: new THREE.Vector3(1.55, 0.3, -0.6),
                element: document.querySelector('.point-0')
            },
            {
                position: new THREE.Vector3(0.5, 0.8, -1.6),
                element: document.querySelector('.point-1')
            },
            {
                position: new THREE.Vector3(1.6, -1.3, -0.7),
                element: document.querySelector('.point-2')
            }
        ];
    }

    updateAllMaterials() {
        this.scene.traverse((child) => {
            if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
                // child.material.envMap = this.environmentMap;
                child.material.envMapIntensity = 2.5;
                child.material.needsUpdate = true;
                child.castShadow = true;
                child.receiveShadow = true;
            }
        });
    }



    tick() {
        const animate = () => {
            // Update controls
            this.controls.update();

            // Update points only when the scene is ready
            if (this.sceneReady) {
                // Go through each point
                for (const point of this.points) {
                    // Get 2D screen position
                    const screenPosition = point.position.clone();
                    screenPosition.project(this.camera);

                    // Set the raycaster
                    this.raycaster.setFromCamera(screenPosition, this.camera);
                    const intersects = this.raycaster.intersectObjects(this.scene.children, true);

                    // No intersect found
                    if (intersects.length === 0) {
                        // Show
                        point.element.classList.add('visible');
                    } else {
                        // Get the distance of the intersection and the distance of the point
                        const intersectionDistance = intersects[0].distance;
                        const pointDistance = point.position.distanceTo(this.camera.position);

                        // Intersection is closer than the point
                        if (intersectionDistance < pointDistance) {
                            // Hide
                            point.element.classList.remove('visible');
                        } else {
                            // Show
                            point.element.classList.add('visible');
                        }
                    }

                    const translateX = screenPosition.x * this.sizes.width * 0.5;
                    const translateY = -screenPosition.y * this.sizes.height * 0.5;
                    point.element.style.transform = `translateX(${translateX}px) translateY(${translateY}px)`;
                }
            }

            // Render
            this.renderer.render(this.scene, this.camera);

            // Call tick again on the next frame
            window.requestAnimationFrame(animate);
        };

        animate();
    }
}

export default Game; 