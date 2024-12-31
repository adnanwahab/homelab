'use client'

import { createClient } from '@supabase/supabase-js'
import { useState } from 'react'

export default function Chat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Array<{ content: string, created_at: string }>>([])

  const supabaseUrl = process.env.SUPABASE_URL || "https://ewkxvbgbzikwwudriebh.supabase.co"
  const supabaseKey = process.env.SUPABASE_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y"
  const supabase = createClient(supabaseUrl, supabaseKey)
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim()) return

    // Insert message into Supabase
    const { error } = await supabase
      .from('messages')
      .insert([
        { content: message, key: 'twitch_plays_robot' }
      ])

    if (error) {
      console.error('Error sending message:', error)
      return
    }

    setMessage('')
    fetchMessages()
  }

  const fetchMessages = async () => {
    const { data, error } = await supabase
      .from('messages')
      .select('content, created_at')
      .eq('key', 'twitch_plays_robot')
      .order('created_at', { ascending: false })
      .limit(50)

    // if (error) {
    //   console.error('Error fetching messages:', error)
    //   return
    // }

    setMessages(data || [])
  }

  return (
    <div className="max-w-2xl mx-auto p-4">
      <div className="bg-gray-800 p-4 rounded-lg mb-4 h-96 overflow-y-auto">
        {messages.map((msg, i) => (
          <div key={i} className="mb-2">
            <p className="text-gray-200">{msg.content}</p>
            <small className="text-gray-400">
              {new Date(msg.created_at).toLocaleString()}
            </small>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 px-4 py-2 border rounded bg-gray-700 text-gray-200 placeholder-gray-400"
          placeholder="Type your message..."
        />
        <button 
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  )
}
