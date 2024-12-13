'use client'
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer';

const ThreeFrame = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    const mountEl = mountRef.current;
    if (!mountEl) return;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('blue');

    const camera = new THREE.PerspectiveCamera(
      45,
      mountEl.clientWidth / mountEl.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 0, 10);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    mountEl.appendChild(renderer.domElement);

    // CSS2D Renderer for labels
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(mountEl.clientWidth, mountEl.clientHeight);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0px';
    labelRenderer.domElement.style.pointerEvents = 'none'; // allow mouse events to pass through
    mountEl.appendChild(labelRenderer.domElement);

    // Add a basic directional light so we can see the frame more clearly if needed.
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(5, 5, 5);
    scene.add(light);

    // Frame geometry and material
    const frameWidth = 6;
    const frameHeight = 4;
    const frameGeometry = new THREE.PlaneGeometry(frameWidth, frameHeight);

    const textureLoader = new THREE.TextureLoader();
    const paintingTexture = textureLoader.load('painting.jpg'); // Replace with a real image
    const frameMaterial = new THREE.MeshBasicMaterial({ map: paintingTexture });
    const frameMesh = new THREE.Mesh(frameGeometry, frameMaterial);
    scene.add(frameMesh);

    // Label: Using CSS2DObject
    const labelDiv = document.createElement('div');
    labelDiv.style.color = 'white';
    labelDiv.style.fontFamily = 'sans-serif';
    labelDiv.style.fontSize = '24px';
    labelDiv.style.textAlign = 'center';
    labelDiv.style.background = 'rgba(0,0,0,0.5)';
    labelDiv.style.padding = '8px';
    labelDiv.innerHTML = `<div>Mount Corcoran</div><div style="font-size:16px; opacity:0.8;">Albert Bierstadt</div>`;
    const labelObject = new CSS2DObject(labelDiv);
    labelObject.position.set(0, frameHeight/2 + 1, 0); // Position above the frame
    scene.add(labelObject);

    // Navigation Buttons
    // Left Arrow
    const leftDiv = document.createElement('div');
    leftDiv.innerHTML = '&#10094;'; // left arrow HTML entity
    leftDiv.style.fontSize = '48px';
    leftDiv.style.color = 'white';
    leftDiv.style.cursor = 'pointer';
    leftDiv.style.userSelect = 'none';

    const leftLabel = new CSS2DObject(leftDiv);
    leftLabel.position.set(-frameWidth/2 - 1.5, 0, 0); 
    scene.add(leftLabel);

    // Right Arrow
    const rightDiv = document.createElement('div');
    rightDiv.innerHTML = '&#10095;'; // right arrow HTML entity
    rightDiv.style.fontSize = '48px';
    rightDiv.style.color = 'white';
    rightDiv.style.cursor = 'pointer';
    rightDiv.style.userSelect = 'none';

    const rightLabel = new CSS2DObject(rightDiv);
    rightLabel.position.set(frameWidth/2 + 1.5, 0, 0); 
    scene.add(rightLabel);

    // Simple interaction: hovering or clicking can be handled by adding event listeners to the divs
    // For example:
    leftDiv.addEventListener('click', () => {
      console.log('Left arrow clicked');
    });
    rightDiv.addEventListener('click', () => {
      console.log('Right arrow clicked');
    });

    // Render loop
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
      labelRenderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const onResize = () => {
      const { clientWidth, clientHeight } = mountEl;
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(clientWidth, clientHeight);
      labelRenderer.setSize(clientWidth, clientHeight);
    };
    window.addEventListener('resize', onResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onResize);
      mountEl.removeChild(renderer.domElement);
      mountEl.removeChild(labelRenderer.domElement);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        width: '100%',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: 'black'
      }}
    />
  );
};

export default ThreeFrame;