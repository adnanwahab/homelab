'use client'
import { useState, useRef, useEffect } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';

export default function SoundDashboard() {
  const [volume, setVolume] = useState(0.7);
  const [muted, setMuted] = useState(false);
  const [playingSound, setPlayingSound] = useState(null);
  const audioContextRef = useRef(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  // Sound generation functions
  const generateBeep = (frequency = 800, duration = 0.2, type = 'sine') => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.value = frequency;
    oscillator.type = type;
    
    gainNode.gain.setValueAtTime(muted ? 0 : volume * 0.3, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + duration);
  };

  const generateNoise = (duration = 0.3, filterFreq = 1000) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const bufferSize = ctx.sampleRate * duration;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    
    const source = ctx.createBufferSource();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();
    
    source.buffer = buffer;
    filter.type = 'lowpass';
    filter.frequency.value = filterFreq;
    
    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    gainNode.gain.value = muted ? 0 : volume * 0.2;
    
    source.start();
  };

  const generateDrum = (frequency = 60) => {
    if (!audioContextRef.current) return;
    
    const ctx = audioContextRef.current;
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    oscillator.type = 'triangle';
    
    gainNode.gain.setValueAtTime(muted ? 0 : volume * 0.5, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    
    oscillator.start(ctx.currentTime);
    oscillator.stop(ctx.currentTime + 0.5);
  };

  const playSound = (soundName, soundFunction) => {
    setPlayingSound(soundName);
    soundFunction();
    setTimeout(() => setPlayingSound(null), 300);
  };

  const soundCategories = [
    {
      title: "UI Sounds",
      color: "from-blue-500 to-purple-600",
      sounds: [
        { name: "Click", fn: () => generateBeep(1000, 0.1) },
        { name: "Success", fn: () => generateBeep(800, 0.2) },
        { name: "Error", fn: () => generateBeep(300, 0.3, 'sawtooth') },
        { name: "Notification", fn: () => generateBeep(600, 0.4, 'triangle') },
        { name: "Button Press", fn: () => generateBeep(1200, 0.08) },
        { name: "Menu Open", fn: () => generateBeep(500, 0.15, 'square') }
      ]
    },
    {
      title: "Game Sounds",
      color: "from-green-500 to-teal-600",
      sounds: [
        { name: "Power Up", fn: () => generateBeep(1500, 0.3, 'triangle') },
        { name: "Coin Collect", fn: () => generateBeep(1800, 0.1) },
        { name: "Jump", fn: () => generateBeep(400, 0.2, 'square') },
        { name: "Laser", fn: () => generateBeep(2000, 0.15, 'sawtooth') },
        { name: "Explosion", fn: () => generateNoise(0.4, 200) },
        { name: "Level Complete", fn: () => generateBeep(1000, 0.5) }
      ]
    },
    {
      title: "Electronic",
      color: "from-purple-500 to-pink-600",
      sounds: [
        { name: "Synth Lead", fn: () => generateBeep(880, 0.6, 'sawtooth') },
        { name: "Bass Drop", fn: () => generateBeep(80, 0.8, 'triangle') },
        { name: "Glitch", fn: () => generateNoise(0.2, 5000) },
        { name: "Sweep Up", fn: () => generateBeep(200, 0.5, 'triangle') },
        { name: "Zap", fn: () => generateBeep(3000, 0.1, 'square') },
        { name: "Robot Voice", fn: () => generateBeep(150, 0.4, 'sawtooth') }
      ]
    },
    {
      title: "Percussion",
      color: "from-red-500 to-orange-600",
      sounds: [
        { name: "Kick Drum", fn: () => generateDrum(60) },
        { name: "Snare", fn: () => generateNoise(0.1, 2000) },
        { name: "Hi-Hat", fn: () => generateNoise(0.05, 8000) },
        { name: "Tom", fn: () => generateDrum(120) },
        { name: "Cymbal", fn: () => generateNoise(0.8, 3000) },
        { name: "Clap", fn: () => generateNoise(0.1, 1500) }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Sound FX Dashboard
          </h1>
          <p className="text-xl text-gray-300">Click any button to play synthesized sound effects</p>
        </div>

        {/* Volume Control */}
        <div className="fixed top-6 right-6 bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMuted(!muted)}
              className="p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              {muted ? <VolumeX className="w-5 h-5 text-white" /> : <Volume2 className="w-5 h-5 text-white" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-24 accent-purple-500"
            />
          </div>
        </div>

        {/* Sound Categories */}
        <div className="space-y-12">
          {soundCategories.map((category, categoryIndex) => (
            <div
              key={category.title}
              className="bg-white/10 backdrop-blur-md rounded-2xl p-8 border border-white/20"
            >
              <h2 className="text-3xl font-bold text-white mb-8 text-center">
                {category.title}
              </h2>
              
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                {category.sounds.map((sound, soundIndex) => (
                  <button
                    key={sound.name}
                    onClick={() => playSound(sound.name, sound.fn)}
                    className={`
                      relative overflow-hidden p-6 rounded-xl font-semibold text-white
                      transform transition-all duration-200 hover:scale-105 hover:shadow-2xl
                      active:scale-95 bg-gradient-to-br ${category.color}
                      ${playingSound === sound.name ? 'animate-pulse ring-4 ring-white/50' : ''}
                    `}
                  >
                    <div className="relative z-10 flex flex-col items-center gap-2">
                      {playingSound === sound.name ? (
                        <Pause className="w-6 h-6" />
                      ) : (
                        <Play className="w-6 h-6" />
                      )}
                      <span className="text-sm font-medium text-center">
                        {sound.name}
                      </span>
                    </div>
                    
                    {/* Animated background effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="text-center mt-16 text-gray-400">
          <p>All sounds are generated using Web Audio API • No external files required</p>
        </div>
      </div>
    </div>
  );
}