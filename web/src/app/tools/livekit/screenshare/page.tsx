'use client'
import { useState, useRef, useCallback } from 'react';

export default function ScreenShare() {
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState(null);
  const videoRef = useRef(null);

  const startScreenShare = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getDisplayMedia({ video: true, audio: false });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setIsSharing(true);

      // If you want to handle when the user stops sharing:
      // When the stream ends, reset state.
      stream.getVideoTracks()[0].addEventListener('ended', () => {
        setIsSharing(false);
        if (videoRef.current) {
          videoRef.current.srcObject = null;
        }
      });

    } catch (err) {
      console.error('Error starting screen share:', err);
      setError('Could not start screen sharing. Maybe it was canceled or not supported.');
      setIsSharing(false);
    }
  }, []);

  const stopScreenShare = useCallback(() => {
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsSharing(false);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Screen Share Demo</h1>
      <p>This is a simple example showing how to share your screen using getDisplayMedia.</p>

      {!isSharing && (
        <button onClick={startScreenShare}>Start Screen Share</button>
      )}
      {isSharing && (
        <button onClick={stopScreenShare}>Stop Screen Share</button>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div style={{ marginTop: '20px' }}>
        <video 
          ref={videoRef} 
          autoPlay 
          playsInline 
          style={{ width: '80%', border: '1px solid #ccc' }}
        />
      </div>
    </div>
  );
}