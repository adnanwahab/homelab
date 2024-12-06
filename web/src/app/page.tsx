
"use client";
import { useState, useEffect } from "react";
import React from "react";
//spatial computing with robotics and dynamicland
//biotech with robots
import PeriodicTable from "./llama-tools/deno-webgpu-threejs/periodic";
//5 livekits always running
//$500 livekit
//$500 fly.io gpu
//$2000 hardware - RTINGS - Where to spend $2000 on Hardware to get a innate.bot sibling :)
//$3000 Total
//$2000 O1 - Diagrams - 400,000
//
//

//
//have 500 blog posts - images + observablehq notebooks --- ask people if i can walter isaacsoon.

//10 computers - how much shit can you code --- 10 fulltime - software engineers - 1 on 1s once a week.

export default function Home() {
  const [hostname, setHostname] = useState("Dynabot.dev");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHostname(window.location.hostname);
    }
  }, []);

  const projects = [
    {
      slug: "/dynabot",
      title: "A $350 self-driving robot with arm",
      description: "comes with 30 pre-trained tasks and a home-labratory setup for your phone, desktop, or tv",
      logoSrc: "/dynabot/",
    },
    {
      slug: "/llama-tools", 
      title: "Llama Tools",
      description: "Replay Analyze4r for robots",
      logoSrc: "/llama-tools/steps-kirby-demo",
    },
    {
      slug: "/articles/300_dollar_robot",
      title: "300 Dollar Robot",
      description: "A $300 self-driving robot with arm",
      logoSrc: "/articles/dynamicland",
    },
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-xl font-medium">
         0. 4 element notebook - avatar notebook 4 elements

            {/* Make info-course 100% free with $5 for lifetime compute like modal,
            and amazon wishlist for dynabot parts */}
          </h1>
    
          <h1 className="text-xl font-medium">Dynabot.dev</h1>
          <p className="shiny-text">robotics, cgi, and infrastructure.</p>
        </div>

        <nav className="flex gap-6">
          <a href="/blog" className="hover:opacity-70">
            Blog!
          </a>
        </nav>
      </header>

      <main className="grid gap-8">
        {projects.slice(0, 7).map((project, index) => (
          <a key={project.slug} href={`${project.slug}`} className="block">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <iframe src={project.logoSrc} className="w-full h-full" />
            </div>

            <div className="mt-4">
              <h2 className="text-xl font-medium">{project.title}</h2>
              <p className="text-gray-600">
                {project.description.split("\n").map((line, i) => (
                  <React.Fragment key={i}>
                    {line}
                    {i === 0 && <br />}
                  </React.Fragment>
                ))}
              </p>
            </div>
          </a>
        ))}
      </main>
    </div>
  );
}
