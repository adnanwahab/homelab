'use client'
import { ChevronLeft, ChevronRight } from "lucide-react";

const FullscreenSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = [
    {
      image: "/api/placeholder/1920/1080",
      text: "The curious elephant discovered a rainbow umbrella in the garden.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "Little stars danced around the sleeping moon at midnight.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The magical tree grew candy instead of leaves.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "Three purple penguins had a tea party on an ice cloud.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The friendly dragon taught mathematics to forest creatures.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "A tiny spaceship full of teddy bears landed in the backyard.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The musical fish orchestra performed under the sea.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The sleepy sunshine wore pajamas on a rainy day.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={content[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-6 text-white">
          <p className="text-center text-2xl font-bold">
            {content[currentIndex].text}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight size={40} />
      </button>

      {/* Page Indicator */}
      <div className="absolute bottom-24 w-full flex justify-center gap-2">
        {content.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

// export default FullscreenSlider;


import ModeSelector from '../ModeSelector'
import MultiplayerCanvas from './multiplayer-canvas';
//import Spline from '@splinetool/react-spline/next';
import Communal_One from './Communal_One';
import Platformer from './platformer'
import {useState} from 'react'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import RaceCarGame from './RaceCarGame'
import AnimalCrossing from './AnimalCrossing'
import BumperBalls from './BumperBalls'

//10,000 cities - July 2026

import Communal_one from './Communal_One'
import Communal_two from './Communal_Two'
import Communal_three from './Communal_three'
import ResearchLabScene from './ResearchLab'

// starcraft
//o1 + observable + (minimal code in repo by dec 1)
//1. minecraft
//2. mega man, mario platformer
//3. ?
let games = {
  'Platformer' : Platformer,
  'Mario-kart' : RaceCarGame,
  // 'Animal-crossing' : AnimalCrossing,
  // 'Mario-party': MarioParty,
  //'Spline':Spline,
  "multiplayer":MultiplayerCanvas,
  //'garrys_mod':
  // 'Bumper-balls': BumperBalls,

  // 'communal_one': Communal_one,
  //'Div_WebGL': Communal_two,
  // 'communal_three': Communal_three,
  'research-lab': ResearchLabScene,

  //"5-million-devs": "https://5-million-devs.netlify.com/",  //attempt PolyFill
  // https://wifi-solver.com/
  // https://threejs.org/editor/
  // https://satoshi7190.github.io/Shinjuku-indoor-threejs-demo/
  // https://github.com/lo-th/3d.city
  // https://github.com/meliharvey/threescaper?tab=readme-ov-file
  // https://openai.com/index/learning-to-reason-with-llms/
  // https://news.ycombinator.com/item?id=41137266
  // https://threlte.xyz/docs/examples/shaders/interactive-shader
}
function MarioParty() {
  return <>alskdfjlaskfjlasdf</>
}
function Multiplayer() {
  return <>aaa</>
}

const RenderGame = ({ selectedMode }: { selectedMode: string }) => {
  const noop = () => <>SIHT</>
  const GameComponent = games[selectedMode] || noop
  return <GameComponent />;
};

export default function Game() {
  const [selectedMode, setSelectedMode] = useState('Platformer');
  const handleModeChange = (mode: string) => {
    setSelectedMode(mode);
  };
  return <>
  <div>

    <div className="mb-4">
      <div className="flex gap-4">
        {Object.keys(games).map((mode) => (
          <label key={mode} className="inline-flex items-center">
            <input
              type="radio"
              name="game-mode"
              value={mode}
              checked={mode === selectedMode}
              className="form-radio text-blue-600"
              onChange={() => handleModeChange(mode)}
            />
            <span className="ml-2">{mode.charAt(0).toUpperCase() + mode.slice(1)}</span>
          </label>
        ))}
      </div>
    </div>

    <div className="w-1/2 h-1/2">
    <h1>{selectedMode}</h1>
    <RenderGame selectedMode={selectedMode} />

    </div>
  </div>

    <ModeSelector />
    </>
}
// //https://layaair.com/#/
// //https://spookyball.com/
// //https://github.com/cloud9c/taro
// //https://webgpu.github.io/webgpu-samples/?sample=samplerParameters
// //https://iamferm.in/webgpu-path-tracing/
// //https://github.com/mikbry/awesome-webgpu
// // https://roboticsuniversity.observablehq.cloud/dynamicbotnotebook/
// //https://app.spline.design/file/4f16bd1e-8e16-4c9c-b311-e803c72185f2
// // video vision transformer for game  + robot + mockp +
// //BOTW puzzles
// // make tools + import all industries + etc
// // https://claude.ai/chat/c4fbb71a-dd3b-482f-b224-536b341a31f9
// // https://claude.ai/chat/a94ba937-26cd-450e-899b-f3ce5924fc29
// //  https://store.steampowered.com/charts/mostplayed

// //https://docs.anthropic.com/en/docs/welcome
// // https://www.maxon.net/en/zbrush
// // https://threejs-journey.com/lessons/custom-models-with-blender#go-further
// // https://relion.readthedocs.io/en/release-5.0/
// // https://observablehq.com/d/b3e50a5e9af031f8
// // https://github.com/observablehq/plot
