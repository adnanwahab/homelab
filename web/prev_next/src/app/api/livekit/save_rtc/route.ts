import { NextResponse } from 'next/server';
import { EgressClient } from 'livekit-server-sdk';

const LIVEKIT_API_KEY = process.env.LIVEKIT_API_KEY || '';
const LIVEKIT_API_SECRET = process.env.LIVEKIT_API_SECRET || '';
const LIVEKIT_WS_URL = process.env.LIVEKIT_WS_URL || '';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const trackId = searchParams.get('trackId');

  if (!trackId) {
    return NextResponse.json({ error: 'Track ID is required' }, { status: 400 });
  }

  const egressClient = new EgressClient(LIVEKIT_WS_URL, LIVEKIT_API_KEY, LIVEKIT_API_SECRET);

  try {
    const result = await egressClient.startTrackEgress({
      trackId,
      file: {
        filepath: `/tmp/recordings/${trackId}.mp4`,
      },
    });

    return NextResponse.json({ 
      message: 'Egress started successfully',
      egressId: result.egressId,
      status: result.status 
    });

  } catch (error) {
    console.error('Error starting egress:', error);
    return NextResponse.json({ error: 'Failed to start egress' }, { status: 500 });
  }
}