import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Scene setup
const scene = new THREE.Scene();
scene.background = new THREE.Color('#87CEEB'); // Sky blue background

// Camera setup
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 10, 15);

// Renderer setup
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;

// Ground plane (plaza floor)
const plazaGeometry = new THREE.PlaneGeometry(30, 30);
const plazaMaterial = new THREE.MeshStandardMaterial({ 
    color: 0xFFA500,  // Orange color for the plaza
    roughness: 0.8
});
const plaza = new THREE.Mesh(plazaGeometry, plazaMaterial);
plaza.rotation.x = -Math.PI / 2;
plaza.receiveShadow = true;
scene.add(plaza);

// Helper function to create buildings
function createBuilding(width, height, depth, color, position) {
    const geometry = new THREE.BoxGeometry(width, height, depth);
    const material = new THREE.MeshStandardMaterial({ color: color });
    const building = new THREE.Mesh(geometry, material);
    building.position.set(position.x, position.y + height/2, position.z);
    building.castShadow = true;
    building.receiveShadow = true;
    return building;
}

// Create buildings
const buildings = [
    // Coffee Shop
    createBuilding(5, 6, 4, 0x8B4513, { x: -10, y: 0, z: -5 }),
    // Dance Club
    createBuilding(6, 7, 5, 0xFFD700, { x: 0, y: 0, z: -6 }),
    // Clothes Shop
    createBuilding(5, 6, 4, 0xFF69B4, { x: 10, y: 0, z: -5 })
];

buildings.forEach(building => scene.add(building));

// Add roofs (simple pyramids)
buildings.forEach(building => {
    const roofGeometry = new THREE.ConeGeometry(
        Math.max(building.geometry.parameters.width, building.geometry.parameters.depth) * 0.7,
        2,
        4
    );
    const roofMaterial = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const roof = new THREE.Mesh(roofGeometry, roofMaterial);
    roof.position.set(
        building.position.x,
        building.position.y + building.geometry.parameters.height/2 + 1,
        building.position.z
    );
    roof.castShadow = true;
    scene.add(roof);
});

// Lighting
const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.8);
directionalLight.position.set(10, 20, 10);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Snow particles
const snowGeometry = new THREE.BufferGeometry();
const snowCount = 1000;
const positions = new Float32Array(snowCount * 3);

for(let i = 0; i < snowCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 40;
    positions[i + 1] = Math.random() * 20;
    positions[i + 2] = (Math.random() - 0.5) * 40;
}

snowGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const snowMaterial = new THREE.PointsMaterial({
    color: 0xFFFFFF,
    size: 0.1,
    transparent: true,
    opacity: 0.8
});

const snow = new THREE.Points(snowGeometry, snowMaterial);
scene.add(snow);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Animate snow falling
    const positions = snow.geometry.attributes.position.array;
    for(let i = 0; i < positions.length; i += 3) {
        positions[i + 1] -= 0.02;
        if(positions[i + 1] < 0) positions[i + 1] = 20;
    }
    snow.geometry.attributes.position.needsUpdate = true;
    
    controls.update();
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();