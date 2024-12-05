'use client'

import React, { useState } from 'react'
const labels = ['car', 'apple', 'bear']; // List of labels

function SemanticSegmentation() {
  let [coords, setCoords] = useState({x: 0, y: 0})
  let [labelName, setLabelName] = useState('')
  
  const handleMouseMove = (e: React.MouseEvent<HTMLVideoElement>) => {
    setCoords({x: e.clientX, y: e.clientY})
    const randomLabel = labels[Math.floor(Math.random() * labels.length)]; // Select a random label

    setLabelName(randomLabel); // Set the random label name
  }
  
  return (
    <div>
      <h1>Semantic Segmentation</h1>
      <div>
        <div className="text-blue-100">you are hovering over a <span className="text-red-500 label-name text-4xl" >{labelName}</span> </div>
      </div>
      <video 
      onMouseMove={handleMouseMove}
      autoPlay loop muted src="https://files.hashirama.blog/blog/misc/Video%20from%20Facebook%20%282%29.mp4"  className="w-full h-full"></video>

    </div>
  )
}

export default SemanticSegmentation