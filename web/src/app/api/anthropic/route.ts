//import Anthropic from '@anthropic-ai/sdk';
import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { messages } = await req.json();
    
//     const client = new Anthropic({
//       apiKey: process.env.ANTHROPIC_API_KEY!, // Make sure to add this to your .env
//     });

//     const stream = await client.messages.create({
//       max_tokens: 1024,
//       messages,
//       model: 'claude-3-sonnet-20240229',
//       stream: true,
//     });

//     // Create a streaming response
//     const streamResponse = new TransformStream();
//     const writer = streamResponse.writable.getWriter();

//     // Process the stream
//     (async () => {
//       try {
//         for await (const chunk of stream) {
//           await writer.write(
//             `data: ${JSON.stringify(chunk)}\n\n`
//           );
//         }
//       } catch (error) {
//         console.error('Streaming error:', error);
//       } finally {
//         await writer.close();
//       }
//     })();

//     return new NextResponse(streamResponse.readable, {
//       headers: {
//         'Content-Type': 'text/event-stream',
//         'Cache-Control': 'no-cache',
//         'Connection': 'keep-alive',
//       },
//     });

//   } catch (error) {
//     console.error('API error:', error);
//     return NextResponse.json(
//       { error: 'Internal Server Error' },
//       { status: 500 }
//     );
//   }
// }

// Keep the GET method if you need it for health checks
export async function GET() {
  return NextResponse.json({ status: 'ok' });
}


