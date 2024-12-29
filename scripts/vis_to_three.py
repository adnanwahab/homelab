import asyncio
import os
import json
import openai
from pathlib import Path

#openai.api_key = "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"
openai.api_key = "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"

file_url = "https://raw.githubusercontent.com/adnanwahab/homelab/refs/heads/main/web/public/vis/image-1734920932306.png"



from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "image_url",
          "image_url": {
            "url": "data:image/png;base64,..."
          }
        },
        {
          "type": "text",
          "text": "can you mke this in three.js - as a react component using tailwind and a useRef "
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "Creating a 3D shape in Three.js as a React component involves setting up a basic Three.js scene within a React component. Here’s a basic example of how to create an icosahedron-like structure similar to the image using Three.js, React, and Tailwind CSS. \n\n1. **Install Three.js**: First, ensure you have Three.js installed in your React project.\n\n   ```bash\n   npm install three\n   ```\n\n2. **Create the React component**: Use the following code to create a Three.js scene with an icosahedron.\n\n```jsx\nimport React, { useEffect, useRef } from 'react';\nimport * as THREE from 'three';\nimport { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';\n\nconst IcosahedronScene = () => {\n  const mountRef = useRef(null);\n\n  useEffect(() => {\n    const mount = mountRef.current;\n    \n    // Set scene\n    const scene = new THREE.Scene();\n    scene.background = new THREE.Color(0x000000);\n\n    // Set camera\n    const camera = new THREE.PerspectiveCamera(\n      75, \n      mount.clientWidth / mount.clientHeight, \n      0.1, \n      1000\n    );\n    camera.position.z = 5;\n\n    // Set renderer\n    const renderer = new THREE.WebGLRenderer();\n    renderer.setSize(mount.clientWidth, mount.clientHeight);\n    mount.appendChild(renderer.domElement);\n\n    // Add icosahedron\n    const geometry = new THREE.IcosahedronGeometry();\n    const material = new THREE.MeshStandardMaterial({ \n      color: 0xffffff, \n      flatShading: true \n    });\n\n    const wireframe = new THREE.WireframeGeometry(geometry);\n    const mesh = new THREE.Mesh(geometry, material);\n    scene.add(mesh);\n\n    // Light\n    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);\n    scene.add(ambientLight);\n\n    const pointLight = new THREE.PointLight(0xffffff, 1);\n    pointLight.position.set(5, 5, 5);\n    scene.add(pointLight);\n\n    // Add controls\n    const controls = new OrbitControls(camera, renderer.domElement);\n\n    // Animation loop\n    const animate = () => {\n      requestAnimationFrame(animate);\n      mesh.rotation.x += 0.01;\n      mesh.rotation.y += 0.01;\n      controls.update();\n      renderer.render(scene, camera);\n    };\n    animate();\n\n    // Handle resize\n    const handleResize = () => {\n      renderer.setSize(mount.clientWidth, mount.clientHeight);\n      camera.aspect = mount.clientWidth / mount.clientHeight;\n      camera.updateProjectionMatrix();\n    };\n\n    window.addEventListener('resize', handleResize);\n\n    return () => {\n      window.removeEventListener('resize', handleResize);\n      mount.removeChild(renderer.domElement);\n      renderer.dispose();\n    };\n  }, []);\n\n  return (\n    <div ref={mountRef} className=\"w-full h-screen\"></div>\n  );\n};\n\nexport default IcosahedronScene;\n```\n\n3. **Tailwind CSS**: Make sure Tailwind is set up in your project to style the component appropriately.\n\nWith these steps, you have a React component that uses Three.js to render an icosahedron, similar to the shape in the image, with basic orbit controls and ambient lighting. Adjust the geometry and lighting settings as needed to match the visual appearance you desire."
        }
      ]
    }
  ],
  response_format={
    "type": "text"
  },
  temperature=1,
  max_completion_tokens=10000,
  top_p=1,
  frequency_penalty=0,
  presence_penalty=0
)




def generate_threejs_component(image_path):
    with open(image_path, "rb") as img_file:
        image_bytes = img_file.read()

    response = openai.chat.completions.create(
        model="gpt-4o",
        messages=[
            {
                "role": "user",
                "content": "Generate a ThreeJS visualization of the attached image."
            }
        ],
        files=[("image", image_bytes)]
    )
    return response.choices[0].message.content


#process_images()
images_dir = Path('../web/public/vis')
output_dir = Path('../web/src/app/vis')

image_paths = list(images_dir.glob('*'))[:3]


for idx, img_path in enumerate(image_paths):
    if img_path.is_file():
        component_code = generate_threejs_component(img_path)
        output_file = output_dir / f"{idx}/page.tsx"
        print(output_file)
        with open(output_file, 'w') as f:
            f.write(component_code)

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
