'use client'
import React, { useEffect, useRef, useState } from 'react';
import {
  Room,
  RoomEvent,
  LocalVideoTrack
} from 'livekit-client';

const LIVEKIT_URL = 'wss://omnissiah-university-kmuz0plz.livekit.cloud';

export default function WebcamPage() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const roomRef = useRef<Room | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  //const [trackId, setTrackId] = useState<string>('');

  const startWebcam = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: 'environment' } },
        audio: false,
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      return stream;
    } catch (err) {
      console.error('Error accessing media devices:', err);
      throw err;
    }
  };

  const setupRoomListeners = (room: Room) => {
    room
      .on(RoomEvent.ParticipantConnected, participant => {
        console.log(`Participant connected: ${participant.identity}`);
      })
      .on(RoomEvent.ParticipantDisconnected, participant => {
        console.log(`Participant disconnected: ${participant.identity}`);
      })
      // ... other event listeners can be added as needed
  };

  const startLiveKit = async () => {
    try {
      // Get token
      const identity = `happydream-forever`;
      const response = await fetch(`/api/livekit/get-token?room=shit&username=user-123`);
      const { token } = await response.json();

      // Connect to room
      const room = new Room();
      await room.connect(LIVEKIT_URL, token);
    roomRef.current = room;

      // Start webcam
      const stream = await startWebcam();
      if (!stream) return;

      // Setup room event listeners
      setupRoomListeners(room);

      // Publish video track
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        const localVideoTrack = new LocalVideoTrack(videoTrack);

        await room.localParticipant.publishTrack(localVideoTrack);
        let trackId = localVideoTrack.sid;
        //setTrackId(localVideoTrack.sid);

        const egressResponse = await fetch(`/api/livekit/save_rtc?trackId=${trackId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        });

        if (!egressResponse.ok) { 
          console.error('Failed to start auto egress:', await egressResponse.text());
        } else {
          console.log('Auto egress started successfully');
        }
      }

  

      setIsConnected(true);
    } catch (error) {
      console.error('Failed to start LiveKit:', error);
    }
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (roomRef.current) {
        roomRef.current.disconnect();
      }
    };
  }, []);

  return (
    <div className="p-4">
      <button 
        onClick={startLiveKit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4"
        disabled={isConnected}
      >
        {isConnected ? 'Connected' : 'Start Webcam and LiveKit'}
      </button>
      
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full max-w-2xl border rounded-lg"
      />
    </div>
  );
}
