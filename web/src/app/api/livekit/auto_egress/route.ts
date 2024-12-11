export async function GET() {}
// import { NextResponse } from 'next/server';
// import { roomService } from '@/lib/livekit';
// import fs from 'fs';
// import os from 'os';
// import path from 'path';
// import { exec } from 'child_process';
// import { promisify } from 'util';

// //import { EgressClient } from 'livekit-server-sdk';

// export async function GET(request: Request) {
//   const apiKey = process.env.LIVEKIT_API_KEY;
//   const apiSecret = process.env.LIVEKIT_API_SECRET;
//   const host = 'wss://omnissiah-university-kmuz0plz.livekit.cloud';

//   if (!apiKey || !apiSecret || !host) {
//     return NextResponse.json(
//       { error: 'Missing LiveKit configuration' },
//       { status: 500 }
//     );
//   }

//   const { searchParams } = new URL(request.url);
//   const trackId = searchParams.get('trackId');

//   const egress_json_location = `/Users/shelbernstein/homelab/web/src/app/api/livekit/auto_egress/egress.json`;
// //   const mock_egress = {
// //     "room_name": "shit",
// //     "track_id": trackId,
// //     "websocket_url": host
// //   };

//   fs.writeFileSync(egress_json_location, JSON.stringify(mock_egress));

//   // Simplified command without --output-dir since it's specified in the JSON
//   const save_stream = `lk egress start --api-key ${apiKey} --api-secret ${apiSecret} --url ${host} --type track ${egress_json_location}`;

// //lk egress start --api-key ${apiKey} --api-secret ${apiSecret} --url ${host} --type track --output ${outputDir} ${egress_json_location}
//   //egress start web
//   //webress start particpant
//   const execAsync = promisify(exec);
//   const { stdout, stderr } = await execAsync(save_stream);

//   if (stderr) {
//     console.error('Error starting egress:', stderr);
//     return NextResponse.json({ error: 'Failed to start egress' }, { status: 500 });
//   }

//   console.log('Egress started successfully:', stdout);
//   return NextResponse.json({ status: 'logged' });
// }
