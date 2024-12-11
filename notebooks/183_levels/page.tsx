import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const LevelsGrid = () => {
  const levels = Array.from({ length: 183 }, (_, i) => i + 1);

  return (
    <div className="grid-container">
      {levels.map((level) => (
        <div key={level} className="grid-item">
          <Link href={`/music_game/183_levels/level_${level}`}>
            <div className="thumbnail-container aspect-square relative">
              <Image
                src={`/150_games/${level}.png`}
                alt={`Level ${level}`}
                width={500}
                height={500}
                className="w-full h-full object-cover"
              />
              {/* <span className="level-number">{level}</span> */}
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default LevelsGrid;