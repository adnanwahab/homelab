from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from pytubefix import YouTube
import uuid
import logging

app = FastAPI()

# Set up logging
logger = logging.getLogger("mylogger")
logger.setLevel(logging.INFO)

@app.get("/", response_class=HTMLResponse)
def home():
    """Serve a simple HTML form to input a YouTube URL."""
    html_content = """
    <!DOCTYPE html>
    <html>
        <head>
            <title>Download to Server</title>
        </head>
        <body>
            <h1>Download a YouTube Video (Server-Side Only)</h1>
            <form action="/download" method="post">
                <label for="video_url">YouTube Video URL:</label><br><br>
                <input type="text" id="video_url" name="video_url" size="50" 
                       placeholder="Enter YouTube URL" required>
                <br><br>
                <button type="submit">Download</button>
            </form>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

@app.post("/download", response_class=HTMLResponse)
def download_video(video_url: str = Form(...)):
    """
    Downloads the YouTube video from the provided URL using pytubefix
    and saves it to the server's local directory.
    """
    unique_filename = f"{uuid.uuid4()}.mp4"
    logger.info("Starting download process with filename: %s", unique_filename)
    
    try:
        logger.info("Attempting to initialize YouTube object with URL: %s", video_url)
        yt = YouTube(video_url, use_po_token=True)
        stream = yt.streams.get_highest_resolution()

        # Download to current working directory (i.e. ./ by default)
        logger.info("Starting file download...")
        downloaded_path = stream.download(filename=unique_filename)
        logger.info("Download completed successfully to path: %s", downloaded_path)

        # Return a simple HTML response that confirms the file is on the server
        success_html = f"""
        <html>
            <body>
                <h1>Success!</h1>
                <p>Downloaded file saved to: <strong>{downloaded_path}</strong></p>
                <a href="/">Go back</a>
            </body>
        </html>
        """
        return success_html

    except Exception as e:
        logger.error("Error during download process: %s", str(e))
        error_html = f"""
        <html>
            <body>
                <h1>An error occurred:</h1>
                <p>{str(e)}</p>
                <a href="/">Go back</a>
            </body>
        </html>
        """
        return HTMLResponse(content=error_html, status_code=400)

# Add test route for debugging
@app.get("/test")
def test_route():
    """Simple test route to verify logging is working."""
    logger.info("Test route called!")
    return {"msg": "Hello"}
