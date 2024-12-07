"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/button";
//https://github.com/anthropics/courses/blob/master/tool_use/README.md
//https://docs.anthropic.com/en/prompt-library/library
const demos = {
  "outbreak": "/proxy?url=https://meltingasphalt.com/interactive/outbreak/",
  "twitch_plays_collaborative": "https://observablehq.com/embed/a8b7a7402653b22c@23?cell=*",

  "latent-scope-city-redessign":
    "https://techcrunch.com/2016/06/28/cruises-kyle-vogt-will-speak-about-self-driving-cars-at-disrupt-sf/",
    "code-gen": "https://reflect.app/g/awahab/0539b9a20851497692de1e4fe21208a5",
    "homelab": "https://tailscale.com/use-cases/homelab",
    "pixel-streaming": "https://dnsimple.com/pricing",
    "follow_bret": "https://x.com/home",
    "learn_api": "https://www.anthropic.com/news/model-context-protocol",
    "discord_on_web": "https://discord.com/channels/1159591355842840586/1159591355842840586",
    "modal_on_web": "https://modal.com/docs/guide/getting-started",
    "layout_picker": "https://threejs.org/examples/css3d_periodictable.html",
    "one_to_many": "http://www.timjchin.com/digital/one-to-many/", //http://www.timjchin.com/digital/lightbox/
    "Norvig Spelling Corrector": "https://www.norvig.com/spell-correct.html",
    "latent scope - redesign law and city cooperatively!": "https://enjalot.github.io/latent-scope/plot-issues",
    "observable_debugger": "https://observablehq.com/embed/@observablehq/module-require-debugger?cell=*&banner=false",
    "unreal_engine": "https://www.unrealengine.com/en-US",
    "hello_robot": "https://hello-robot.com/",
    "nanosaur": "https://nanosaur.ai/",
    "css3D-persepctive": "https://hakim.se/",
    "threejs-css-threedee-renderer": "https://threejs.org/css3d-renderer",
    "claude_on_web": "https://claude.ai/chat/0e919422-b3a0-498c-beb8-8ad06b0566ec",
    "physics_engine": "https://www.youtube.com/watch?v=KvvOpACGGJE",
    "github_on_web": "https://github.com/",
    "automagic_amazon_wishlist_editor_for_nanosaur": "https://www.amazon.com/hz/wishlist/ls/2UOHL9RZ9XFSP/ref=nav_wishlist_lists_2",
    "dynamicland_bookshelf_on_web": "https://www.amazon.com/gp/cart/view.html?ref_=nav_cart",
    "redblobgames_pathfinding": "https://www.redblobgames.com/pathfinding/a-star/introduction/",
    "magic_twitter": "https://x.com/venturetwins",
    "magic_hacker_news": "https://news.ycombinator.com/user?id=patio11",
    "worrydream_explorable_explanations": "https://worrydream.com/ExplorableExplanations/",
    "dynamicland_on_web": "https://dynamicland.org/",
    "is_turso_simplest_web_app_api_storage_Or_litefs": "https://turso.tech/docs/quickstart/litefs-example",
    "flirt_flow": "https://bumble.com/flirtflow",
    "ai_makes_sustainable_relationships": "https://www.youtube.com/watch?v=zYzuycrGqkI",
    "magic_youtube_edit_reccomendation_engine_": "https://x.com/garrytan/status/1801656150980706328",
    "cooking_debugger": "Ollama vit + video caption",
    "discord_on_web_": "https://discord.com/login",
    "codepen_css_3d_renderer": "https://codepen.io/dehash/pen/nPKLaQ",
    "codepen_threejs_portal_planes_with_matcaps": "https://codepen.io/smcnally000/embed/eYqXWyJ?default-tab=html%2Cresult",
    

    
};

