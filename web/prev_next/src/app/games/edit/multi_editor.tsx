import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CANVAS_COUNT = 16;
const CANVAS_WIDTH = 200;
const CANVAS_HEIGHT = 200;

export const cool_beans = function (sceneRef, cameraRef, cubeRef, containerRef, renderersRef) {

        // Create scene
        sceneRef.current = new THREE.Scene();

        // Create camera
        cameraRef.current = new THREE.PerspectiveCamera(
            75,
            CANVAS_WIDTH / CANVAS_HEIGHT,
            0.1,
            1000
        );
        cameraRef.current.position.z = 2.5;

        // Create cube
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshNormalMaterial();
        cubeRef.current = new THREE.Mesh(geometry, material);
        sceneRef.current.add(cubeRef.current);

        // Create canvases and renderers
        for (let i = 0; i < CANVAS_COUNT; i++) {
            const canvas = document.createElement('canvas');
            canvas.width = CANVAS_WIDTH;
            canvas.height = CANVAS_HEIGHT;
            containerRef.current?.appendChild(canvas);

            const renderer = new THREE.WebGLRenderer({
                canvas: canvas,
                antialias: true
            });
            renderer.setSize(CANVAS_WIDTH, CANVAS_HEIGHT);
            renderer.setClearColor(0x000000, 1);
            renderersRef.current.push(renderer);
        }

        // Animation function
        const animate = () => {
            requestAnimationFrame(animate);

            if (cubeRef.current) {
                cubeRef.current.rotation.x += 0.01;
                cubeRef.current.rotation.y += 0.01;
            }

            renderersRef.current.forEach(renderer => {
                if (sceneRef.current && cameraRef.current) {
                    renderer.render(sceneRef.current, cameraRef.current);
                }
            });
        };

        animate();

        // Cleanup
        return () => {
            renderersRef.current.forEach(renderer => {
                renderer.dispose();
            });
            geometry.dispose();
            material.dispose();
        };

}



export function MultiEditor() {
    
    

    const containerRef = useRef<HTMLDivElement>(null);
    const sceneRef = useRef<THREE.Scene>();
    const cameraRef = useRef<THREE.PerspectiveCamera>();
    const cubeRef = useRef<THREE.Mesh>();
    const renderersRef = useRef<THREE.WebGLRenderer[]>([]);

    useEffect(() => {
        cool_beans(sceneRef, cameraRef, cubeRef, containerRef, renderersRef);
    }, []);

    return <div ref={containerRef} style={{ display: 'flex', flexWrap: 'wrap' }} />;
}
