import os
import re
import asyncio
import base64
import openai
from openai import OpenAI
input_dir_papers = "/home/adnan/derp/support_bret/papers"
input_dir_images = "/home/adnan/derp/support_bret/output_images"
input_dir_text = "/home/adnan/derp/support_bret/output_text"
output_dir = "/home/adnan/derp/support_bret/output_diagrams"
python_script_path = 'pdf_to_images.py'  # Ensure this path is correct
base_url = "https://files.hashirama.blog/output_images/"
client = OpenAI(
    api_key=os.getenv('OPENAI_KEY'),
)
async def ollama_chat(model, messages):
    # Placeholder function for the Ollama chat API
    # Replace this with actual API calls to Ollama if available
    return {'message': {'content': 'Simulated caption for the image'}}

async def get_captions(image_paths):
    async def fetch_caption(img_path):
        image_absolute_path = os.path.join(input_dir_images, img_path)
        res = await ollama_chat(
            model='llava',
            messages=[{
                'role': 'user',
                'content': "Describe this image, it comes from a research paper and I'm using it to make a JavaScript explorable explanation and visualization for robotics.",
                'images': [image_absolute_path]
            }]
        )
        # Extract the caption from the response (adjust based on actual API response structure)
        return res['message']['content']

    # Limit to the first image for now
    caption_tasks = [fetch_caption(img_path) for img_path in image_paths[:1]]
    captions = await asyncio.gather(*caption_tasks)
    return captions  # e.g., ['giraffe', 'fox']

def encode_image_to_data_url(image_path):
    with open(image_path, 'rb') as image_file:
        image_data = image_file.read()
    mime_type = 'image/png'  # Change this to the correct MIME type if needed
    base64_data = base64.b64encode(image_data).decode('utf-8')
    return f'data:{mime_type};base64,{base64_data}'

async def ask_gpt(text, images):
    captions = await get_captions(images)
    print('captions', captions)
    prompt = f"""Create an interactive visual explanation in the style of redblobgames.com or Bret Victor's explorable explanations.

Input text: {text}
Number of related images: {len(images)}

Please generate JavaScript code that creates an interactive visualization with these requirements:
1. Use D3.js or Observable Plot for dynamic, interactive visualizations
2. Include clear, step-by-step explanations that reveal concepts gradually
3. Add interactive elements that let users:
   - Manipulate parameters
   - See immediate visual feedback
   - Explore edge cases
4. Break down complex concepts into smaller, digestible pieces
5. Use concrete, visual examples from the input text
6. Include smooth transitions and animations to show relationships

Here are captions of the images: {', '.join(captions)}
"""

    messages = [
        {
            'role': 'user',
            'content': prompt
        }
    ]

    # Updated API call to use the new method
    response = client.chat.completions.create(
        model='gpt-3.5-turbo',  # Adjust the model as needed
        messages=messages
    )

    processed = parse_gpt(response)
    return processed

def parse_gpt(results):
    if not results.choices:
        return None
    message_content = results.choices[0].message.content
    return message_content

async def process_all_files_in_directory():
    text_files = os.listdir(input_dir_text)
    image_files = os.listdir(input_dir_images)

    image_map = {}
    for img_file in image_files:
        match = re.search(r'(\d+\.\d+)', img_file)
        if match:
            paper_id = match.group(1)
            image_map.setdefault(paper_id, []).append(img_file)

    for text_file in text_files[:100]:
        match = re.search(r'(\d+\.\d+)', text_file)
        if match:
            text_paper_id = match.group(1)
            matching_images = image_map.get(text_paper_id, [])
            diagram_js = await ask_gpt(text_file, matching_images)
            output_filename = os.path.join(output_dir, f"{text_paper_id}.js")
            print(output_filename)
            with open(output_filename, 'w') as f:
                f.write(diagram_js)

def error_log_to_fix(error_log):
    # Placeholder function for generating fixes based on error logs
    response = "Simulated response to fix the error log"
    return response

if __name__ == '__main__':
    asyncio.run(process_all_files_in_directory())


