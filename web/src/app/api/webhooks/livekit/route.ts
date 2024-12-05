//https://gpu.jerboa-kokanue.ts.net/api/webhooks/livekit

import fs from "fs";

export async function GET(request) {
  return new Response('Hello World', { status: 200 });
}

export async function POST(request) {
    try {
      const body = await request.json();
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');
      console.log('LIVEKITCLI');

      // Append to webhook.json file
      const webhookPath = '/home/adnan/webhook.json';
      
      // Add timestamp to the event
      const eventWithTimestamp = {
        timestamp: new Date().toISOString(),
        event: body
      };

      // Create file with empty array if it doesn't exist
      if (!fs.existsSync(webhookPath)) {
        fs.writeFileSync(webhookPath, '[]');
      }

      // Read existing data
      const existingData = JSON.parse(fs.readFileSync(webhookPath, 'utf8'));
      
      // Append new event
      existingData.push(eventWithTimestamp);
      
      // Write back to file
      fs.writeFileSync(webhookPath, JSON.stringify(existingData, null, 2));

      console.log('Webhook event logged to file');
      return new Response('Webhook received and logged', { status: 200 });
    } catch (error) {
      console.error('Error handling LiveKit webhook:', error);
      return new Response('Internal Server Error', { status: 500 });
    }
}