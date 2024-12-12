'use client'
import { useEffect, useState } from 'react';

export default function HomePage() {
  const [roomInfo, setRoomInfo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedTrackSid, setSelectedTrackSid] = useState(null);

  useEffect(() => {
    const fetchRooms = async () => {
      setLoading(true);
      const res = await fetch('/api/livekit/room-info');
      const data = await res.json();
      if (data.rooms) {
        setRoomInfo(data.rooms);
      }
      setLoading(false);
    };
    fetchRooms();
  }, []);

  const handleTrackClick = (roomName, trackSid) => {
    setSelectedRoom(roomName);
    setSelectedTrackSid(trackSid);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>LiveKit Rooms & Tracks</h1>
      <div>click track to play here</div>
      <div>click egress to egress here</div>

      {loading && <p>Loading room information...</p>}
      {!loading && roomInfo.length === 0 && <p>No rooms currently active.</p>}

      {!loading && roomInfo.length > 0 && (
        <table style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid #ccc' }}>
              <th style={{ textAlign: 'left', padding: '8px' }}>Room</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Participant</th>
              <th style={{ textAlign: 'left', padding: '8px' }}>Tracks</th>
            </tr>
          </thead>
          <tbody>
            {roomInfo.map((room) =>
              room.participants.map((participant, pIndex) => (
                <tr key={`${room.name}-${participant.identity}`} style={{ borderBottom: '1px solid #eee' }}>
                  {pIndex === 0 && (
                    <td rowSpan={room.participants.length} style={{ padding: '8px', verticalAlign: 'top' }}>
                      {room.name}
                    </td>
                  )}
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>{participant.identity}</td>
                  <td style={{ padding: '8px', verticalAlign: 'top' }}>
                    {participant.tracks.length > 0 ? (
                      <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
                        {participant.tracks.map((track) => (
                          <li key={track.sid} style={{ marginBottom: '4px' }}>
                            <button
                              onClick={() => handleTrackClick(room.name, track.sid)}
                              style={{ cursor: 'pointer', color: 'blue', background: 'transparent', border: 'none', textDecoration: 'underline' }}
                            >
                              {track.kind} track - SID: {track.sid}
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <em>No tracks</em>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {selectedRoom && selectedTrackSid && (
        <div style={{ marginTop: '40px' }}>
          <h2>Selected Track Player</h2>
          <SelectedTrackPlayer roomName={selectedRoom} trackSid={selectedTrackSid} />
        </div>
      )}
    </div>
  );
}


//import { useEffect, useState } from 'react';
//import { useRoom, TrackPublication, VideoRenderer } from '@livekit/react-core';
//import { Room as LiveKitRoom, RoomOptions, RemoteTrackPublication } from 'livekit-client';
function SelectedTrackPlayer({ roomName, trackSid }) {
  return <div>SelectedTrackPlayer</div>
}

function _SelectedTrackPlayer({ roomName, trackSid }) {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const roomState = useRoom();
  const { room } = roomState;

  useEffect(() => {
    const fetchToken = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`/api/livekit-token?roomName=${encodeURIComponent(roomName)}`);
        const data = await res.json();
        if (data.token) {
          setToken(data.token);
        } else {
          throw new Error('No token returned');
        }
      } catch (err) {
        console.error(err);
        setError('Failed to get token');
      }
      setLoading(false);
    };
    fetchToken();
  }, [roomName]);

  useEffect(() => {
    if (!token) return;
    if (!room) return;

    // Connect to the room with autoSubscribe disabled
    (async () => {
      if (room.state === 'disconnected') {
        try {
          await room.connect(process.env.NEXT_PUBLIC_LIVEKIT_SERVER_URL, token, { autoSubscribe: false });
        } catch (err) {
          console.error('Failed to connect to room:', err);
          setError('Failed to connect to room');
        }
      }
    })();
  }, [token, room]);

  // Once connected, we look for the track.
  const [publication, setPublication] = useState(null);

  useEffect(() => {
    if (!room || room.state !== 'connected') return;
    // On each participant or track changed event, try to find the track.
    const handleParticipantsChanged = () => {
      // Search through all participants for the trackSid
      for (const p of room.participants.values()) {
        for (const pub of p.getTracks()) {
          if (pub.trackSid === trackSid) {
            setPublication(pub);
            return;
          }
        }
      }
      // If not found, leave publication as null
      setPublication(null);
    };

    // Listen for changes
    room.on('participantConnected', handleParticipantsChanged);
    room.on('participantDisconnected', handleParticipantsChanged);
    room.on('trackPublished', handleParticipantsChanged);
    room.on('trackUnpublished', handleParticipantsChanged);

    // Initial check
    handleParticipantsChanged();

    return () => {
      room.off('participantConnected', handleParticipantsChanged);
      room.off('participantDisconnected', handleParticipantsChanged);
      room.off('trackPublished', handleParticipantsChanged);
      room.off('trackUnpublished', handleParticipantsChanged);
    };
  }, [room, trackSid]);

  // Subscribe to the publication when it becomes available
  useEffect(() => {
    if (!publication) return;
    // RemoteTrackPublication automatically subscribes if allowed, if not we do:
    if (publication.isSubscribed || !publication.setSubscribed) return;
    publication.setSubscribed(true);
  }, [publication]);

  if (loading) {
    return <div>Loading token...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  if (room?.state !== 'connected') {
    return <div>Connecting to room...</div>;
  }

  if (!publication) {
    return <div>No track found with SID: {trackSid}. Waiting...</div>;
  }

  // Render the track using VideoRenderer if it's a video track
  // For audio tracks, subscription means we are already playing it. If you want to display something special, you can.
  return (
    <div style={{ border: '1px solid #ccc', padding: '10px' }}>
      <h3>Rendering Track: {trackSid}</h3>
      {publication.kind === 'video' && publication.track ? (
        <VideoRenderer track={publication.track} style={{ width: '400px', height: 'auto', background: 'black' }} />
      ) : publication.kind === 'audio' ? (
        <p>Audio track subscribed. (Audio is playing if unmuted)</p>
      ) : (
        <p>Unsupported track kind: {publication.kind}</p>
      )}
    </div>
  );
}