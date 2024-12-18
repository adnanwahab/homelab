'use client';

import React, { useState } from 'react';

function SimulatorPage() {
  const [timeValue, setTimeValue] = useState(50);
  const [abstractionLevel, setAbstractionLevel] = useState(2);

  const handleTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTimeValue(parseInt(event.target.value, 10));
  };

  const handleAbstractionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAbstractionLevel(parseInt(event.target.value, 10));
  };

  return (
    <div className="bg-gray-100 min-h-screen p-4">
      <div className="max-w-6xl mx-auto">
        {/* Top bar with sliders */}
        <div className="mb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-white rounded shadow">
            {/* Time Slider */}
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="time-slider" className="text-gray-700 mb-1 font-semibold">
                Time
              </label>
              <input
                id="time-slider"
                type="range"
                min="0"
                max="100"
                value={timeValue}
                onChange={handleTimeChange}
                className="w-full accent-blue-500"
              />
            </div>

            {/* Level-of-Abstraction Slider */}
            <div className="flex flex-col w-full sm:w-1/2">
              <label htmlFor="abstraction-slider" className="text-gray-700 mb-1 font-semibold">
                Level of Abstraction
              </label>
              <input
                id="abstraction-slider"
                type="range"
                min="1"
                max="4"
                step="1"
                value={abstractionLevel}
                onChange={handleAbstractionChange}
                className="w-full accent-green-500"
              />
              <div className="flex justify-between text-sm text-gray-500 mt-1">
                {[1, 2, 3, 4].map((level) => (
                  <span key={level}>{level}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Main 2-column grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-white rounded shadow p-4">
            {/* Left column content */}
            <h2 className="text-lg font-semibold mb-2">Left Column</h2>
            <p className="text-gray-700">Your content here</p>
          </div>

          <div className="bg-white rounded shadow p-4">
            {/* Right column content */}
            <h2 className="text-lg font-semibold mb-2">Right Column</h2>
            <p className="text-gray-700">Your content here</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SimulatorPage;