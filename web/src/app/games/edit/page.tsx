'use client'
import React, {useState} from 'react';
import Editor from './editor';

import WebGL from './viewer';
import ThreeSVGScene from './SVG_Renderer';
import Css_Renderer from './Css_Renderer';


export default function App() {
  const [renderer, setRenderer] = useState('webgl');
  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h1 className="font-semibold tracking-wide">My Cool LightTable-Inspired Editor</h1>
        <button onClick={() => setRenderer('webgl')} className="bg-blue-500 text-white px-4 py-2 rounded-md">WebGL</button>
        <button onClick={() => setRenderer('svg')} className="bg-blue-500 text-white px-4 py-2 rounded-md">SVG_Renderer</button>
        <button onClick={() => setRenderer('css')} className="bg-blue-500 text-white px-4 py-2 rounded-md">Css3_renderer</button>
        <button onClick={() => setRenderer('ssr')} className="bg-blue-500 text-white px-4 py-2 rounded-md">WebGPU_SSR</button>

      </header>
      
      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div className="w-1/2 border-r border-gray-800 flex flex-col">
          <Editor />
        </div>

        {/* Right: Viewer */}
        <div className="w-1/2 flex flex-col">
           {renderer === 'webgl' && <WebGL />}
           {renderer === 'svg' && <ThreeSVGScene />}
           {renderer === 'css' && <Css_Renderer />}
        </div>
      </div>
    </div>
  );
}