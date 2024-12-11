import time
from concurrent.futures import ThreadPoolExecutor
from openai import OpenAI
import os
import argparse
from pathlib import Path

# Initialize OpenAI API key
openai_api_key = os.getenv('OPENAI_KEY')

client = OpenAI(
    api_key=openai_api_key,
)

# Directory paths
input_dir_papers = "/home/adnan/derp/support_bret/papers"
input_dir_images = "/home/adnan/derp/support_bret/output_images"
input_dir_text = "/home/adnan/derp/support_bret/output_text"
output_dir = "/home/adnan/derp/support_bret/output_diagrams"
base_url = "https://files.hashirama.blog/output_images/"

def append_to_file(chunk, index, output_dir):
    with open(f"{output_dir}/parallel_chunk_{index}.txt", 'w') as output_file:
        output_file.write(chunk)
    return chunk

def parse_gpt(response):
    if len(response.choices) == 0:
        return None
    return response.choices[0].message.content

def extract_css(input_text):
    start_marker = "```"
    end_marker = "\n"
    start_idx = input_text.find(start_marker) + len(start_marker)
    end_idx = input_text.find(end_marker)
    return input_text[start_idx:end_idx]

def split_into_chunks(css):
    css_blocks = css.split('\n\n')
    lines_per_chunk = 10
    return ['\n'.join(css_blocks[i:i + lines_per_chunk]) for i in range(0, len(css_blocks), lines_per_chunk)]

queries = {
    "desmos": "Generate a JavaScript code to visualize topic like Desmos.",
    "threejs": "Generate a JavaScript code to visualize topic like Three.js.",
    "khanacademy": "Generate a JavaScript code to visualize topic like Khan Academy.",
    "observable": "Generate a JavaScript code to visualize topic like Observable.",
    "d3js": "Generate a JavaScript code to visualize topic like D3.js.",
    "research_papers": "Provide links to any related research papers.",
    "visualizations": "Provide links to any visualizations.",
    "videos": "Provide links to videos.",
    "tweets": "Provide links to tweets or any social media.",
    "docs": "Provide docs/websites."
}

query_file_ext = {
    "desmos": "js",
    "threejs": "js",
    "khanacademy": "js",
    "observable": "js",
    "d3js": "js",
    "research_papers": "md",
    "visualizations": "md",
    "videos": "md",
    "tweets": "md",
    "docs": "md",
    "websites": "md"
}

def generate_html(diagrams):
    html_content = "<!DOCTYPE html>\n<html lang='en'>\n<head>\n<meta charset='UTF-8'>\n"
    html_content += "<meta name='viewport' content='width=device-width, initial-scale=1.0'>\n"
    html_content += "<title>Diagrams</title>\n</head>\n<body>\n"
    for diagram in diagrams:
        html_content += f"{diagram}\n<hr/>\n"
    html_content += "</body>\n</html>"
    return html_content

def process_chunk(folder_name, index):
    prompt = f"{list(queries.values())[index]} Generate a diagram from the folder name '{folder_name}'."
    print(prompt)
    chat_completion = client.chat.completions.create(
        model="gpt-4",
        messages=[
            {"role": "user", "content": prompt },
        ]
    )
    processed = parse_gpt(chat_completion)
    
    if processed:
        # Convert image + text to diagram using GPT-4
        diagram_prompt = f"Convert the following content to a diagram suitable for rendering in HTML:\n\n{processed}"
        diagram_response = client.chat.completions.create(
            model="gpt-4",
            messages=[
                {"role": "user", "content": diagram_prompt},
            ]
        )
        diagram = parse_gpt(diagram_response)
        
        if diagram:
            # Improve the diagram using gpt o1-preview
            improvement_prompt = f"Improve the following diagram using best practices for ObservableHQ:\n\n{diagram}"
            improved_diagram_response = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[
                    {"role": "user", "content": improvement_prompt},
                ]
            )
            improved_diagram = parse_gpt(improved_diagram_response)
            
            # Save the improved diagram as HTML snippet
            output_path = os.path.join(output_dir, folder_name, f"{index}.html")
            os.makedirs(os.path.dirname(output_path), exist_ok=True)
            with open(output_path, 'w') as file:
                file.write(improved_diagram if improved_diagram else "")
            return improved_diagram
    return ""

def process_all_files_in_directory(directory_path):
    folders = [directory_path]
    diagrams = []
    start_time = time.time()
    for folder in folders:
        for index in range(0, 100):
            diagram = process_chunk(folder, index)
            if diagram:
                diagrams.append(diagram)
    html_output = generate_html(diagrams)
    html_path = os.path.join(output_dir, "diagrams.html")
    with open(html_path, 'w') as html_file:
        html_file.write(html_output)
    end_time = time.time()
    print("Processing all files in directory took", end_time - start_time, "seconds")

if __name__ == "__main__":
    process_all_files_in_directory(input_dir_text)