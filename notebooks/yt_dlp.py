# A Pydantic model to parse the incoming JSON payload
class YouTubeURL(BaseModel):
    url: str

@app.post("/download")
async def download_playlist(data: YouTubeURL):
    """
    Takes a YouTube playlist URL (or single video URL) in the request body,
    and downloads all videos to ~/Downloads/Youtube.
    """

    # Expand the ~ to the user home directory
    download_dir = os.path.expanduser("~/Downloads/Youtube")
    os.makedirs(download_dir, exist_ok=True)

    ydl_opts = {
        'outtmpl': os.path.join(download_dir, '%(title)s.%(ext)s'),
        'ignoreerrors': True,  # continue downloading if an error occurs
    }

    # Use yt-dlp to download the entire playlist
    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        ydl.download([data.url])

    return {"status": "success", "message": "Download started (check console logs for progress)"}
