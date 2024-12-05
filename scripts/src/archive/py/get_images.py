import fitz  # PyMuPDF
import os

# Directory containing PDF files
pdf_directory = "data/papers"

# Output folder for extracted images
output_folder = "data/images"
os.makedirs(output_folder, exist_ok=True)

# Iterate through PDF files in the directory
for pdf_file in os.listdir(pdf_directory):
    if pdf_file.endswith(".pdf"):
        pdf_path = os.path.join(pdf_directory, pdf_file)
        doc = fitz.open(pdf_path)

        # Iterate through PDF pages
        for page_number in range(len(doc)):
            page = doc.load_page(page_number)
            image_list = page.get_images(full=True)

            # Extract images
            for img_index, img in enumerate(image_list):
                xref = img[0]
                base_image = doc.extract_image(xref)
                image_bytes = base_image["image"]
                image_ext = base_image["ext"]  # The image extension (png, jpeg, etc.)
                image_filename = os.path.join(output_folder, f"{pdf_file}_page_{page_number+1}_image_{img_index+1}.{image_ext}")

                # Write the image to the output folder
                with open(image_filename, "wb") as image_file:
                    image_file.write(image_bytes)

                print(f"Extracted {image_filename}")

print("Image extraction complete.")