const VisualizationGrid = () => {
  const [hovered, setHovered] = useState('');

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">
        http://localhost:3000/llama-tools/steps-kirby-demo
      </h1>
      <h2 className="text-xl font-bold mb-6"> 

hovered element is ./ {hovered}

      </h2>
      <div>
        <iframe 
          width="100%" 
          height="500" 
          src="https://observablehq.com/embed/@observablehq/module-require-debugger?cell=*&banner=false"
        ></iframe>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(demos).map(([title, url]) => (
          <Card key={title} className="overflow-hidden">
            <iframe
              src={url}
              className="w-full h-auto object-cover"
              onMouseEnter={() => setHovered(title)}
              onMouseLeave={() => setHovered("")}
            />

        
            <div className="p-2">
              <p className="text-sm text-gray-600">{title}</p>
            </div>
          </Card>
        ))}
      </div>
      <img src="https://scontent-lax3-1.xx.fbcdn.net/v/t39.2365-6/461179924_892945479558448_4846394290454647920_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=kFBuO73RGIYQ7kNvgE1YISg&_nc_zt=14&_nc_ht=scontent-lax3-1.xx&_nc_gid=Alff7w0QTlwpUJ_VrS5lBpl&oh=00_AYDMTZ1pzYwebCXva61SJTUWv1oJ6xPxZvAJ_ncknZN9Yg&oe=676A8050" />
    </div>
  );
};

export default VisualizationGrid;




const PythagorasProof = () => {
  const [step, setStep] = useState(0);
  
  // Triangle dimensions
  const a = 100;  // base
  const b = 75;   // height
  const c = Math.sqrt(a * a + b * b); // hypotenuse
  
  // Calculate center point for rotation
  const centerX = 200;
  const centerY = 200;
  
  // Colors
  const colors = {
    red: "#ef4444",
    blue: "#3b82f6",
    green: "#22c55e",
    gray: "#6b7280"
  };

  // Calculate coordinates for the right triangle
  const trianglePoints = `${centerX},${centerY} ${centerX + a},${centerY} ${centerX + a},${centerY - b}`;

  // Function to get transform for squares based on step
  const getSquareTransform = (index) => {
    if (step < 2) return "";
    
    const rotations = [
      "rotate(-90, 275, 200)",
      "rotate(180, 275, 162.5)",
      "rotate(90, 237.5, 162.5)"
    ];
    
    return step >= 2 ? rotations[index] : "";
  };

  return (
    <div className="w-full max-w-2xl">
      <div className="flex flex-col items-center gap-4">
        <svg viewBox="0 0 400 400" className="w-full max-w-md border rounded-lg bg-white">
          {/* Base triangle */}
          <polygon 
            points={trianglePoints} 
            fill="none" 
            stroke={colors.gray} 
            strokeWidth="2"
          />
          
          {/* Squares on each side */}
          {/* Square on side a */}
          <rect
            x={centerX}
            y={centerY}
            width={a}
            height={a}
            fill={colors.red}
            opacity="0.5"
            transform={getSquareTransform(0)}
            style={{ transition: "transform 1s ease" }}
          />
          
          {/* Square on side b */}
          <rect
            x={centerX + a}
            y={centerY - b}
            width={b}
            height={b}
            fill={colors.blue}
            opacity="0.5"
            transform={getSquareTransform(1)}
            style={{ transition: "transform 1s ease" }}
          />
          
          {/* Square on hypotenuse */}
          <rect
            x={centerX}
            y={centerY - c}
            width={c}
            height={c}
            fill={colors.green}
            opacity={step >= 2 ? "0.5" : "0"}
            transform={getSquareTransform(2)}
            style={{ transition: "all 1s ease" }}
          />

          {/* Labels */}
          <text x={centerX + a/2} y={centerY + 20} textAnchor="middle" fill={colors.gray}>a</text>
          <text x={centerX + a + 15} y={centerY - b/2} textAnchor="middle" fill={colors.gray}>b</text>
          <text x={centerX + a/2 + 10} y={centerY - b/2 - 10} textAnchor="middle" fill={colors.gray}>c</text>
        </svg>

        <div className="flex gap-4">
          <Button 
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            variant="outline"
          >
            Previous
          </Button>
          <Button 
            onClick={() => setStep(Math.min(2, step + 1))}
            disabled={step === 2}
          >
            Next
          </Button>
        </div>

        <div className="text-center text-gray-700">
          {step === 0 && "Start with a right triangle with sides a, b, and c"}
          {step === 1 && "Draw squares on each side of the triangle"}
          {step === 2 && "The squares on sides a and b can be rearranged to form the square on c"}
        </div>
      </div>
    </div>
  );
};


// rev music
//
// neuralink cause effect
// dynamicland
// rtings for robot +
// 151 observables + a server component for soe --- jupyter note

// https://gpfault.net/posts/shader-quine.txt.html
const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);