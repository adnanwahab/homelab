import { NextResponse } from 'next/server'

interface Message {
  role: 'system' | 'user' | 'assistant'
  content: string
}

export async function POST(req: Request) {
  try {
    const { messages } = await req.json()

    const response = await fetch('http://localhost:11434/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama3.2',
        messages: messages,
        stream: false,
      }),
    })

    const data = await response.json()

    return NextResponse.json({
      message: data.message,
      done: true,
    })

  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
