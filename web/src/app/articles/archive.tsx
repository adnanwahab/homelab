
const dissertations = [
  "single cell analysis + multiomics",
  "crispr design", // - https://openproblems.bio/
  "prediction", //math + devops

  // 'alzheimers, cancer, teleomere restoration, longevity',

  "mechanical engineering for robotics", // (sensors, actuators, servors, locomotion, grippers)
  "materials science",
  "devops",
  "manufacturing",

  // 'cost reduction revenue increase for robotics + biotech',
];
import React from "react";
//alzheimers, cancer, teleomere restoration, longevity,
//mate

function Iframe({ src }) {
  return (
    <>
      <h2 className="text-3xl font-bold mb-4 text-green-500">{src}</h2>
      <iframe width="900px" height="500px" frameBorder="0" src={src}></iframe>
    </>
  );
}

let _topics = [
  {
    title: "Robotic Component Reviews",
    posts: [
      "Reviewing the Elephant Robotics myCobot 320 Pi 2022 - 1kg Payload 6 DOF",
      "Jetson Orin Devkit walkthrough",
    ],
  },
  {
    title: "Featured Projects",
    posts: [
      "Making Rombacat - hackaday",
      "Making Dynabot - hackaday",
      "Repairing BotParty",
    ],
  },
  {
    title: "Machine Perception and Computer Vision",
    posts: [
      "Whisper",
      "Vision transformers for captioning Environmental cameras to capture action logs",
      "3D Annotation for Robotics - 3x",
      "Designing a 3D Captcha",
    ],
  },
  {
    title: "Robotic Prediction and Planning",
    posts: ["LLama 3.2 theory and practice"],
  },
  {
    title: "Robotic Simulation",
    posts: ["Eterna", "Deterministic CI pipelines for testing robotics"],
  },
  {
    title: "Computer Graphics For Robotics",
    posts: [
      "NERF",
      "gaussian splatting",
      "point cloud rendering",
      "voxels and stixels",
      "server side webgpu streaming",
      "ray tracing (2d and 3d) - visibility",
    ],
  },
  {
    title: "Robotics Systems",
    posts: [
      "I love zig",
      "Tailscale & starlink for Robotic Connectivity in outdoor environments.",
      "Robotic Locomotion for outdoor environments",
      "Cheapest robotic arm with a 100$ budget with grippers.",
      "Hacking your roomba to feed cats",
    ],
  },
  {
    title: "3D Printing for Robotics",
    posts: [],
  },
];
//sep 14 - modules = 123 = ai, 4 = real world application - dynamicland + how

let topics = [...dissertations].map((topic) => {
  console.log("12312312", "123");

  return {
    title: topic,
    posts: [],
  };
});
topics = [];

console.log(topics);

export default function Blag() {
  return (
    <div className="bg-slate-900 font-white">
      {/* Background Image Section */}
      <div className="absolute z-20 top-0 inset-x-0 flex justify-center overflow-hidden pointer-events-none h-full">
        <div className="w-[108rem] flex-none flex justify-end">
          <picture>
            <source
              srcSet="https://tailwindcss.com/_next/static/media/docs-dark@30.1a9f8cbf.avif"
              type="image/avif"
            />
            <img
              src="https://tailwindcss.com/_next/static/media/docs-dark@tinypng.1bbe175e.png"
              alt=""
              className="w-[90rem] flex-none max-w-none block"
              decoding="async"
            />
          </picture>
        </div>
      </div>

      <div className="flex min-h-full bg-slate-900">
        <div>
          <div className="flex min-h-full bg-slate-900">
            <div className="flex w-full flex-col">
              {/* Iframe Components */}
              {/* Example:
              <Iframe src="https://aaroniba.net/" />
              */}

              {/* Main Content Area */}
              <div className="mt-8 relative flex h-full max-w-full flex-1 flex-col overflow-hidden">
                <div className="bg-gray-900 text-gray-400">
                  <div className="container mx-auto px-4">
                    {/* Header Section */}
                    <section className="mb-6">
                      <h2
                        id="memory-updated"
                        className="text-3xl font-bold mb-4"
                      >
                        <a href="/odyssey">
                          Launch: Robotics Odyssey - robotics info cours
                        </a>
                        <a href="/llama-tools">Llama Tools</a>
                      </h2>
                    </section>

                    {/* Robotics Sections */}
                    {topics.map((topic, index) => (
                      <section key={index} className="mb-6">
                        <h2 className="text-3xl font-bold mb-4">
                          {topic.title}
                        </h2>
                        <ul className="list-none pl-0 space-y-2">
                          {topic.posts.map((post, idx) => (
                            <li key={idx}>
                              <a
                                href="/?"
                                className="text-xl text-gray-400 hover:underline"
                              >
                                {post}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </section>
                    ))}

                    {/* Subscribe Section */}
                    <section className="py-6 border-t border-gray-700 mt-12 border-t-2">
                      {/* Future Subscribe Form */}
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Future Form */}
      {/*
      <form onSubmit={(e) => e.preventDefault()} className="mb-4">
        <div className="flex space-x-2">
          <input
            type="email"
            placeholder="Your email address"
            className="flex-1 p-3 bg-gray-800 border border-gray-600 text-gray-400"
          />
          <button
            type="submit"
            className="bg-green-900 text-white py-2 px-4 hover:bg-green-600"
          >
            Subscribe
          </button>
        </div>
      </form>
      */}
    </div>
  );
}

// Appendix Links
// https://ocw.mit.edu/courses/mechanical-engineering/2-151-advanced-system-dynamics-and-control-spring-2009/
// https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-141-robotic-science-and-systems-i-fall-2014/
// 2. Control of Mobile Robots – Georgia Institute of Technology (Georgia Tech)
//   - Robot kinematics and dynamics
//   - Manipulator motion and path planning
//   - Feedback control for robotics
//   - Sensors and actuators
