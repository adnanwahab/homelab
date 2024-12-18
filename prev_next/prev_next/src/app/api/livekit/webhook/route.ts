import { NextRequest, NextResponse } from 'next/server';
import { addEgressFile } from '@/lib/egressStore';
import { WebhookReceiver } from 'livekit-server-sdk';
import fs from 'fs';

// Initialize the webhook receiver with your credentials
const receiver = new WebhookReceiver(
  process.env.LIVEKIT_API_KEY!,
  process.env.LIVEKIT_API_SECRET!
);

export async function GET(request: NextRequest) {
  // Append the webhook data to file with timestamp
  const logEntry = {
    timestamp: new Date().toISOString(),
    data: {}
  };

  fs.appendFileSync(
    '/Users/shelbernstein/Desktop/livekit.txt', 
    JSON.stringify(logEntry, null, 2) + ',\n'
  );

  return NextResponse.json({ status: 'ok' });
}

export async function POST(request: NextRequest) {
  try {
    // Get the raw body text and authorization header
    const body = await request.text();
    const authorization = request.headers.get('Authorization');

    // Validate and parse the webhook
    const event = await receiver.receive(body, authorization || '');

    // Log the validated event
    const logEntry = {
      timestamp: new Date().toISOString(),
      data: event
    };

    fs.appendFileSync(
      '/Users/shelbernstein/Desktop/livekit.txt',
      JSON.stringify(logEntry, null, 2) + ',\n'
    );

    // Handle egress.ended event
    if (event.event === 'egress.ended' && event.egressInfo?.result?.file) {
      const fileData = event.egressInfo.result.file;
      await addEgressFile({
        roomName: event.roomName,
        fileUrl: fileData.download_url,
        startedAt: fileData.started_at,
        endedAt: fileData.ended_at
      });
    }

    return NextResponse.json({ status: 'ok' });
  } catch (error) {
    console.error('Webhook error:', error);
    return NextResponse.json({ error: 'Invalid webhook' }, { status: 400 });
  }
}