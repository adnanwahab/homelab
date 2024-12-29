async def process_images():
    import os
    import json
    import openai
    from pathlib import Path

    images_dir = Path('../data/vis')
    output_dir = Path('../web/src/app/demos')
    output_dir.mkdir(parents=True, exist_ok=True)

    for img_path in images_dir.glob('*')[:3]:
        if img_path.is_file():
            # Send image to OpenAI for processing
            with open(img_path, 'rb') as img:
                response = await openai.ChatCompletion.create(
                    model="gpt-4-vision-preview",
                    messages=[
                        {
                            "role": "user",
                            "content": [
                                {
                                    "type": "image",
                                    "image": img.read()
                                },
                                {
                                    "type": "text",
                                    "text": "Generate a ThreeJS visualization of this image"
                                }
                            ]
                        }
                    ]
                )

            # Generate Three.js component
            component_code = f"""
import { useRef, useEffect } from 'react'
import * as THREE from 'three'

export default function Visualization() {{
    const canvasRef = useRef()

    useEffect(() => {{
        const canvas = canvasRef.current
        const renderer = new THREE.WebGLRenderer({{canvas}})
        const scene = new THREE.Scene()
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

        {response.choices[0].message.content}

        camera.position.z = 5

        function animate() {{
            requestAnimationFrame(animate)
            renderer.render(scene, camera)
        }}
        animate()

        function handleResize() {{
            const width = canvas.clientWidth
            const height = canvas.clientHeight
            renderer.setSize(width, height, false)
            camera.aspect = width / height
            camera.updateProjectionMatrix()
        }}

        window.addEventListener('resize', handleResize)
        handleResize()

        return () => window.removeEventListener('resize', handleResize)
    }}, [])

    return <canvas ref={{canvasRef}} style={{{{ width: '100%', height: '100%' }}}} />
}}
"""

            # Save component
            output_file = output_dir / f"{img_path.stem}.tsx"
            with open(output_file, 'w') as f:
                f.write(component_code)

if __name__ == "__main__":
    import asyncio
    asyncio.run(process_images())
