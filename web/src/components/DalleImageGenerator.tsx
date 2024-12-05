'use client';

import { useState } from 'react';
import Image from 'next/image';

const presetPrompts = [
  {
    title: "Dynabot",
    prompt: "A futuristic, sleek-looking robot inspired by a dinosaur design with an articulating arm, featuring LED lights and a clean finish. Include a subtle $300 price tag. Style: minimalistic, high-tech, 2025 aesthetic"
  },
  {
    title: "File Viewer",
    prompt: "A professional yet friendly UI interface with interlocking cogs and smiling file icons, representing a Hugging Face file viewer tool. Style: modern, approachable, tech-friendly"
  },
  {
    title: "WebGPU Editor",
    prompt: "A 3D development environment showing advanced graphics with complex geometries and vibrant colors, featuring three.js and WebGPU elements. Style: technical, creative, dynamic"
  }
];

export default function DalleImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const generateImage = async (promptText: string) => {
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch('/api/dalle', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: promptText }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setImageUrl(data.imageUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">DALL-E Image Generator</h2>
      
      <div className="space-y-4">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="w-full h-32 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter your image prompt..."
        />
        
        <div className="flex flex-wrap gap-2">
          {presetPrompts.map((preset) => (
            <button
              key={preset.title}
              onClick={() => {
                setPrompt(preset.prompt);
                generateImage(preset.prompt);
              }}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {preset.title}
            </button>
          ))}
        </div>

        <button
          onClick={() => generateImage(prompt)}
          disabled={loading || !prompt}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-md hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>
      </div>

      {error && (
        <div className="p-4 text-red-700 bg-red-100 rounded-md">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="relative aspect-square w-full rounded-lg overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt="Generated image"
            fill
            className="object-cover"
          />
        </div>
      )}
    </div>
  );
}