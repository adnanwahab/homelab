import { RoomServiceClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    // return NextResponse.json({ 
        
        
    //     rooms: [{
    //         name: 'webshare',
    //         participants: [{
    //             identity: 'webshare',
    //             tracks: [{
    //                 sid: '123',
    //                 kind: 'audio',
    //                 name: 'webshare'
    //             }]
    //         }]
    //     }],

    // });
//   const {
//     LIVEKIT_SERVER_URL,
//     LIVEKIT_API_KEY,
//     LIVEKIT_API_SECRET,
//   } = process.env;

  const LIVEKIT_API_KEY = 'APILeUVtb79wzmW';
  const LIVEKIT_API_SECRET = 'suWBOvr1tqLDRlNvrDZxpERwl5b02sJ9ZNPEQHw1mnN';
  const LIVEKIT_SERVER_URL = 'wss://omnissiah-university-kmuz0plz.livekit.cloud';

//   if (!LIVEKIT_SERVER_URL || !LIVEKIT_API_KEY || !LIVEKIT_API_SECRET) {
//     return res.status(500).json({ error: 'LiveKit environment not configured' });
//   }

  try {
    const svc = new RoomServiceClient(LIVEKIT_SERVER_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

    const rooms = await svc.listRooms();
    // rooms: Array<{ name: string, ...otherRoomInfo }>

    const detailedRooms = [];
    for (const room of rooms) {
      const participants = await svc.listParticipants(room.name);
      // participants: Array<{ identity: string, ...; tracks: Array<{ trackSid: string, name: string, kind: 'audio'|'video', muted: boolean }> }>

      detailedRooms.push({
        name: room.name,
        participants: participants.map(p => ({
          identity: p.identity,
          tracks: p.tracks.map(t => ({
            sid: t.trackSid,
            kind: t.kind,
            name: t.name
          }))
        }))
      });
    }

    res.status(200).json({ rooms: detailedRooms });
  } catch (error) {
    console.error('Error listing rooms:', error);
    res.status(500).json({ error: 'Failed to list rooms' });
  }
}