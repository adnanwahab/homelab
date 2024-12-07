'use client'

import React, { useState } from 'react';

const GameGrid = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const games = [
    { id: 1, title: "The Sims" },
    { id: 2, title: "Mario Party" },
    { id: 3, title: "Animal Crossing" },
    // ... Add all 183 games here
  ].map(game => ({
    ...game,
    image: `/api/placeholder/300/200`
  }));

  const filteredGames = games.filter(game =>
    game.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* Search Bar */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search games..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {/* Game Grid */}
      <div className="container mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {filteredGames.map((game) => (
            <div 
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105"
            >
              <img
                src={"https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExNnoxdmsyajd1ZHU0eW8wemh6N2doNzFvbjJuM242eHFlODlvazB2YSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KFhv3T1seYSJuak8TN/giphy.gif"}
                alt={game.title}
                className="w-full h-48 object-cover"
              />
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {game.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GameGrid;