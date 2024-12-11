
"use client";
import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import {
  initRendering,
  cleanupRendering,
  initAudio,
  cleanupAudio,
  updateFromGamepad,
  updateFromKeyboard,
  updateCubesFromAudio,
  setBaseCubeColorOnCubes,
} from "./ThreeGamepadSceneHelpers";

const ThreeGamepadScene = () => {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const cubesRef = useRef([]);
  const animationFrameIdRef = useRef(null);
  const gamepadIndexRef = useRef(null);

  // Track cube base color in state, controlled by UI
  const [baseCubeColor, setBaseCubeColor] = useState("#9b59b6");

  // Mouse & Keyboard refs
  const isMouseDownRef = useRef(false);
  const prevMouseXRef = useRef(0);
  const prevMouseYRef = useRef(0);
  const keysRef = useRef({
    KeyW: false,
    KeyA: false,
    KeyS: false,
    KeyD: false,
    KeyQ: false,
    KeyE: false,
  });

  // Audio related refs
  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const frequencyDataRef = useRef(null);

  useEffect(() => {
    // Initialize rendering
    initRendering({
      mountRef,
      sceneRef,
      cameraRef,
      rendererRef,
      cubesRef,
      isMouseDownRef,
      prevMouseXRef,
      prevMouseYRef,
      keysRef,
      gamepadIndexRef,
      baseCubeColor,
    });

    // Initialize audio
    initAudio(audioContextRef, analyserRef, frequencyDataRef);

    // Animation loop
    const animate = () => {
      animationFrameIdRef.current = requestAnimationFrame(animate);
      updateFromGamepad(gamepadIndexRef, cameraRef, cubesRef, baseCubeColor);
      updateFromKeyboard(cameraRef, keysRef);
      updateCubesFromAudio(analyserRef, frequencyDataRef, cubesRef);
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };
    animate();

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameIdRef.current);
      cleanupRendering(mountRef, rendererRef, cubesRef);
      cleanupAudio(audioContextRef);
    };
  }, [baseCubeColor]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <div
        id="info"
        style={{
          position: "absolute",
          top: "10px",
          left: "10px",
          background: "rgba(0,0,0,0.5)",
          padding: "10px",
          zIndex: 10,
          fontFamily: "sans-serif",
          color: "#fff",
        }}
      >
        <h1>MMO Karaoke Game</h1>
        <button>View Levels</button>
        <br />
        <a href="/music_game/edit"><button>Edit Current Level</button></a>

     
        <label style={{ display: "block", marginTop: "10px" }}>
          Base Cube Color:{" "}
          <input
            type="color"
            value={baseCubeColor}
            onChange={(e) => setBaseCubeColor(e.target.value)}
          />
        </label>

        <button
          className="reset-button"
          onClick={() => setBaseCubeColor("#9b59b6")}
        >
          Play / Pause
        </button>
      </div>
      <div ref={mountRef}></div>
    </div>
  );
};

export default ThreeGamepadScene;
