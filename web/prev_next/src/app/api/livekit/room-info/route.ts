import { RoomServiceClient } from 'livekit-server-sdk';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    return NextResponse.json({ 
        
        
        rooms: [{
            name: 'webshare',
            participants: [{
                identity: 'webshare',
                tracks: [{
                    sid: '123',
                    kind: 'audio',
                    name: 'webshare'
                }]
            }]
        }],

    });
//   const {
//     LIVEKIT_SERVER_URL,
//     LIVEKIT_API_KEY,
//     LIVEKIT_API_SECRET,
//   } = process.env;

}