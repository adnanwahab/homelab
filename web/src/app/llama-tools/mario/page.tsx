'use client'
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GamePathVisualization = () => {
  const svgRef = useRef(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    
    // Create curved path from character to ground
    const line = d3.line()
      .curve(d3.curveBasis)
      .x(d => d.x)
      .y(d => d.y);

    const pathData = [
      { x: 250, y: 100 },  // Starting point near character
      { x: 200, y: 150 },  // Control point
      { x: 150, y: 200 },  // Control point
      { x: 100, y: 250 }   // End point on ground
    ];

    // Add path with animation
    const path = svg.append('path')
      .datum(pathData)
      .attr('d', line)
      .attr('fill', 'none')
      .attr('stroke', 'red')
      .attr('stroke-width', 3)
      .attr('stroke-dasharray', '5,5')
      .attr('opacity', 0.7);

    // Animate the path
    const length = path.node().getTotalLength();
    path.attr('stroke-dasharray', length + ' ' + length)
      .attr('stroke-dashoffset', length)
      .transition()
      .duration(1500)
      .ease(d3.easeLinear)
      .attr('stroke-dashoffset', 0);

  }, []);

  return (
    <div className="relative w-full h-full">
      <h1 className="text-3xl font-bold mb-6">mario_visualization</h1>
      <svg 
        ref={svgRef}
        className="absolute top-0 left-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 300"
      />
      <img src="/preview.webp" className="w-full h-auto" />
      
    </div>
  );
};

export default GamePathVisualization;