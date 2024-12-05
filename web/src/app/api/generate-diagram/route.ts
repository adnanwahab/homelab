export async function GET () {
  return undefined
}

// import { NextResponse } from 'next/server'
// import Anthropic from '@anthropic-ai/sdk'

// const anthropic = new Anthropic({
//   apiKey: process.env.ANTHROPIC_API_KEY
// })

// export async function POST(request: Request) {
//   try {
//     const { prompt } = await request.json()

//     if (!prompt) {
//       return NextResponse.json(
//         { error: 'Prompt is required' },
//         { status: 400 }
//       )
//     }

//     const message = await anthropic.messages.create({
//       model: 'claude-3-sonnet-20240229',
//       max_tokens: 4096,
//       messages: [{
//         role: 'user',
//         content: `Generate a diagram based on this prompt: ${prompt}. 
//                   Please provide the diagram in Mermaid markdown format.`
//       }],
//     })

//     const diagramCode = message.content[0].text

//     return NextResponse.json({ diagram: diagramCode })

//   } catch (error) {
//     console.error('Error generating diagram:', error)
//     return NextResponse.json(
//       { error: 'Failed to generate diagram' },
//       { status: 500 }
//     )
//   }
// }
