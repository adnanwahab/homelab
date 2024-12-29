import asyncio
import os
import json
import openai
from pathlib import Path

async def generate_threejs_component(img_path):   
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
    return response.choices[0].message.content

#             component_code = f"""
# import { useRef, useEffect } from 'react'
# import * as THREE from 'three'

# export default function Visualization() {{
#     const canvasRef = useRef()

#     useEffect(() => {{
#         const canvas = canvasRef.current
#         const renderer = new THREE.WebGLRenderer({{canvas}})
#         const scene = new THREE.Scene()
#         const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)

#         {response.choices[0].message.content}

#         camera.position.z = 5

#         function animate() {{
#             requestAnimationFrame(animate)
#             renderer.render(scene, camera)
#         }}
#         animate()

#         function handleResize() {{
#             const width = canvas.clientWidth
#             const height = canvas.clientHeight
#             renderer.setSize(width, height, false)
#             camera.aspect = width / height
#             camera.updateProjectionMatrix()
#         }}

#         window.addEventListener('resize', handleResize)
#         handleResize()

#         return () => window.removeEventListener('resize', handleResize)
#     }}, [])

#     return <canvas ref={{canvasRef}} style={{{{ width: '100%', height: '100%' }}}} />
# }}
# """



#/Users/shelbernstein/homelab/web/src/app/vis
async def process_images():
    images_dir = Path('../web/public/vis')
    output_dir = Path('../web/src/app/vis')
    #output_dir.mkdir(parents=True, exist_ok=True)

    # Convert generator to list before slicing
    image_paths = list(images_dir.glob('*'))[:3]
    
    for idx, img_path in enumerate(image_paths):
        if img_path.is_file():
            # Send image to OpenAI for processing
            with open(img_path, 'rb') as img:
                component_code = await generate_threejs_component(img_path)
            # Save component
            output_file = output_dir / f"{idx}/page.tsx"
            print(output_file)
            with open(output_file, 'w') as f:
                f.write(component_code)

if __name__ == "__main__":
    asyncio.run(process_images())
