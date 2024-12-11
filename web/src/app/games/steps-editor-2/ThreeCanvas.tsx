export default function () {
  return <>hi</>;
}
// import { useEffect, useRef } from 'react';
// import * as THREE from 'three';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// // Mock physics implementation
// const MockPhysics = () => ({
// 	addScene: () => {},
// 	setMeshPosition: (mesh: THREE.InstancedMesh, position: THREE.Vector3, index: number) => {
// 		const matrix = new THREE.Matrix4();
// 		matrix.setPosition(position);
// 		mesh.setMatrixAt(index, matrix);
// 		mesh.instanceMatrix.needsUpdate = true;
// 	}
// });

// export function ThreeCanvas() {
// 	const canvasRef = useRef<HTMLDivElement>(null);

// 	useEffect(() => {
// 		if (!canvasRef.current) return;

// 		let camera: THREE.PerspectiveCamera;
// 		let scene: THREE.Scene;
// 		let renderer: THREE.WebGLRenderer;
// 		let physics: any;
// 		let position: THREE.Vector3;
// 		let boxes: THREE.InstancedMesh;

// 		async function init() {
// 			// Use mock physics instead of JoltPhysics
// 			physics = MockPhysics();
// 			position = new THREE.Vector3();

// 			camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 100);
// 			camera.position.set(-1, 1.5, 2);
// 			camera.lookAt(0, 0.5, 0);

// 			scene = new THREE.Scene();
// 			scene.background = new THREE.Color(0x666666);

// 			// Basic lighting
// 			const hemiLight = new THREE.HemisphereLight();
// 			scene.add(hemiLight);

// 			const dirLight = new THREE.DirectionalLight(0xffffff, 3);
// 			dirLight.position.set(5, 5, 5);
// 			scene.add(dirLight);

// 			// Floor
// 			const floor = new THREE.Mesh(
// 				new THREE.BoxGeometry(10, 5, 10),
// 				new THREE.ShadowMaterial({ color: 0x444444})
// 			);
// 			floor.position.y = -2.5;
// 			scene.add(floor);

// 			// Only boxes (removed spheres for simplicity)
// 			const material = new THREE.MeshLambertMaterial();
// 			const matrix = new THREE.Matrix4();
// 			const color = new THREE.Color();

// 			const geometryBox = new THREE.BoxGeometry(0.075, 0.075, 0.075);
// 			boxes = new THREE.InstancedMesh(geometryBox, material, 200); // Reduced count
// 			boxes.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
// 			scene.add(boxes);

// 			for (let i = 0; i < boxes.count; i++) {
// 				matrix.setPosition(Math.random() - 0.5, Math.random() * 2, Math.random() - 0.5);
// 				boxes.setMatrixAt(i, matrix);
// 				boxes.setColorAt(i, color.setHex(0xffffff * Math.random()));
// 			}

// 			physics.addScene(scene);

// 			renderer = new THREE.WebGLRenderer({antialias: true, canvas: canvasRef.current});
// 			renderer.setSize(window.innerWidth, window.innerHeight);
// 			//canvasRef.current.appendChild(renderer.domElement);

// 			const controls = new OrbitControls(camera, renderer.domElement);
// 			controls.target.y = 0.5;
// 			controls.update();

// 			// Simplified animation interval
// 			const intervalId = setInterval(() => {
// 				const index = Math.floor(Math.random() * boxes.count);
// 				position.set(0, Math.random() + 1, 0);
// 				physics.setMeshPosition(boxes, position, index);
// 			}, 1000 / 60);

// 			function animate() {
// 				requestAnimationFrame(animate);
// 				renderer.render(scene, camera);
// 			}

// 			animate();

// 			return () => {
// 				clearInterval(intervalId);
// 				renderer.dispose();
// 				canvasRef.current?.removeChild(renderer.domElement);
// 			};
// 		}

// 		init();
// 	}, []);

// 	return <>

//     <h1>ThreeCanvas</h1>
//     <canvas id="canvas" ref={canvasRef}></canvas>
//     </>;
// }
