import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.149.0/build/three.module.js';

const TWEEN = {
  Easing: {
    Quadratic: {
      InOut: (t: number) => {
        t *= 2;
        if (t < 1) return 0.5 * t * t;
        t--;
        return -0.5 * (t * (t - 2) - 1);
      }
    }
  },
  _tweens: [] as any[],
  update: function() {
    const now = Date.now();
    for (let i = this._tweens.length - 1; i >= 0; i--) {
      const tween = this._tweens[i];
      if (now >= tween.startTime + tween.duration) {
        tween.onUpdate({ t: 1 });
        this._tweens.splice(i, 1);
      } else {
        const progress = (now - tween.startTime) / tween.duration;
        tween.onUpdate({ t: this.Easing.Quadratic.InOut(progress) });
      }
    }
  },
  Tween: class {
    constructor(public obj: { t: number }) {}
    
    to(target: { t: number }, duration: number) {
      this.duration = duration;
      return this;
    }

    easing(easingFn: (t: number) => number) {
      return this;
    }

    onUpdate(fn: (obj: { t: number }) => void) {
      this.onUpdateFn = fn;
      return this;
    }

    start() {
      TWEEN._tweens.push({
        startTime: Date.now(),
        duration: this.duration,
        onUpdate: this.onUpdateFn
      });
      return this;
    }
  }
};

function cool() {
// Setup basic scene
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 200;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0x111111);
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create particle geometry
const PARTICLE_COUNT = 10000; // Adjust as needed
const positions = new Float32Array(PARTICLE_COUNT * 3);

// Create a material for points
const particleMaterial = new THREE.PointsMaterial({
  size: 2,
  color: 0xffffff
});

// Generate a random initial distribution (e.g., sphere)
function generateSpherePositions(array, radius = 50) {
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const phi = Math.acos((2 * Math.random()) - 1);
    const theta = 2 * Math.PI * Math.random();
    const x = radius * Math.sin(phi) * Math.cos(theta);
    const y = radius * Math.sin(phi) * Math.sin(theta);
    const z = radius * Math.cos(phi);
    array[i * 3] = x;
    array[i * 3 + 1] = y;
    array[i * 3 + 2] = z;
  }
}

generateSpherePositions(positions);

// Save the initial sphere positions
const startPositions = positions.slice();

// Create geometry and points object
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
const points = new THREE.Points(geometry, particleMaterial);
scene.add(points);

// Target image shape (this will require loading an image)
const img = new Image();
img.src = 'path_to_your_image.png'; // Make sure image is served
img.onload = () => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  // Resize canvas to image size
  canvas.width = img.width;
  canvas.height = img.height;
  ctx.drawImage(img, 0, 0);
  const imgData = ctx.getImageData(0, 0, img.width, img.height);
  const data = imgData.data;

  const imagePositions = [];
  // Extract pixel positions for opaque pixels
  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      const idx = (x + y * img.width) * 4;
      const r = data[idx];
      const g = data[idx + 1];
      const b = data[idx + 2];
      const a = data[idx + 3]; // Alpha
      // Consider pixel as part of shape if alpha > threshold
      if (a > 50) {
        // Map image coords to a roughly centered 3D space
        const fx = (x - img.width / 2);
        const fy = (img.height / 2 - y);
        const fz = 0; // Flat on the z=0 plane
        imagePositions.push(fx, fy, fz);
      }
    }
  }

  // Now we have imagePositions but it might not match our PARTICLE_COUNT.
  // We need to either reduce or increase the array to match PARTICLE_COUNT.
  // For simplicity, we'll just sample from imagePositions.
  const targetPositions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idx = (i % (imagePositions.length / 3)) * 3;
    targetPositions[i * 3] = imagePositions[idx];
    targetPositions[i * 3 + 1] = imagePositions[idx + 1];
    targetPositions[i * 3 + 2] = imagePositions[idx + 2];
  }

  // Animate from sphere positions to image positions
  const currentPositions = geometry.getAttribute('position').array;
  const startArray = new Float32Array(currentPositions);
  const endArray = targetPositions;

  new TWEEN.Tween({ t: 0 })
    .to({ t: 1 }, 3000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(({ t }) => {
      // Interpolate positions
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        currentPositions[i * 3] = startArray[i * 3] + (endArray[i * 3] - startArray[i * 3]) * t;
        currentPositions[i * 3 + 1] = startArray[i * 3 + 1] + (endArray[i * 3 + 1] - startArray[i * 3 + 1]) * t;
        currentPositions[i * 3 + 2] = startArray[i * 3 + 2] + (endArray[i * 3 + 2] - startArray[i * 3 + 2]) * t;
      }
      geometry.attributes.position.needsUpdate = true;
    })
    .start();
};

// Render loop
function animate() {
  requestAnimationFrame(animate);
  TWEEN.update();
  renderer.render(scene, camera);
}

animate();

// Optional: On click, morph back to sphere from image
document.addEventListener('click', () => {
  const currentPositions = geometry.getAttribute('position').array;
  const startArray = new Float32Array(currentPositions);
  const endArray = startPositions;

  new TWEEN.Tween({ t: 0 })
    .to({ t: 1 }, 3000)
    .easing(TWEEN.Easing.Quadratic.InOut)
    .onUpdate(({ t }) => {
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        currentPositions[i * 3] = startArray[i * 3] + (endArray[i * 3] - startArray[i * 3]) * t;
        currentPositions[i * 3 + 1] = startArray[i * 3 + 1] + (endArray[i * 3 + 1] - startArray[i * 3 + 1]) * t;
        currentPositions[i * 3 + 2] = startArray[i * 3 + 2] + (endArray[i * 3 + 2] - startArray[i * 3 + 2]) * t;
      }
      geometry.attributes.position.needsUpdate = true;
    })
    .start();
});
}

export default cool;