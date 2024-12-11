# notebooks/hi.py

import json

# Read the index.json file
with open('index.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Iterate over each title and create a notebook
for title in data:
    # Create a Jupyter notebook structure
    notebook_content = {
        "cells": [],
        "metadata": {},
        "nbformat": 4,
        "nbformat_minor": 2
    }

    # Add a code cell with required fields
    notebook_content['cells'].append({
        "cell_type": "code",
        "metadata": {},
        "source": [f"# {title}\n"],
        "outputs": [],
        "execution_count": None
    })

    # Write the notebook to a file
    with open(f"{title}.ipynb", "w", encoding="utf-8") as f:
        json.dump(notebook_content, f, indent=2)
