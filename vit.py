import ollama

response = ollama.chat(
    model='llama3.2-vision',
    messages=[{
        'role': 'user',
        'content': 'What is in this image?',
        'images': ['/home/adnan/Desktop/received-image.png']
    }]
)

print(response)