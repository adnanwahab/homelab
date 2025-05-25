'use client'

import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Music } from 'lucide-react';

const KaraokeGame = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [score, setScore] = useState(0);
  const [currentSong, setCurrentSong] = useState(0);
  const [gameStarted, setGameStarted] = useState(false);
  const intervalRef = useRef(null);

  // Sample songs with lyrics and timing
  const songs = [
    {
      title: "Happy Birthday",
      artist: "Traditional",
      duration: 20000, // 20 seconds
      lyrics: [
        { text: "Happy birthday to you", start: 0, end: 4000 },
        { text: "Happy birthday to you", start: 4000, end: 8000 },
        { text: "Happy birthday dear friend", start: 8000, end: 12000 },
        { text: "Happy birthday to you", start: 12000, end: 16000 },
        { text: "🎉 Song Complete! 🎉", start: 16000, end: 20000 }
      ]
    },
    {
      title: "Twinkle Twinkle Little Star",
      artist: "Traditional",
      duration: 24000, // 24 seconds
      lyrics: [
        { text: "Twinkle twinkle little star", start: 0, end: 4000 },
        { text: "How I wonder what you are", start: 4000, end: 8000 },
        { text: "Up above the world so high", start: 8000, end: 12000 },
        { text: "Like a diamond in the sky", start: 12000, end: 16000 },
        { text: "Twinkle twinkle little star", start: 16000, end: 20000 },
        { text: "How I wonder what you are", start: 20000, end: 24000 }
      ]
    },
    {
      title: "Row Your Boat",
      artist: "Traditional",
      duration: 16000, // 16 seconds
      lyrics: [
        { text: "Row row row your boat", start: 0, end: 4000 },
        { text: "Gently down the stream", start: 4000, end: 8000 },
        { text: "Merrily merrily merrily merrily", start: 8000, end: 12000 },
        { text: "Life is but a dream", start: 12000, end: 16000 }
      ]
    }
  ];

  const currentSongData = songs[currentSong];

  // Find current lyric based on time
  const getCurrentLyric = () => {
    return currentSongData.lyrics.find(lyric => 
      currentTime >= lyric.start && currentTime < lyric.end
    );
  };

  const getNextLyric = () => {
    const currentLyric = getCurrentLyric();
    if (!currentLyric) return null;
    const currentIndex = currentSongData.lyrics.indexOf(currentLyric);
    return currentSongData.lyrics[currentIndex + 1] || null;
  };

  // Handle spacebar press for scoring
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.code === 'Space' && isPlaying) {
        event.preventDefault();
        const currentLyric = getCurrentLyric();
        if (currentLyric && !currentLyric.text.includes('🎉')) {
          setScore(prev => prev + 10);
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isPlaying, currentTime]);

  // Game timer
  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentTime(prev => {
          if (prev >= currentSongData.duration) {
            setIsPlaying(false);
            return currentSongData.duration;
          }
          return prev + 100;
        });
      }, 100);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPlaying, currentSongData.duration]);

  const startGame = () => {
    setGameStarted(true);
    setIsPlaying(true);
    setCurrentTime(0);
    setScore(0);
  };

  const pauseResume = () => {
    setIsPlaying(!isPlaying);
  };

  const resetGame = () => {
    setIsPlaying(false);
    setCurrentTime(0);
    setScore(0);
    setGameStarted(false);
  };

  const changeSong = (index) => {
    setCurrentSong(index);
    resetGame();
  };

  const formatTime = (ms) => {
    const seconds = Math.floor(ms / 1000);
    return `${Math.floor(seconds / 60)}:${(seconds % 60).toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / currentSongData.duration) * 100;

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-md w-full text-center">
          <div className="mb-6">
            <Music className="w-16 h-16 mx-auto text-pink-600 mb-4" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">Karaoke Game</h1>
            <p className="text-gray-600">Press SPACE when lyrics appear to score points!</p>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Choose a Song:</h3>
            <div className="space-y-2">
              {songs.map((song, index) => (
                <button
                  key={index}
                  onClick={() => changeSong(index)}
                  className={`w-full p-3 rounded-lg text-left transition-all ${
                    currentSong === index
                      ? 'bg-pink-100 border-2 border-pink-500 text-pink-700'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{song.title}</div>
                  <div className="text-sm opacity-75">{song.artist}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={startGame}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold text-lg hover:from-pink-600 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
          >
            Start Karaoke! 🎤
          </button>
        </div>
      </div>
    );
  }

  const currentLyric = getCurrentLyric();
  const nextLyric = getNextLyric();
  const isGameComplete = currentTime >= currentSongData.duration;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-6 mb-6 text-white">
          <div className="flex justify-between items-center mb-4">
            <div>
              <h1 className="text-2xl font-bold">{currentSongData.title}</h1>
              <p className="text-white/80">{currentSongData.artist}</p>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">Score: {score}</div>
              <div className="text-white/80">{formatTime(currentTime)} / {formatTime(currentSongData.duration)}</div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="w-full bg-white/20 rounded-full h-2 mb-4">
            <div 
              className="bg-white h-2 rounded-full transition-all duration-100"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>

          {/* Controls */}
          <div className="flex gap-4 justify-center">
            <button
              onClick={pauseResume}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all"
            >
              {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
            </button>
            <button
              onClick={resetGame}
              className="bg-white/20 hover:bg-white/30 p-3 rounded-full transition-all"
            >
              <RotateCcw className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Lyrics Display */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 text-center min-h-[300px] flex flex-col justify-center">
          {!isGameComplete ? (
            <>
              <div className="mb-8">
                <div className="text-4xl md:text-6xl font-bold text-gray-800 mb-4 min-h-[80px] flex items-center justify-center">
                  {currentLyric ? (
                    <span className="animate-pulse text-pink-600">
                      {currentLyric.text}
                    </span>
                  ) : (
                    <span className="text-gray-400 text-2xl">Get ready...</span>
                  )}
                </div>
                {nextLyric && (
                  <div className="text-xl text-gray-500">
                    Coming up: "{nextLyric.text}"
                  </div>
                )}
              </div>

              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6">
                <div className="text-lg text-gray-700 mb-2">
                  🎤 Press <span className="bg-pink-200 px-3 py-1 rounded-full font-mono font-bold">SPACE</span> when you see the lyrics!
                </div>
                <div className="text-sm text-gray-600">
                  Time it right to score points!
                </div>
              </div>
            </>
          ) : (
            <div className="text-center">
              <div className="text-6xl mb-4">🎉</div>
              <h2 className="text-4xl font-bold text-gray-800 mb-4">Song Complete!</h2>
              <div className="text-2xl text-pink-600 font-bold mb-6">Final Score: {score}</div>
              <div className="flex gap-4 justify-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-pink-500 to-purple-600 text-white py-3 px-6 rounded-xl font-semibold hover:from-pink-600 hover:to-purple-700 transition-all"
                >
                  Play Again
                </button>
                <button
                  onClick={() => setGameStarted(false)}
                  className="bg-gray-500 text-white py-3 px-6 rounded-xl font-semibold hover:bg-gray-600 transition-all"
                >
                  Change Song
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default KaraokeGame;