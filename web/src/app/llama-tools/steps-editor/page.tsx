'use client'
import React, { useState } from 'react';

const YouTubePanelLayout = () => {
  const [inputText, setInputText] = useState('');
  const [currentTime, setCurrentTime] = useState(64.5); // Default to 64.5 seconds

  const handleInputChange = (e) => {
    setInputText(e.target.value);
    // In a real implementation, this would trigger YouTube time update
    setCurrentTime(64.5);
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Left Panel */}
      <div className="w-1/2 p-4 bg-white shadow-lg">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">Control Panel</h2>
          <textarea
            className="w-full p-2 border rounded-lg h-32 resize-none"
            placeholder="Type something to jump to 64.5..."
            value={inputText}
            onChange={handleInputChange}
          />
        </div>
        
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Drawing Area</h3>
          <div className="border-2 border-dashed border-gray-300 rounded-lg h-64 flex items-center justify-center">
            <p className="text-gray-500">Drawing canvas would go here</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-sm text-gray-600">
            Current Time: {currentTime} seconds
          </p>
        </div>
      </div>

      {/* Right Panel */}
      <div className="w-1/2 p-4 bg-gray-50">
        <div className="bg-black aspect-video rounded-lg flex items-center justify-center">
          <p className="text-white">YouTube Player would be embedded here</p>
          {/* 
            In a real implementation, you would use the YouTube Player API:
            <iframe
              src="https://www.youtube.com/embed/VIDEO_ID"
              className="w-full h-full"
              allowFullScreen
            />
          */}
        </div>
      </div>
    </div>
  );
};

export default YouTubePanelLayout;