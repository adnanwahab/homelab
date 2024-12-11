import os
from openai import OpenAI

magic_command = "op item get 'open_ai_test' --format json | jq -r '.fields[0].value'"

import subprocess

result = subprocess.run(magic_command, shell=True, capture_output=True, text=True)

api_key = result.stdout.strip()
print(api_key)

client = OpenAI(
    api_key=api_key
) 
voted_by_people = False

import json

mini_games = json.load(open("../data/Games_collection.json"))





def create_game(game):
    response = client.chat.completions.create(
        model="o1-preview",
        messages=[{"role": "user", "content": f"Create a game with the following details using three.js and react.js and a canvas useref: {game}"}],
    )
    return response


for i, game in enumerate(mini_game_list[0:50]):
    response = create_game(game)
    print(f"Game {i+1}: {response}")
    
    # Create directory path and ensure it exists
    dir = f"/Users/shelbernstein/homelab/web/src/app/music_game/183_levels/level_{i+1}"
    os.makedirs(dir, exist_ok=True)
    
    content = response.choices[0].message.content


    with open(f"{dir}/page.tsx", "w") as f:
        f.write(content)
    print(f"Game {i+1} saved to {dir}/page.tsx")


