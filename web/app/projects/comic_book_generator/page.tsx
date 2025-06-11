'use client'

import React, { useState, useRef } from 'react';
import { Download, Plus, Trash2, Move, Type, Users, Palette } from 'lucide-react';

const ComicGenerator = () => {
  const [panels, setPanels] = useState([
    {
      id: 1,
      layout: 'single',
      scenes: [{
        id: 1,
        background: '#87CEEB',
        character: 'hero',
        dialogue: 'Hello there!',
        position: { x: 50, y: 60 }
      }]
    }
  ]);
  
  const [selectedPanel, setSelectedPanel] = useState(0);
  const [selectedScene, setSelectedScene] = useState(0);
  const canvasRef = useRef(null);

  const layouts = {
    single: { cols: 1, rows: 1 },
    horizontal: { cols: 2, rows: 1 },
    vertical: { cols: 1, rows: 2 },
    grid: { cols: 2, rows: 2 }
  };

  const characters = {
    hero: { color: '#FF6B6B', symbol: '🦸‍♂️' },
    villain: { color: '#4ECDC4', symbol: '🦹‍♀️' },
    sidekick: { color: '#45B7D1', symbol: '👦' },
    civilian: { color: '#96CEB4', symbol: '👤' }
  };

  const backgrounds = [
    '#87CEEB', '#98FB98', '#DDA0DD', '#F0E68C', 
    '#FFB6C1', '#20B2AA', '#FF7F50', '#9370DB'
  ];

  const addPanel = () => {
    const newPanel = {
      id: Date.now(),
      layout: 'single',
      scenes: [{
        id: Date.now(),
        background: '#87CEEB',
        character: 'hero',
        dialogue: 'New scene!',
        position: { x: 50, y: 60 }
      }]
    };
    setPanels([...panels, newPanel]);
    setSelectedPanel(panels.length);
    setSelectedScene(0);
  };

  const updateCurrentScene = (updates) => {
    const newPanels = [...panels];
    const currentPanel = newPanels[selectedPanel];
    if (currentPanel && currentPanel.scenes[selectedScene]) {
      currentPanel.scenes[selectedScene] = {
        ...currentPanel.scenes[selectedScene],
        ...updates
      };
      setPanels(newPanels);
    }
  };

  const changeLayout = (layout) => {
    const newPanels = [...panels];
    const currentPanel = newPanels[selectedPanel];
    if (!currentPanel) return;

    const { cols, rows } = layouts[layout];
    const totalScenes = cols * rows;
    
    // Adjust scenes to match layout
    const currentScenes = currentPanel.scenes || [];
    const newScenes = [];
    
    for (let i = 0; i < totalScenes; i++) {
      if (currentScenes[i]) {
        newScenes.push(currentScenes[i]);
      } else {
        newScenes.push({
          id: Date.now() + i,
          background: backgrounds[i % backgrounds.length],
          character: Object.keys(characters)[i % Object.keys(characters).length],
          dialogue: `Scene ${i + 1}`,
          position: { x: 50, y: 60 }
        });
      }
    }
    
    currentPanel.layout = layout;
    currentPanel.scenes = newScenes;
    setPanels(newPanels);
    setSelectedScene(0);
  };

  const deletePanel = (index) => {
    if (panels.length > 1) {
      const newPanels = panels.filter((_, i) => i !== index);
      setPanels(newPanels);
      setSelectedPanel(Math.max(0, selectedPanel - 1));
      setSelectedScene(0);
    }
  };

  const exportComic = () => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const panelWidth = 300;
    const panelHeight = 200;
    const margin = 20;
    
    canvas.width = panelWidth * Math.ceil(Math.sqrt(panels.length)) + margin * 2;
    canvas.height = panelHeight * Math.ceil(panels.length / Math.ceil(Math.sqrt(panels.length))) + margin * 2;
    
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    panels.forEach((panel, panelIndex) => {
      const col = panelIndex % Math.ceil(Math.sqrt(panels.length));
      const row = Math.floor(panelIndex / Math.ceil(Math.sqrt(panels.length)));
      const panelX = col * panelWidth + margin;
      const panelY = row * panelHeight + margin;
      
      // Draw panel border
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 3;
      ctx.strokeRect(panelX, panelY, panelWidth, panelHeight);
      
      const { cols, rows } = layouts[panel.layout];
      const sceneWidth = panelWidth / cols;
      const sceneHeight = panelHeight / rows;
      
      panel.scenes.forEach((scene, sceneIndex) => {
        const sceneCol = sceneIndex % cols;
        const sceneRow = Math.floor(sceneIndex / cols);
        const sceneX = panelX + sceneCol * sceneWidth;
        const sceneY = panelY + sceneRow * sceneHeight;
        
        // Draw scene background
        ctx.fillStyle = scene.background;
        ctx.fillRect(sceneX, sceneY, sceneWidth, sceneHeight);
        
        // Draw scene border if multiple scenes
        if (panel.scenes.length > 1) {
          ctx.strokeStyle = '#666';
          ctx.lineWidth = 1;
          ctx.strokeRect(sceneX, sceneY, sceneWidth, sceneHeight);
        }
        
        // Draw character
        const charX = sceneX + (scene.position.x / 100) * sceneWidth;
        const charY = sceneY + (scene.position.y / 100) * sceneHeight;
        
        ctx.fillStyle = characters[scene.character].color;
        ctx.beginPath();
        ctx.arc(charX, charY, 15, 0, 2 * Math.PI);
        ctx.fill();
        
        // Draw dialogue
        if (scene.dialogue) {
          ctx.fillStyle = '#fff';
          ctx.fillRect(sceneX + 5, sceneY + 5, sceneWidth - 10, 25);
          ctx.strokeStyle = '#000';
          ctx.strokeRect(sceneX + 5, sceneY + 5, sceneWidth - 10, 25);
          
          ctx.fillStyle = '#000';
          ctx.font = '12px Arial';
          ctx.textAlign = 'left';
          ctx.fillText(scene.dialogue.substring(0, 25), sceneX + 10, sceneY + 20);
        }
      });
    });
    
    // Download
    const link = document.createElement('a');
    link.download = 'comic.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  const currentPanel = panels[selectedPanel];
  const currentScene = currentPanel?.scenes[selectedScene];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Comic Book Generator</h1>
          <p className="text-gray-600">Create your own comic panels with characters and dialogue</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Control Panel */}
          <div className="lg:col-span-1 space-y-6">
            {/* Panel Controls */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Move className="w-5 h-5 mr-2" />
                Panel Controls
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Layout</label>
                  <select 
                    value={currentPanel?.layout || 'single'}
                    onChange={(e) => changeLayout(e.target.value)}
                    className="w-full p-2 border rounded-lg"
                  >
                    <option value="single">Single Panel</option>
                    <option value="horizontal">2 Horizontal</option>
                    <option value="vertical">2 Vertical</option>
                    <option value="grid">2x2 Grid</option>
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={addPanel}
                    className="flex-1 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Add Panel
                  </button>
                  <button
                    onClick={exportComic}
                    className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 flex items-center justify-center"
                  >
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </button>
                </div>
              </div>
            </div>

            {/* Scene Controls */}
            {currentScene && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <Type className="w-5 h-5 mr-2" />
                  Scene Editor
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Character</label>
                    <select 
                      value={currentScene.character}
                      onChange={(e) => updateCurrentScene({ character: e.target.value })}
                      className="w-full p-2 border rounded-lg"
                    >
                      {Object.entries(characters).map(([key, char]) => (
                        <option key={key} value={key}>
                          {char.symbol} {key.charAt(0).toUpperCase() + key.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Background</label>
                    <div className="grid grid-cols-4 gap-2">
                      {backgrounds.map((bg, index) => (
                        <button
                          key={index}
                          onClick={() => updateCurrentScene({ background: bg })}
                          className={`w-12 h-12 rounded-lg border-2 ${
                            currentScene.background === bg ? 'border-gray-800' : 'border-gray-300'
                          }`}
                          style={{ backgroundColor: bg }}
                        />
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Dialogue</label>
                    <textarea
                      value={currentScene.dialogue}
                      onChange={(e) => updateCurrentScene({ dialogue: e.target.value })}
                      className="w-full p-2 border rounded-lg h-20 resize-none"
                      placeholder="Enter dialogue..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Character Position</label>
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="text-xs text-gray-500">X: {currentScene.position.x}%</label>
                        <input
                          type="range"
                          min="10"
                          max="90"
                          value={currentScene.position.x}
                          onChange={(e) => updateCurrentScene({ 
                            position: { ...currentScene.position, x: parseInt(e.target.value) }
                          })}
                          className="w-full"
                        />
                      </div>
                      <div>
                        <label className="text-xs text-gray-500">Y: {currentScene.position.y}%</label>
                        <input
                          type="range"
                          min="20"
                          max="80"
                          value={currentScene.position.y}
                          onChange={(e) => updateCurrentScene({ 
                            position: { ...currentScene.position, y: parseInt(e.target.value) }
                          })}
                          className="w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Comic Display */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Comic Preview</h3>
              
              {/* Panel Tabs */}
              <div className="flex flex-wrap gap-2 mb-4">
                {panels.map((panel, index) => (
                  <div key={panel.id} className="flex items-center">
                    <button
                      onClick={() => {
                        setSelectedPanel(index);
                        setSelectedScene(0);
                      }}
                      className={`px-3 py-1 rounded-l-lg ${
                        selectedPanel === index 
                          ? 'bg-purple-500 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Panel {index + 1}
                    </button>
                    {panels.length > 1 && (
                      <button
                        onClick={() => deletePanel(index)}
                        className="px-2 py-1 bg-red-500 text-white rounded-r-lg hover:bg-red-600"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Comic Panel Display */}
              {currentPanel && (
                <div className="border-4 border-black rounded-lg p-4 bg-white mb-4">
                  <div 
                    className={`grid gap-2 h-96 ${
                      currentPanel.layout === 'horizontal' ? 'grid-cols-2 grid-rows-1' :
                      currentPanel.layout === 'vertical' ? 'grid-cols-1 grid-rows-2' :
                      currentPanel.layout === 'grid' ? 'grid-cols-2 grid-rows-2' :
                      'grid-cols-1 grid-rows-1'
                    }`}
                  >
                    {currentPanel.scenes.map((scene, sceneIndex) => (
                      <div
                        key={scene.id}
                        onClick={() => setSelectedScene(sceneIndex)}
                        className={`relative border-2 rounded cursor-pointer transition-all ${
                          selectedScene === sceneIndex 
                            ? 'border-purple-500 shadow-lg' 
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                        style={{ backgroundColor: scene.background }}
                      >
                        {/* Dialogue Box */}
                        {scene.dialogue && (
                          <div className="absolute top-2 left-2 right-2 bg-white border-2 border-black rounded-lg p-2 text-sm z-10">
                            <div className="font-comic leading-tight">
                              {scene.dialogue}
                            </div>
                          </div>
                        )}
                        
                        {/* Character */}
                        <div
                          className="absolute w-8 h-8 rounded-full flex items-center justify-center text-lg transform -translate-x-1/2 -translate-y-1/2 shadow-lg"
                          style={{ 
                            backgroundColor: characters[scene.character].color,
                            left: `${scene.position.x}%`,
                            top: `${scene.position.y}%`
                          }}
                        >
                          {characters[scene.character].symbol}
                        </div>
                        
                        {/* Scene Number */}
                        <div className="absolute bottom-1 right-1 text-xs text-gray-600">
                          {sceneIndex + 1}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Scene Selector for Multi-scene Panels */}
              {currentPanel && currentPanel.scenes.length > 1 && (
                <div className="flex gap-2 flex-wrap">
                  {currentPanel.scenes.map((scene, index) => (
                    <button
                      key={scene.id}
                      onClick={() => setSelectedScene(index)}
                      className={`px-3 py-1 rounded text-sm ${
                        selectedScene === index
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Scene {index + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Hidden canvas for export */}
      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  );
};

export default ComicGenerator;