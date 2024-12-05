'use client'
import React, { useState } from 'react';

const DraggableRectangles = () => {
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [rectangles, setRectangles] = useState(
    Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 600,
      y: Math.random() * 400,
      isDragging: false,
      color: `hsl(${Math.random() * 360}, 70%, 50%)`
    }))
  );
  
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  
  const handleMouseDown = (e, id) => {
    e.stopPropagation();
    const rect = rectangles.find(r => r.id === id);
    setDragOffset({
      x: (e.clientX - pan.x) / zoom - rect.x,
      y: (e.clientY - pan.y) / zoom - rect.y
    });
    
    setRectangles(rectangles.map(rect =>
      rect.id === id ? { ...rect, isDragging: true } : rect
    ));
  };
  
  const handleMouseMove = (e) => {
    setRectangles(rectangles.map(rect =>
      rect.isDragging ? {
        ...rect,
        x: ((e.clientX - pan.x) / zoom) - dragOffset.x,
        y: ((e.clientY - pan.y) / zoom) - dragOffset.y
      } : rect
    ));
  };
  
  const handleMouseUp = () => {
    setRectangles(rectangles.map(rect => ({
      ...rect,
      isDragging: false
    })));
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSensitivity = 0.001;
    const deltaY = e.deltaY;
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    // Calculate new zoom level
    const newZoom = Math.max(0.1, Math.min(5, zoom * (1 - deltaY * zoomSensitivity)));
    
    // Calculate new pan to zoom towards cursor
    const zoomPoint = {
      x: (mouseX - pan.x) / zoom,
      y: (mouseY - pan.y) / zoom
    };

    const newPan = {
      x: mouseX - zoomPoint.x * newZoom,
      y: mouseY - zoomPoint.y * newZoom
    };

    setZoom(newZoom);
    setPan(newPan);
  };

  const handleBackgroundDrag = (e) => {
    if (e.buttons === 1) { // Left mouse button
      setPan(prev => ({
        x: prev.x + e.movementX,
        y: prev.y + e.movementY
      }));
    }
  };

  return (
    <div 
      className="w-full h-screen relative bg-gray-100 touch-none overflow-hidden"
      onWheel={handleWheel}
      onMouseMove={(e) => {
        handleBackgroundDrag(e);
        handleMouseMove(e);
      }}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <div 
        className="absolute top-4 left-4 bg-white p-2 rounded shadow z-50"
      >
        Zoom: {(zoom * 100).toFixed(0)}%
      </div>
      <div 
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transformOrigin: '0 0',
        }}
      >
        {rectangles.map(rect => (
          <div
            key={rect.id}
            className="absolute cursor-move shadow-md hover:shadow-lg transition-shadow"
            style={{
              width: '60px',
              height: '40px',
              backgroundColor: rect.color,
              transform: `translate(${rect.x}px, ${rect.y}px)`,
              zIndex: rect.isDragging ? 10 : 1,
            }}
            onMouseDown={(e) => handleMouseDown(e, rect.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default DraggableRectangles;