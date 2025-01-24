def cmd(command, check=True, shell=True, capture_output=True, text=True):
    """
    Runs a command in a shell, and throws an exception if the return code is non-zero.
    :param command: any shell command.
    :return:
    """
    log.debug(f"Executing command: {command}")
    try:
        result = subprocess.run(command, check=check, shell=shell, capture_output=capture_output, text=text)
        log.debug(f"Command output: {result.stdout}")
        return result
    except subprocess.CalledProcessError as error:
        log.error(f"Command failed: {error}")
        raise CommandFailedError(
            msg=f"\"{command}\" return exit code: {error.returncode}",
            stdout=error.stdout,
            stderr=error.stderr
        )


def download_youtube(url: str,
                     use_proxy_default: str = "false") -> str:
    log.info(f"Starting YouTube download for URL: {url}")
    output_filename = f"{uuid4()}.mp4"
    log.debug(f"Generated output filename: {output_filename}")
    
    audio_file = os.path.join(tempfile.gettempdir(), output_filename)
    log.debug(f"Full output path: {audio_file}")
    
    try:
        yt = YouTube(url,
                    proxies=get_youtube_proxy_configuration(use_proxy_default),
                    use_po_token=True,
                    po_token_verifier=po_token_verifier)
        log.debug("YouTube object created successfully")
        
        stream = yt.streams.filter(progressive=True, file_extension='mp4').order_by('resolution').desc().first()
        log.debug(f"Selected stream: {stream}")
        
        downloaded_file = stream.download(filename=audio_file)
        log.info(f"Download completed successfully: {downloaded_file}")
        return downloaded_file
    except Exception as e:
        log.error(f"Error downloading YouTube video: {e}", exc_info=True)
        raise


def po_token_verifier() -> Tuple[str, str]:
    token_object = generate_youtube_token()
    return token_object["visitorData"], token_object["poToken"]


def generate_youtube_token() -> dict:
    log.info("Generating YouTube token")
    result = cmd("node scripts/youtube-token-generator.js")
    data = json.loads(result.stdout)
    log.info(f"Result: {data}")
    return data