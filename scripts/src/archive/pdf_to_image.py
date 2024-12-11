import sys
import os
import os
from pathlib import Path
import fitz  # PyMuPDF
from PIL import Image
import io
import logging
from typing import List, Tuple
import concurrent.futures

def setup_logging() -> None:
    """Configure logging to track extraction process."""
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(levelname)s - %(message)s'
    )

def extract_images_from_pdf(pdf_path: str, output_dir: str, output_dir_text: str) -> List[str]:
    """
    Extract images and text from a single PDF file.
    
    Args:
        pdf_path: Path to the PDF file
        output_dir: Directory to save extracted images
        output_dir_text: Directory to save extracted text
        
    Returns:
        List of paths to extracted images
    """
    extracted_images = []
    extracted_text = []
    
    try:
        # Open PDF
        doc = fitz.open(pdf_path)
        pdf_name = Path(pdf_path).stem
        
        # Create output directory for text if it doesn't exist
        os.makedirs(output_dir_text, exist_ok=True)

        # Create a text file for the extracted text
        text_file_path = os.path.join(output_dir_text, f"{pdf_name}.txt")
        
        # Iterate through pages
        for page_num, page in enumerate(doc):
            # Extract text from the page
            page_text = page.get_text()
            print(page_text)
            extracted_text.append(page_text)
            
            # Write text to the file
            with open(text_file_path, 'a', encoding='utf-8') as text_file:
                text_file.write(page_text)
            
            # Get images from page
            image_list = [] #page.get_images()
            
            # Process each image
            for img_idx, img in enumerate(image_list):
                try:
                    # Get image data
                    xref = img[0]
                    base_image = doc.extract_image(xref)
                    image_data = base_image["image"]
                    
                    # Convert to PIL Image
                    image = Image.open(io.BytesIO(image_data))
                    
                    # Generate output filename
                    out_filename = f"{pdf_name}_page{page_num + 1}_img{img_idx + 1}.{image.format.lower()}"
                    out_path = os.path.join(output_dir, out_filename)
                    
                    # Save image
                    image.save(out_path)
                    extracted_images.append(out_path)
                    
                    logging.info(f"Extracted: {out_filename}")
                    
                except Exception as e:
                    logging.error(f"Error processing image {img_idx} from page {page_num} of {pdf_path}: {str(e)}")
                    continue
                    
        doc.close()
        
    except Exception as e:
        logging.error(f"Error processing PDF {pdf_path}: {str(e)}")
    
    return extracted_images

def process_pdf_directory(input_dir: str, output_dir: str, output_dir_text: str, max_workers: int = 4) -> Tuple[int, int]:
    """
    Process all PDFs in a directory and extract images and text.
    
    Args:
        input_dir: Directory containing PDF files
        output_dir: Directory to save extracted images
        output_dir_text: Directory to save extracted text
        max_workers: Maximum number of concurrent processes
        
    Returns:
        Tuple of (number of PDFs processed, number of images extracted)
    """
    # Create output directories if they don't exist
    os.makedirs(output_dir, exist_ok=True)
    os.makedirs(output_dir_text, exist_ok=True)
    
    # Get list of PDF files
    pdf_files = [f for f in os.listdir(input_dir) if f.lower().endswith('.pdf')]
    total_images = 0
    
    setup_logging()
    logging.info(f"Found {len(pdf_files)} PDF files to process")
    
    # Process PDFs in parallel
    with concurrent.futures.ProcessPoolExecutor(max_workers=max_workers) as executor:
        future_to_pdf = {
            executor.submit(
                extract_images_from_pdf, 
                os.path.join(input_dir, pdf),
                output_dir,
                output_dir_text
            ): pdf for pdf in pdf_files
        }
        
        # Collect results
        for future in concurrent.futures.as_completed(future_to_pdf):
            pdf = future_to_pdf[future]
            try:
                extracted_paths = future.result()
                total_images += len(extracted_paths)
                logging.info(f"Completed processing {pdf}")
            except Exception as e:
                logging.error(f"Error processing {pdf}: {str(e)}")
    
    return len(pdf_files), total_images

if __name__ == "__main__":
    # Example usage
    input_dir_papers = "/home/adnan/derp/support_bret/papers/"
    output_dir_images = "/home/adnan/derp/support_bret/output_images"
    output_dir_text = "/home/adnan/derp/support_bret/output_text"
    
    pdfs_processed, images_extracted = process_pdf_directory(
        input_dir_papers, 
        output_dir_images, 
        output_dir_text
    )
    print(f"Processed {pdfs_processed} PDFs and extracted {images_extracted} images")