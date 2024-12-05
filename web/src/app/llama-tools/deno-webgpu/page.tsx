'use client';

import { useState } from 'react';
import fs from 'fs';

export default function Page() {
  const [imageData, setImageData] = useState<string | null>(null);

  const handleRunWebGPU = async () => {
    try {
      const response = await fetch('/api/run-webgpu', {
        method: 'POST',
      });
      
      if (!response.ok) {
        throw new Error('Failed to run WebGPU script');
      }
      
      const data = await response.json();
      setImageData(data.imageUrl);
    } catch (error) {
      console.error('Error running WebGPU:', error);
    }
  };

  return (
    <div className="p-4">
      <button 
        onClick={handleRunWebGPU}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Run WebGPU
      </button>
      
      {imageData && (
        <div className="mt-4">
          <img src={imageData} alt="WebGPU Output" />
        </div>
      )}
    </div>
  );
}
    