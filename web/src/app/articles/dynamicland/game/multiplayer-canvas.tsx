"use client"

import React, { useEffect, useRef, useState } from 'react';
import { Room, DataPacket_Kind } from 'livekit-client';

export default function MultiplayerCanvas() {
  const canvasRef = useRef(null);
  const roomRef = useRef(null);
  const [connected, setConnected] = useState(false);
  const canvasSize = 500;
  const pixelSize = 10;
  const [color, setColor] = useState('#ff0000');

  useEffect(() => {
    const connectLiveKit = async () => {
      const identity = generateIdentity();
      const token = await getParticipantToken(identity);

      const room = new Room();
      await room.connect('wss://omnissiah-university-kmuz0plz.livekit.cloud', token);

      roomRef.current = room;
      setConnected(true);

      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');

      // Handle incoming data messages
      room.on('dataReceived', (payload, participantId, _kind) => {
        const data = JSON.parse(new TextDecoder().decode(payload));
        drawPixel(context, data.x, data.y, data.color);
      });

      // Clean up on unmount
      return () => {
        room.disconnect();
      };
    };

    connectLiveKit();
  }, []);

  const drawPixel = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
  };

  const handleCanvasClick = (e) => {
    if (!connected) return;

    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const x = Math.floor((e.clientX - rect.left) / pixelSize);
    const y = Math.floor((e.clientY - rect.top) / pixelSize);

    // Draw the pixel on the local canvas
    const context = canvas.getContext('2d');
    drawPixel(context, x, y, color);

    // Broadcast the drawing action to other participants
    const data = { x, y, color };
    const encodedData = new TextEncoder().encode(JSON.stringify(data));

    roomRef.current.localParticipant.publishData(
      encodedData,
      DataPacket_Kind.RELIABLE
    );
  };

  const generateIdentity = () => {
    // Generate a random identity for each user
    return 'user-' + Math.random().toString(36).substring(2, 15);
  };

  const getParticipantToken = async (identity) => {
    const response = await fetch(`/api/get-participant-token`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to obtain participant token');
    }

    const data = await response.json();
    return data.token;
  };

  return (
    <div
      className="flex flex-col items-center justify-center border border-black"
      style={{ textAlign: 'center' }}
    >
      <h1>Collaborative Canvas</h1>
      <div>
        <label htmlFor="colorPicker">Select Color: </label>
        <input
          id="colorPicker"
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
        />
      </div>
      <canvas
        ref={canvasRef}
        width={canvasSize}
        height={canvasSize}
        style={{ border: '1px solid black', marginTop: '10px' }}
        onClick={handleCanvasClick}
      />
    </div>
  );
}