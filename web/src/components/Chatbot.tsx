
'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();

      const botMessage = { role: 'bot', content: data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error communicating with the bot:', error);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '2rem' }}>
      <h1>Ollama Chatbot</h1>
      <div style={{ border: '1px solid #ccc', padding: '1rem', height: '400px', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <p key={index}>
            <strong>{msg.role === 'user' ? 'You' : 'Bot'}:</strong> {msg.content}
          </p>
        ))}
      </div>
      <div style={{ marginTop: '1rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          style={{ width: 'calc(100% - 80px)', padding: '0.5rem' }}
          className='border border-gray-300 rounded-md p-2 text-blue-900'
        />
        <button onClick={sendMessage} style={{ padding: '0.5rem', marginLeft: '0.5rem' }}>
          Send
        </button>
      </div>
    </div>
  );
}