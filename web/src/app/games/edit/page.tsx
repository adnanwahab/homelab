"use client";
//1. english -> llama
//2. observable - diagram generator = inspect game
//3. live-render game x 16
//4. ????

import React, { useState } from "react";
import Editor from "./editor";

import WebGL from "./viewer";
import ThreeSVGScene from "./SVG_Renderer";
import Css_Renderer from "./Css_Renderer";
import { MultiEditor } from "./multi_editor";

export default function App() {
  const [renderer, setRenderer] = useState("webgl");
  const [splitPosition, setSplitPosition] = useState(50);

  const handleResize = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startSplit = splitPosition;

    const handleMouseMove = (e: MouseEvent) => {
      const delta = e.clientX - startX;
      const newSplit = Math.min(
        Math.max(20, startSplit + (delta / window.innerWidth) * 100),
        80,
      );
      setSplitPosition(newSplit);
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-gray-900 text-gray-100">
      <header className="p-4 border-b border-gray-800 flex items-center justify-between bg-gray-900 shadow-sm">
        <h1 className="font-mono text-lg tracking-wide shiny-text">
          My Cool LightTable-Inspired Editor!
        </h1>
        <div className="inline-flex rounded-md border border-gray-700 overflow-hidden shadow-sm">
          {[
            { id: "webgl", label: "WebGL", icon: "⬡" },
            { id: "svg", label: "SVG", icon: "✎" },
            { id: "css", label: "CSS3", icon: "⧉" },
            { id: "ssr", label: "WebGPU SSR", icon: "◪" },
          ].map(({ id, label, icon }) => (
            <button
              key={id}
              onClick={() => setRenderer(id)}
              className={`px-3 py-1 flex items-center gap-2 transition-colors
                ${
                  renderer === id
                    ? "bg-blue-700 text-white"
                    : "bg-gray-800 text-gray-400 hover:bg-gray-700"
                }`}
              title={label}
            >
              <span className="hidden sm:inline">{label}</span>
              <span className="sm:hidden">{icon}</span>
            </button>
          ))}
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Left: Editor */}
        <div
          className="border-r border-gray-800 flex flex-col bg-gray-800 focus-within:shadow-lg transition-shadow"
          style={{ width: `${splitPosition}%` }}
        >
          <Editor />
        </div>

        {/* Resizer */}
        <div
          className="w-1 hover:bg-blue-600 cursor-col-resize transition-colors"
          onMouseDown={handleResize}
        />

        {/* Right: Viewer */}
        <div
          className="flex flex-col bg-gray-900"
          style={{ width: `${100 - splitPosition}%` }}
        >
          {/* {renderer === 'webgl' && <WebGL />}
          {renderer === 'svg' && <ThreeSVGScene />}
          {renderer === 'css' && <Css_Renderer />} */}
          <MultiEditor />

          <iframe
            width="100%"
            height="500"
            className="bg-white"
            src="https://observablehq.com/embed/@enjalot/replicate-api-controlnet-scribble?cells=viewof+input"
          ></iframe>
        </div>
      </div>
    </div>
  );
}
