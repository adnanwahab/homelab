"use client";
import React, { useState, useEffect } from "react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

// rev music
//
// neuralink cause effect
// dynamicland
// rtings for robot +
// 151 observables + a server component for soe --- jupyter note

const demos = {
  "latent-scope-city-redessign":
    "https://techcrunch.com/2016/06/28/cruises-kyle-vogt-will-speak-about-self-driving-cars-at-disrupt-sf/",
};

const VisualizationGrid = () => {
  const [hovered, setHovered] = useState('');


  const images = [
    {
      src: "https://www.redblobgames.com/thumbnail/all-pairs.png?2020-08-30-11-27-27",
      id: 1,
      title: "Flower Map Projection",
      width: 400,
      height: 400,
    },
    {
      id: 2,
      title:
        "interactive editor for playwright agent in browser --- keep json up to date",
      width: 400,
      height: 400,
    },
    { id: 3, title: "Noise Pattern", width: 400, height: 200 },
    { id: 4, title: "Country Outline", width: 400, height: 400 },
    { id: 5, title: "Wave Pattern", width: 400, height: 400 },
    { id: 6, title: "Dot Pattern", width: 400, height: 200 },
    { id: 7, title: "Honeycomb", width: 400, height: 200 },
    { id: 8, title: "Network Graph", width: 400, height: 200 },
    { id: 9, title: "Voronoi Diagram", width: 400, height: 300 },
    { id: 10, title: "Fractal Pattern", width: 400, height: 200 },
    { id: 11, title: "Fraction Visualization", width: 400, height: 200 },
    { id: 12, title: "US Map", width: 400, height: 300 },
    { id: 13, title: "Globe Detail", width: 400, height: 300 },
    { id: 14, title: "Terrain Map", width: 400, height: 300 },
    { id: 15, title: "Geographic Projection", width: 400, height: 300 },




    { id: 16, title: "unreal pixel streaming!!!", width: 400, height: 300 },
    { id: 17, title: "observablehq-English-Language_code_gen_editor", width: 400, height: 300 },

  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        http://localhost:3000/llama-tools/steps-kirby-demo
      </h1>
      <h2 className="text-xl font-bold mb-6"> 

hovered element is ./ {hovered}

      </h2>
      <div>
<iframe width="100%" height="500" 
  src="https://observablehq.com/embed/@observablehq/module-require-debugger?cell=*&banner=false"></iframe>"></iframe>

      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <img
              src={image.src}
              alt={image.title}
              className="w-full h-auto object-cover"
              onMouseEnter={() => setHovered(image.title)}
              onMouseLeave={() => setHovered("")}
            />

        
            <div className="p-2">
              <p className="text-sm text-gray-600">{image.title}</p>
            </div>
          </Card>
        ))}
      </div>
      <img src="https://scontent-lax3-1.xx.fbcdn.net/v/t39.2365-6/461179924_892945479558448_4846394290454647920_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=kFBuO73RGIYQ7kNvgE1YISg&_nc_zt=14&_nc_ht=scontent-lax3-1.xx&_nc_gid=Alff7w0QTlwpUJ_VrS5lBpl&oh=00_AYDMTZ1pzYwebCXva61SJTUWv1oJ6xPxZvAJ_ncknZN9Yg&oe=676A8050" />
    </div>
  );
};

export default VisualizationGrid;



