export default function ScreenSharePage() {
  return <div>ScreenSharePage</div>;
}

// 'use client';

// import { useEffect, useRef } from 'react';
// import { Room, RoomEvent, Track } from 'livekit-client';

// export default async function ScreenSharePage() {
//   const videoRef = useRef<HTMLVideoElement>(null);
//   const roomRef = useRef<Room | null>(null);

//   const token = await fetch('/api/livekit/get-token?room=shit&username=user-123').then(res => res.json()).then(data => data.token);
 
//   //const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MzM4MjYzOTUsImlzcyI6IkFQSXRTYndYdlNqaDRjZiIsIm5hbWUiOiJhZG5hbiIsIm5iZiI6MTczMzgyNjA5NSwic3ViIjoiYWRuYW4iLCJ2aWRlbyI6eyJjYW5VcGRhdGVPd25NZXRhZGF0YSI6dHJ1ZSwicm9vbSI6InNoaXQiLCJyb29tQWRtaW4iOnRydWUsInJvb21DcmVhdGUiOnRydWUsInJvb21Kb2luIjp0cnVlLCJyb29tTGlzdCI6dHJ1ZSwicm9vbVJlY29yZCI6dHJ1ZX19.9ob4-BxmGCe3q9qOeRFY9kSg_jRmcHqevDaM2yF9fTU`

//   const joinRoom = async () => {
//     const room = new Room();
//     roomRef.current = room;
    
//     const url = "wss://omnissiah-university-kmuz0plz.livekit.cloud";
//     await room.connect(url, token);

//     room.on(RoomEvent.TrackSubscribed, (track, publication, participant) => {
//       if (track.kind === Track.Kind.Video && track.source === Track.Source.ScreenShare) {
//         track.attach(videoRef.current!);
//       }
//     });

//     room.on(RoomEvent.TrackUnsubscribed, (track, publication, participant) => {
//       if (track.kind === Track.Kind.Video && track.source === Track.Source.ScreenShare) {
//         track.detach(videoRef.current!);
//       }
//     });

//     room.on(RoomEvent.LocalTrackPublished, (publication, participant) => {
//       if (publication.kind === Track.Kind.Video && publication.source === Track.Source.ScreenShare) {
//         publication.track.attach(videoRef.current!);
//       }
//     });

//     room.on(RoomEvent.LocalTrackUnpublished, (publication, participant) => {
//       if (publication.kind === Track.Kind.Video && publication.source === Track.Source.ScreenShare) {
//         publication.track.detach(videoRef.current!);
//       }
//     });

//     toggleScreenShare(room);
//   };

//   const toggleScreenShare = async (room: Room) => {
//     const enabled = room.localParticipant.isScreenShareEnabled;
//     console.log(`${enabled ? 'stopping' : 'starting'} screen share`);
//     try {
//       await room.localParticipant.setScreenShareEnabled(!enabled, {
//         audio: true,
//       });
//     } catch (e) {
//       console.error('error sharing screen', e);
//     }
//   };

//   // Cleanup on unmount
//   useEffect(() => {
//     return () => {
//       if (roomRef.current) {
//         roomRef.current.disconnect();
//       }
//     };
//   }, []);

//   return (
//     <div className="p-4">
//       <button 
//         onClick={joinRoom}
//         className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
//       >
//         Share Screen
//       </button>
//       <video
//         ref={videoRef}
//         autoPlay
//         playsInline
//         className="w-[640px] h-[480px]"
//       />
//     </div>
//   );
// }
