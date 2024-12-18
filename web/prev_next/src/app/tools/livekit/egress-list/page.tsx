"use client";

import React, { useEffect, useState } from 'react';

type Participant = {
  identity: string;
  joinedAt: number;
};

type RoomDetail = {
  name: string;
  participants: Participant[];
};

type EgressFile = {
  roomName: string;
  fileUrl: string;
  startedAt: number;
  endedAt: number;
};

export default function HomePage() {
  const [rooms, setRooms] = useState<RoomDetail[]>([]);
  const [egressFiles, setEgressFiles] = useState<EgressFile[]>([]);

  useEffect(() => {
    async function fetchData() {
      const roomsRes = await fetch('/api/livekit/rooms');
      const roomsData = await roomsRes.json();
      setRooms(roomsData);

      const egressRes = await fetch('/api/livekit/egress-files');
      const egressData = await egressRes.json();
      setEgressFiles(egressData);
    }
    fetchData();
  }, []);

  return (
    <div style={{ padding: '20px', fontFamily: 'sans-serif' }}>
      <h1>LiveKit Dashboard</h1>
      
      <section>
        <h2>Rooms</h2>
        {rooms.length === 0 && <p>No rooms currently active.</p>}
        {rooms.map((room) => (
          <div key={room.name} style={{ marginBottom: '20px' }}>
            <h3>Room: {room.name}</h3>
            {room.participants.length === 0 && <p>No participants in this room.</p>}
            {room.participants.length > 0 && (
              <ul>
                {room.participants.map((p) => (
                  <li key={p.identity}>
                    {p.identity} (joined at {new Date(p.joinedAt * 1000).toLocaleString()})
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      <section style={{ marginTop: '40px' }}>
        <h2>Egressed Files</h2>
        {egressFiles.length === 0 && <p>No egressed files found.</p>}
        {egressFiles.length > 0 && (
          <table border={1} cellPadding={5}>
            <thead>
              <tr>
                <th>Room Name</th>
                <th>File URL</th>
                <th>Started At</th>
                <th>Ended At</th>
              </tr>
            </thead>
            <tbody>
              {egressFiles.map((f, idx) => (
                <tr key={idx}>
                  <td>{f.roomName}</td>
                  <td><a href={f.fileUrl} target="_blank" rel="noopener noreferrer">{f.fileUrl}</a></td>
                  <td>{new Date(f.startedAt * 1000).toLocaleString()}</td>
                  <td>{new Date(f.endedAt * 1000).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}