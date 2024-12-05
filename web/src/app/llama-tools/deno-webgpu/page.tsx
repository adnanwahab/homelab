"use client";

import React, { useState } from "react";
import ThreeJsAudio from "./threejs";

function DenoWebgpu() {
  const [textInput, setTextInput] = useState("");
  const [fileInput, setFileInput] = useState<File | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append("text", textInput);
    if (fileInput) {
      !formData.append("file", fileInput);
    }

    const hi = await fetch("http://localhost:8000/upload", {
      method: "POST",
      body: formData,
    });

    console.log(hi);
  };

  return (
    <div>
      <h1>
        Type a string, or send image or video, and we will make it in three.js
      </h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter a string"
          value={textInput}
          onChange={(e) => setTextInput(e.target.value)}
        />
        <input
          type="file"
          accept="image/*,video/*"
          onChange={(e) => setFileInput(e.target.files?.[0] || null)}
        />
        <button type="submit">Submit</button>
      </form>
      <ThreeJsAudio />
    </div>
  );
}

export default DenoWebgpu;
