//spatial computing with robotics and dynamicland
//biotech with robots

"use client";

import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import React from 'react';

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
      description:
        "comes with 30 pre-trained tasks and a home-labratory setup for your phone, desktop, or tv",
      logoSrc: "https://nanosaur.ai/assets/images/nanosaur_og.jpg",
    },

    {
      slug: "/llama-tools",
      title: "Llama Tools",
      description: "Replay Analyze4r for robots",
      logoSrc:
        "https://scontent-lax3-1.xx.fbcdn.net/v/t39.2365-6/461179924_892945479558448_4846394290454647920_n.png?_nc_cat=105&ccb=1-7&_nc_sid=e280be&_nc_ohc=kFBuO73RGIYQ7kNvgE1YISg&_nc_zt=14&_nc_ht=scontent-lax3-1.xx&_nc_gid=Alff7w0QTlwpUJ_VrS5lBpl&oh=00_AYDMTZ1pzYwebCXva61SJTUWv1oJ6xPxZvAJ_ncknZN9Yg&oe=676A8050",
    },

    // {
    //   slug: "/deno-webgpu",
    //   title: "Deno WebGPU Three.js Canvas",
    //   description: "A collaborative drawing space for livekit + homelab automation of video games.",
    //   logoSrc: "https://imgproxy.compute.toys/insecure/width:1080/plain/https://hkisrufjmjfdgyqbbcwa.supabase.co/storage/v1/object/public/shaderthumb/72f0eb2a-10f3-43b8-9dc9-8a6021365c37/1559.jpg"
    // }
  ];

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-xl font-medium">Dynabot.dev</h1>
          <p className="shiny-text">robotics, cgi, and infrastructure.</p>
        </div>

        <nav className="flex gap-6">
          <a href="/blog" className="hover:opacity-70">
            Blog
          </a>
          {/* <a href="/tools" className="hover:opacity-70 ">Tools</a> */}
          {/* <button className="hover:opacity-70">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8" />
              <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </svg>
          </button> */}
        </nav>
      </header>

      <main className="grid gap-8">
        {projects.slice(0, 7).map((project, index) => (
          <a key={project.slug} href={`${project.slug}`} className="block">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <img
                src={project.logoSrc}
                alt={`${project.title} Logo`}
                className="w-full h-full"
              />
              {/* <iframe src={project.logoSrc} className="w-full h-full" /> */}
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
        <Footer />
      </main>
    </div>
  );
}
