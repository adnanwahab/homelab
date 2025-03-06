'use client'

import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
	varying vec2 vUv;
	void main() {
		vUv = uv;
		gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
	}
`

const fragmentShader = `
	precision highp float;
	uniform float time;
	uniform vec2 resolution;
	uniform vec4 mouse;
	varying vec2 vUv;

	float gTime = 0.;
	const float REPEAT = 5.0;

	mat2 rot(float a) {
		float c = cos(a), s = sin(a);
		return mat2(c,s,-s,c);
	}

	float sdBox( vec3 p, vec3 b ) {
		vec3 q = abs(p) - b;
		return length(max(q,0.0)) + min(max(q.x,max(q.y,q.z)),0.0);
	}

	float box(vec3 pos, float scale) {
		pos *= scale;
		float base = sdBox(pos, vec3(.4,.4,.1)) /1.5;
		pos.xy *= 5.;
		pos.y -= 3.5;
		pos.xy *= rot(.75);
		float result = -base;
		return result;
	}

	float box_set(vec3 pos, float time) {
		vec3 pos_origin = pos;
		pos = pos_origin;
		pos .y += sin(gTime * 0.4) * 2.5;
		pos.xy *=   rot(.8);
		float box1 = box(pos,2. - abs(sin(gTime * 0.4)) * 1.5);
		return box1;
	}

	float map(vec3 pos, float time) {
		vec3 pos_origin = pos;
		float box_set1 = box_set(pos, time);
		return box_set1;
	}

	void main() {
		gTime = time;
		vec2 fragCoord = gl_FragCoord.xy;
		vec2 p = (fragCoord.xy * 2. - resolution.xy) / min(resolution.x, resolution.y);
		vec3 ro = vec3(0., -0.2, time * 4.);
		vec3 ray = normalize(vec3(p, 1.5));
		ray.xy = ray.xy * rot(sin(time * .03) * 5.);
		ray.yz = ray.yz * rot(sin(time * .05) * .2);
		
		// Ray marching
		float t = 0.0;
		vec3 col = vec3(0.0);
		
		// Simple color based on ray direction
		col = vec3(0.5) + 0.5 * ray;
		
		gl_FragColor = vec4(col, 1.0 - t * (0.02 + 0.02 * sin(time)));
	}
`

export default function Demo11() {
	const containerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (!containerRef.current) return

		// THREE.js setup
		const scene = new THREE.Scene()
		const camera = new THREE.PerspectiveCamera(
			75,
			window.innerWidth / window.innerHeight,
			0.1,
			1000
		)
		camera.position.z = 100
		camera.lookAt(scene.position)

		const renderer = new THREE.WebGLRenderer()
		renderer.setClearColor(0xc4c4c4)
		renderer.setSize(window.innerWidth, window.innerHeight)
		containerRef.current.appendChild(renderer.domElement)

		const clock = new THREE.Clock()

		const uniforms = {
			time: { value: 0.1 },
			resolution: { value: new THREE.Vector2() },
			mouse: { value: new THREE.Vector4() }
		}

		// Mouse events
		const handleMouseDown = (e: MouseEvent) => {
			const canvas = renderer.domElement
			const rect = canvas.getBoundingClientRect()
			uniforms.mouse.value.x = (e.clientX - rect.left) / window.innerWidth * 2 - 1
			uniforms.mouse.value.y = (e.clientY - rect.top) / window.innerHeight * -2 + 1
		}

		const handleMouseUp = (e: MouseEvent) => {
			const canvas = renderer.domElement
			const rect = canvas.getBoundingClientRect()
			uniforms.mouse.value.z = (e.clientX - rect.left) / window.innerWidth * 2 - 1
			uniforms.mouse.value.w = (e.clientY - rect.top) / window.innerHeight * -2 + 1
		}

		renderer.domElement.addEventListener('mousedown', handleMouseDown)
		renderer.domElement.addEventListener('mouseup', handleMouseUp)

		// Resize handler
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight
			camera.updateProjectionMatrix()
			renderer.setSize(window.innerWidth, window.innerHeight)
			uniforms.resolution.value.set(window.innerWidth, window.innerHeight)
		}
		window.addEventListener('resize', handleResize)
		handleResize()

		// Create mesh with shader material
		const material = new THREE.ShaderMaterial({
			uniforms,
			vertexShader,
			fragmentShader
		})

		const mesh = new THREE.Mesh(
			new THREE.PlaneGeometry(window.innerWidth, window.innerHeight, 40),
			material
		)
		scene.add(mesh)

		// Animation loop
		function animate() {
			uniforms.time.value += clock.getDelta()
			renderer.render(scene, camera)
			requestAnimationFrame(animate)
		}
		animate()

		// Cleanup
		return () => {
			window.removeEventListener('resize', handleResize)
			renderer.domElement.removeEventListener('mousedown', handleMouseDown)
			renderer.domElement.removeEventListener('mouseup', handleMouseUp)
			renderer.dispose()
			material.dispose()
			mesh.geometry.dispose()
			if (containerRef.current) {
				containerRef.current.innerHTML = ''
			}
		}
	}, [])

	return <div ref={containerRef} />
}

