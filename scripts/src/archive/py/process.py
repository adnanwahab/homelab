import os
import PyPDF2
import pdfplumber
from pdf2image import convert_from_path
from pathlib import Path

# Set up directories
pdf_folder = "data/papers"  # Folder containing PDFs
text_folder = "data/texts"  # Folder to store extracted text files
image_folder = "data/images/papers"  # Folder to store extracted images

# Ensure output directories exist
os.makedirs(text_folder, exist_ok=True)
os.makedirs(image_folder, exist_ok=True)

# Convert PDFs to text and images
def convert_pdfs(pdf_folder, text_folder, image_folder):
    for pdf_file in os.listdir(pdf_folder):
        if pdf_file.endswith(".pdf"):
            pdf_path = os.path.join(pdf_folder, pdf_file)

            # Extract text
            extract_text(pdf_path, text_folder)

            # Extract images
            extract_images(pdf_path, image_folder)


def extract_text(pdf_path, text_folder):
    # Initialize PDF reader and output text file path
    text_file_name = Path(pdf_path).stem + ".txt"
    text_file_path = os.path.join(text_folder, text_file_name)

    # Extract text from the PDF
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            full_text += page.extract_text() or ""

    # Write extracted text to a file
    with open(text_file_path, "w", encoding="utf-8") as text_file:
        text_file.write(full_text)

    print(f"Text extracted and saved to {text_file_path}")


def extract_images(pdf_path, image_folder):
    # Convert PDF pages to images
    images = convert_from_path(pdf_path)

    # Save each image to the output folder
    for index, image in enumerate(images):
        image_file_name = f"{Path(pdf_path).stem}_page_{index + 1}.png"
        image_file_path = os.path.join(image_folder, image_file_name)
        image.save(image_file_path, "PNG")

        print(f"Image saved to {image_file_path}")


# Run the conversion
convert_pdfs(pdf_folder, text_folder, image_folder)