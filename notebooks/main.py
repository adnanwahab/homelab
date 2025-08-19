from fastapi import FastAPI, Form
from fastapi.responses import HTMLResponse
import os
import yt_dlp
import logging

app = FastAPI()
logger = logging.getLogger("mylogger")
logger.setLevel(logging.INFO)

@app.get("/", response_class=HTMLResponse)
def home():
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

@app.post("/download")
async def download_playlist(video_url: str = Form(...)):
    """Download videos (or playlist) from the provided YouTube URL to the server."""
    logger.info("=== Starting YouTube Download Process ===")
    logger.info(f"Received URL: {video_url}")

    download_dir = os.path.expanduser("~/Downloads/Youtube")
    logger.info(f"Download directory: {download_dir}")

    try:
        os.makedirs(download_dir, exist_ok=True)
        logger.info("Download directory created/verified")

        def my_hook(d):
            if d['status'] == 'downloading':
                logger.info(
                    f"Downloading: {d.get('filename', 'unknown file')} - "
                    f"Progress: {d.get('_percent_str', 'unknown')} - "
                    f"Speed: {d.get('_speed_str', 'unknown')}"
                )
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
            ydl.download([video_url])
            logger.info("=== Download process completed ===")

        return {"status": "success", "message": "Download completed successfully"}
    except Exception as e:
        logger.error(f"Error during download process: {str(e)}", exc_info=True)
        return {"status": "error", "message": str(e)}

@app.get("/test")
def test_route():
    """Simple test route to verify logging is working."""
    logger.info("Test route called!")
    return {"msg": "Hello"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
