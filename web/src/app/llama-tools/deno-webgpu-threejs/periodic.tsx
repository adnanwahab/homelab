'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import TWEEN from 'three/addons/libs/tween.module.js';
import { TrackballControls } from 'three/addons/controls/TrackballControls.js';
import { CSS3DRenderer, CSS3DObject } from 'three/addons/renderers/CSS3DRenderer.js';

// Periodic table data - first few elements as example
const table = [
	'H', 'Hydrogen', '1.00794', 1, 1,
	'He', 'Helium', '4.002602', 18, 1,
	'Li', 'Lithium', '6.941', 1, 2,
	// ... add more elements as needed
];

export default function PeriodicTable() {
	const containerRef = useRef<HTMLDivElement>(null);
	const sceneRef = useRef<THREE.Scene>();
	const cameraRef = useRef<THREE.PerspectiveCamera>();
	const rendererRef = useRef<CSS3DRenderer>();
	const controlsRef = useRef<any>();
	const objectsRef = useRef<CSS3DObject[]>([]);
	const targetsRef = useRef({ table: [], sphere: [], helix: [], grid: [] });

	useEffect(() => {
		if (!containerRef.current) return;

		// Setup
		const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000);
		camera.position.z = 3000;
		cameraRef.current = camera;

		const scene = new THREE.Scene();
		sceneRef.current = scene;

		// Create elements
		for (let i = 0; i < table.length; i += 5) {
			const element = document.createElement('div');
			element.className = 'element';
			element.style.backgroundColor = `rgba(0,127,127,${Math.random() * 0.5 + 0.25})`;

			const symbol = document.createElement('div');
			symbol.className = 'symbol';
			symbol.textContent = table[i];
			element.appendChild(symbol);

			const details = document.createElement('div');
			details.className = 'details';
			details.innerHTML = `${table[i + 1]}<br>${table[i + 2]}`;
			element.appendChild(details);

			const objectCSS = new CSS3DObject(element);
			objectCSS.position.x = Math.random() * 4000 - 2000;
			objectCSS.position.y = Math.random() * 4000 - 2000;
			objectCSS.position.z = Math.random() * 4000 - 2000;
			scene.add(objectCSS);

			objectsRef.current.push(objectCSS);

			// Table layout
			const object = new THREE.Object3D();
			object.position.x = (table[i + 3] * 140) - 1330;
			object.position.y = -(table[i + 4] * 180) + 990;
			targetsRef.current.table.push(object);
		}

		// Renderer
		const renderer = new CSS3DRenderer();
		renderer.setSize(window.innerWidth, window.innerHeight);
		containerRef.current.appendChild(renderer.domElement);
		rendererRef.current = renderer;

		// Controls
		const controls = new TrackballControls(camera, renderer.domElement);
		controls.minDistance = 500;
		controls.maxDistance = 6000;
		controlsRef.current = controls;

		// Initial transform
		transform(targetsRef.current.table, 2000);

		// Cleanup
		return () => {
			controls.dispose();
			renderer.domElement.remove();
		};
	}, []);

	useEffect(() => {
		function animate() {
			requestAnimationFrame(animate);
			TWEEN.update();
			controlsRef.current?.update();
			rendererRef.current?.render(sceneRef.current!, cameraRef.current!);
		}

		animate();
	}, []);

	function transform(targets: THREE.Object3D[], duration: number) {
		TWEEN.removeAll();

		objectsRef.current.forEach((object, i) => {
			const target = targets[i];

			new TWEEN.Tween(object.position)
				.to({ x: target.position.x, y: target.position.y, z: target.position.z }, Math.random() * duration + duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.start();

			new TWEEN.Tween(object.rotation)
				.to({ x: target.rotation.x, y: target.rotation.y, z: target.rotation.z }, Math.random() * duration + duration)
				.easing(TWEEN.Easing.Exponential.InOut)
				.start();
		});
	}

	return (
		<div className="relative w-full h-screen">
			<div ref={containerRef} className="w-full h-full" />
			<style jsx>{`
				.element {
					width: 120px;
					height: 160px;
					box-shadow: 0px 0px 12px rgba(0,255,255,0.5);
					border: 1px solid rgba(127,255,255,0.25);
					text-align: center;
					cursor: default;
					position: relative;
				}
				.symbol {
					position: absolute;
					top: 40px;
					left: 0px;
					right: 0px;
					font-size: 60px;
					font-weight: bold;
					color: rgba(255,255,255,0.75);
					text-shadow: 0 0 10px rgba(0,255,255,0.95);
				}
				.details {
					position: absolute;
					bottom: 15px;
					left: 0px;
					right: 0px;
					font-size: 12px;
					color: rgba(127,255,255,0.75);
				}
			`}</style>
		</div>
	);
}
