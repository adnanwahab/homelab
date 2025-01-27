from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
from pytubefix import YouTube
import uuid
import logging
<<<<<<< HEAD
=======
from pydantic import BaseModel
import os
import yt_dlp
>>>>>>> ae21544 (simplify)

app = FastAPI()

# Set up logging
logger = logging.getLogger("mylogger")
logger.setLevel(logging.INFO)

<<<<<<< HEAD
=======
class YouTubeURL(BaseModel):
    url: str

>>>>>>> ae21544 (simplify)
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

<<<<<<< HEAD
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
=======
@app.post("/download")
async def download_playlist(data: YouTubeURL):
    """
    Takes a YouTube playlist URL (or single video URL) in the request body,
    and downloads all videos to ~/Downloads/Youtube.
    """
    logger.info("=== Starting YouTube Download Process ===")
    logger.info(f"Received URL: {data.url}")

    # Expand the ~ to the user home directory
    download_dir = os.path.expanduser("~/Downloads/Youtube")
    logger.info(f"Download directory: {download_dir}")
    
    try:
        os.makedirs(download_dir, exist_ok=True)
        logger.info("Download directory created/verified")

        def my_hook(d):
            if d['status'] == 'downloading':
                logger.info(f"Downloading: {d.get('filename', 'unknown file')} - "
                          f"Progress: {d.get('_percent_str', 'unknown')} - "
                          f"Speed: {d.get('_speed_str', 'unknown')}")
            elif d['status'] == 'finished':
                logger.info(f"Download complete: {d.get('filename', 'unknown file')}")

        ydl_opts = {
            'outtmpl': os.path.join(download_dir, '%(title)s.%(ext)s'),
            'ignoreerrors': True,
            'progress_hooks': [my_hook],
            'logger': logger
        }

        logger.info("Initializing YouTube-DL with options")
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            logger.info("Starting download process...")
            ydl.download([data.url])
            logger.info("=== Download process completed ===")

        return {"status": "success", "message": "Download completed successfully"}

    except Exception as e:
        logger.error(f"Error during download process: {str(e)}", exc_info=True)
        return {"status": "error", "message": str(e)}
>>>>>>> ae21544 (simplify)

# Add test route for debugging
@app.get("/test")
def test_route():
    """Simple test route to verify logging is working."""
    logger.info("Test route called!")
    return {"msg": "Hello"}
<<<<<<< HEAD
=======



# -------------
# Main Block
# -------------
if __name__ == "__main__":
    import uvicorn
    # You can change port=8000 to port=3000 or any other if you like
    uvicorn.run(app, host="0.0.0.0", port=8888)
>>>>>>> ae21544 (simplify)
