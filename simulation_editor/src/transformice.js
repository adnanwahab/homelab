// Import Three.js in your HTML file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x87CEEB); // Light blue sky
document.body.appendChild(renderer.domElement);

// Create the branch/platform
const branchGeometry = new THREE.CylinderGeometry(0.2, 0.2, 20, 32);
const branchMaterial = new THREE.MeshPhongMaterial({ color: 0x8B4513 });
const branch = new THREE.Mesh(branchGeometry, branchMaterial);
branch.rotation.z = Math.PI / 12; // Slight upward angle
scene.add(branch);

// Function to create a hamster
function createHamster(position) {
    const group = new THREE.Group();
    
    // Body
    const bodyGeometry = new THREE.SphereGeometry(0.5, 32, 32);
    const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xBB8855 });
    const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
    group.add(body);
    
    // Head
    const headGeometry = new THREE.SphereGeometry(0.3, 32, 32);
    const head = new THREE.Mesh(headGeometry, bodyMaterial);
    head.position.x = 0.4;
    head.position.y = 0.2;
    group.add(head);
    
    // Ears
    const earGeometry = new THREE.CircleGeometry(0.15, 32);
    const ear1 = new THREE.Mesh(earGeometry, bodyMaterial);
    const ear2 = new THREE.Mesh(earGeometry, bodyMaterial);
    ear1.position.set(0.4, 0.5, 0.1);
    ear2.position.set(0.4, 0.5, -0.1);
    group.add(ear1, ear2);
    
    group.position.copy(position);
    return group;
}

// Add multiple hamsters along the branch
const hamsterPositions = [
    new THREE.Vector3(-8, 0, 0),
    new THREE.Vector3(-6, 0.5, 0),
    new THREE.Vector3(-4, 1, 0),
    new THREE.Vector3(-2, 1.5, 0),
    new THREE.Vector3(0, 2, 0),
    new THREE.Vector3(2, 2.5, 0),
    new THREE.Vector3(4, 3, 0),
    new THREE.Vector3(6, 3.5, 0),
];

hamsterPositions.forEach(position => {
    const hamster = createHamster(position);
    scene.add(hamster);
});

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(5, 5, 5);
scene.add(directionalLight);

// Position camera
camera.position.z = 15;
camera.position.y = 2;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Add subtle movement to hamsters
    scene.children.forEach(child => {
        if (child instanceof THREE.Group) {
            child.rotation.y += 0.01;
        }
    });
    
    renderer.render(scene, camera);
}

// Handle window resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

animate();