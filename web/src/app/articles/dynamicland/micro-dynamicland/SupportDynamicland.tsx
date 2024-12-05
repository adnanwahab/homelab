'use client';
import Footer from '@/components/footer'
import Faketalk from './faketalk'
import Editor from '@/components/webgpu-editor'
import drawable_canvas from './drawable_canvas'
import DraggableRectangles from './shit';
import { useState } from 'react'
// collaborativ worksapce - like minecraft - 1 million people 
//support dynamicland for 5 weeks = never be negative again.
//get dynamicland a turing award in 3-5 years
//dynamicland has the power to increase everyone's cognition
//purpose of cognition = solve problems, etc
//Threejs.journey for 
//100 co-authors a month = sustainabile..

// /https://github.com/adnanwahab/hashirama_last_archive/blob/main/notebooks_py/2_perception/happydream.ipynb
import Haku from '@/components/haku'
export default function WalterIsaacson(organization) {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12">
      {/* Hero Section */}
      <header className="space-y-6 text-center">
        <h1 className="text-5xl font-bold text-blue-100">
          Dynamicland = everyone on same team :)
        </h1>
        <p className="text-xl text-blue-200">
          A collaborative WebGPU robotics environment
        </p>
      </header>

  <h1>what if all Robotics  companies shared 95% of their code, logging and infra?</h1>
      <Haku />
      <iframe width="100%" height="676" 
  src="https://observablehq.com/embed/a6043c09d109cbfc@84?cells=canvas"></iframe>
      {/* Main Content */}
      <main className="space-y-16">
        {/* Interactive Section */}
        <section className="space-y-6">
          {/* <drawable_canvas className="w-full border rounded-lg shadow-lg" /> */}
          <button className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
            Help remix this page
          </button>
        </section>

        {/* Vision Section */}
        <section className="prose prose-xl prose-invert max-w-none">
          <h2 className="text-3xl font-bold text-blue-100 mb-6">Our Vision</h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="bg-gray-800 p-6 rounded-lg">
              <p>
                We imagine a future where people use computers 45% of the work day, 
                and Dynamicland 45% of the work day. Dynamicland is more collaborative than a computer.
              </p>
            </div>
            <div className="text-3xl font-bold text-blue-100 mb-6">
            Open Research is solving scarcity.

            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <p>
                Though Bret estimated 100-5000 years to implement Dynamicland,
                together we can make it accessible today!
              </p>
            </div>
          </div>
        </section>

        {/* Timeline Section */}
        <section className="bg-gray-900 p-8 rounded-xl">
          <h2 className="text-3xl font-bold text-blue-100 mb-6">Historical Timeline</h2>
          <div className="space-y-4">
            {/* Convert your timeline entries to this format */}
            <div className="flex gap-4 items-center">
              <span className="text-blue-300 font-mono">1970</span>
              <p className="text-gray-200">Xerox Parc invents 30t w/ 5 million in funding</p>
            </div>
            {/* ... other timeline entries ... */}
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Replace multiple individual img tags with mapped array */}
          {[
            "/dynamicland/Screenshot-2024-11-22-at-11.08.21-AM.png",
            // ... other image paths
          ].map((src, index) => (
            <img 
              key={index}
              src={src}
              alt="Dynamicland screenshot"
              className="rounded-lg shadow-md hover:shadow-xl transition"
            />
          ))}
        </section>

        {/* Interactive Components */}
        <section className="space-y-8">
          <Faketalk />
          <DraggableRectangles />
        </section>

        {/* Call to Action */}
        <section className="flex gap-4 justify-center">
          <button className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition">
            Download Dynamicland
          </button>
          <button className="px-6 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition">
            Follow on Social Media
          </button>
        </section>
      </main>

      <Footer />
    </div>
  )
}




