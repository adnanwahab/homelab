"use client";
import LivingRobotDemo from "@/components/demo";
import { Container } from "@/components/container";
import Footer from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";
import { Navbar } from "@/components/navbar";
import TitleRewriter from "@/components/title-rewriter";
import { SeeingSpace } from "@/components/seeingspace";
import { MainComponent as BuyRobotPage } from "./robot/page";
const bill_of_materials = `Qt	Part	:us: USA	:it: Italy	:uk: UK	:netherlands: NL	Notes
1	NVIDIA Jetson Nano	NVIDIA store	 	 	 	You can use
2Gb or 4Gb version
Buy this alternative carrier:
SEEED studio
1	MicroSD card 64Gb	:us: $9.99
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon
1	128GB NVM3 M.2 PCLe SSD	 	 	 	 	Only for SEEED STUDIO carrier
NVMe M.2
1	Wi-Fi Dongle 5Ghz	:us: $13.90
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon
1	Power Bank	:us: $29.99
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon	Power Bank dimensioning
2	Pololu Micro Gearbox	:us: $25.75
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon	Pololu 6V 150RPM
alternative:
aliexpress.com
1	Adafruit motor control	:us: $29.10
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon	DC Motor + Stepper FeatherWing Add-on
alternative:
aliexpress.com
2	oled display	:us: $5
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon	128x64px 0.06in I2C
Best price pack:
3 display
6	Ball bearings F686ZZ	:us: $7.49
Amazon	:it:
Amazon	:uk:
Amazon	:netherlands:
Amazon	alternative:
aliexpress.com
10	Magnets 4x2mm	:us: $10.99
Amazon	 	 	:netherlands:
Amazon	alternative:
aliexpress.com
-	Expansion board	 	 	 	 	Expansion board
-	3D parts	 	 	 	 	3D filaments
-	Hex M2 Screw set	:us: $10*
Amazon	 	 	 	Screw set
`;
import React from "react";
import fs from "fs";
import path from "path";

// export async function getStaticProps() {
//   const filePath = path.join(
//     process.cwd(),
//     "public",
//     "zed-2i-camera-callibration.html",
//   );
//   const fileContents = fs.readFileSync(filePath, "utf8");

//   return {
//     props: {
//       notebookHtml: fileContents,
//     },
//   };
// }

interface VisualizationProps {
  images: {
    src: string;
    alt: string;
  }[];
}

const Visualizations: React.FC<VisualizationProps> = ({ images }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif mb-12">Visualisations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {images.map((image, index) => (
          <div
            key={index}
            className="aspect-square relative overflow-hidden rounded-lg hover:shadow-lg transition-shadow duration-300"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const demos = {
  sections: [
    {
      name: "Perception",
      pages: [
        { name: "Livekit", path: "/perception/1_livekit" },
        {
          name: "Whisper and Audio Processing and Understanding Voice",
          path: "/perception/whisper",
        },
        {
          name: "Voxels Stixels Minecraft Diffusion 3D Policy and Semseg",
          path: "/perception/voxels-stixels-minecraft",
        },
        { name: "Sensor Fusion", path: "/perception/sensor-fusion" },
        { name: "LIDAR Processing", path: "/perception/lidar-processing" },
        { name: "Camera Calibration", path: "/perception/camera-calibration" },
        { name: "Object Detection", path: "/perception/object-detection" },
        {
          name: "Semantic Segmentation",
          path: "/perception/semantic-segmentation",
        },
        {
          name: "Scene Understanding",
          path: "/perception/scene-understanding",
        },
        { name: "Audio Processing", path: "/perception/audio-processing" },
        { name: "3D Mapping", path: "/perception/3d-mapping" },
      ],
    },
    {
      name: "Prediction",
      pages: [
        {
          name: "Introduction to Mathematical Attention",
          path: "/prediction/introduction",
        },
        { name: "Creative-AI", path: "/prediction/creative-ai" },
        { name: "agentic UI", path: "/prediction/agentic-ui" },
        { name: "Behavioral Cloning", path: "/prediction/behavioral-cloning" },
        {
          name: "Markov Decision Processes",
          path: "/prediction/markov-decision-processes",
        },
        { name: "Path Prediction", path: "/prediction/path-prediction" },
        { name: "LSTM Networks", path: "/prediction/lstm-networks" },
        {
          name: "Trajectory Optimization",
          path: "/prediction/trajectory-optimization",
        },
        { name: "Motion Planning", path: "/prediction/motion-planning" },
        {
          name: "Probabilistic Roadmaps",
          path: "/prediction/probabilistic-roadmaps",
        },
        {
          name: "agentic UI + Tooling",
          path: "/prediction/agentic-ui-tooling",
        },
      ],
    },
    {
      name: "Simulation",
      pages: [
        {
          name: "Reinforcement Learning",
          path: "/simulation/reinforcement-learning",
        },
        { name: "Physics Engines", path: "/simulation/physics-engines" },
        {
          name: "Diffusion 3D Policy",
          path: "/simulation/diffusion-3d-policy",
        },
        {
          name: "Agent-Based Modeling",
          path: "/simulation/agent-based-modeling",
        },
        { name: "Sim-to-Real Transfer", path: "/simulation/sim-to-real" },
        { name: "Carla Rendering", path: "/simulation/carla-rendering" },
      ],
    },
    {
      name: "Real World Applications",
      pages: [
        { name: "jetbot", path: "/real-world-applications/jetbot" },
        { name: "Medbot", path: "/real-world-applications/medbot" },
        { path: "real-world-applications/ethics-safety-transparent-logging" },
        { path: "real-world-applications/remix-cities" },
        {
          name: "Agricultural Robotics",
          path: "/real-world-applications/agricultural-robotics",
        },
        {
          name: "Feeding Your Cat",
          path: "/real-world-applications/feeding-your-cat",
        },
        {
          name: "Robot Bartender",
          path: "/real-world-applications/robot-bartender",
        },
        {
          name: "Room Cleaning",
          path: "/real-world-applications/room-cleaning",
        },
        { name: "Sentry", path: "/real-world-applications/sentry" },
      ],
    },
    {
      name: "Hardware System",
      pages: [
        { name: "todo dec 11", path: "/hardware/introduction.md" },
        {
          name: "Actuators and Motors",
          path: "/hardware-system/actuators-motors",
        },
        {
          name: "Raspberry Pi & Jetson Nano",
          path: "/hardware-system/raspberry-pi-jetson",
        },
        { name: "Soldering and PCBs", path: "/hardware-system/soldering-pcbs" },
        { name: "Embedded Systems", path: "/hardware-system/embedded-systems" },
        { name: "Robot Kinematics", path: "/hardware-system/robot-kinematics" },
        { name: "ROS", path: "/hardware-system/ros" },
        {
          name: "Jupyter + python fundamentals",
          path: "/hardware-system/jupyter",
        },
      ],
    },
  ],
};
//sqlite + eval score

const eval_scores = {
  Jupyter: 100,
};

function VisualizationGallery() {
  const visualizations = [
    { src: "/path/to/flower-map.png", alt: "Flower shaped world map" },
    { src: "/path/to/globe.png", alt: "Blue globe visualization" },
    { src: "/path/to/noise.png", alt: "Noise pattern" },
    { src: "/path/to/coastline.png", alt: "Coastline drawing" },
    { src: "/path/to/circular-graph.png", alt: "Circular graph" },
    { src: "/path/to/dots.png", alt: "Dot pattern" },
    { src: "/path/to/voronoi.png", alt: "Voronoi diagram" },
    { src: "/path/to/network.png", alt: "Network visualization" },
    // ... add all other images
  ];

  return <Visualizations images={visualizations} />;
}

function roboticsportfolio() {
  return <VisualizationGallery />;
}

function CameraCalibration({ notebookHtml }) {
  const github_shit = `https://raw.githubusercontent.com/adnanwahab/homelab/refs/heads/main/notebooks/perception/zed-2i-camera-callibration.ipynb`;
  const github_shit_2 = `{"cells":[{"id":"0","cell_type":"code","execution_count":1,"outputs":[{"output_type":"stream","name":"stdout","text":["0/64\n"]}],"source":["print('0/64')"],"metadata":{}},{"id":"3206af1c-fc7e-49d5-bf65-16ddb9129961","cell_type":"code","execution_count":null,"outputs":[],"source":["//https://worrydream.com/ExplorableExplanations/\n","# turso \n","# 60 days of executing all the notes"],"metadata":{}}],"metadata":{},"nbformat":4,"nbformat_minor":5}`;

  return <div dangerouslySetInnerHTML={{ __html: github_shit_2 }} />;
  //return <div dangerouslySetInnerHTML={{ __html: notebookHtml }} />;
}

function MagicIframe() {
  //caches and proxies
}

export default function Home() {
  return (
    <div className="overflow-hidden">
      <main>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 text-blue-700">
          <div>
            <ul>
              <li>1. 64 notebooks</li>
              <li>2. demo - livestream of unreal + webrtc</li>
              <li>3. llama-tools playwrgiht easier -- wysyig editor </li>
              <li>151 jupyter - https://www.jasondavies.com/ </li>
              <li> learn c++ and zig - CTF - hack my bot if you can! </li>
            </ul>

            <img src="https://nanosaur.ai/assets/images/nanosaur_og.jpg" />
            <div
              style={{
                transform: "rotateY(180deg)",
                transition: "transform 0.5s ease",
              }}
            >
              <img
                className="w-96 h-96 object-cover"
                src="https://images.squarespace-cdn.com/content/v1/65789f5bc31b3c64091939a3/31563aa0-c09d-46a1-a2d1-b0193528775e/STRETCH+3+KEYSHOT+2024+FULL+02+%281%29.png?format=2500w"
              />
              <iframe src="https://www.dynabot.dev/dynabot"></iframe>
            </div>
          </div>
          <iframe src="https://www.dynabot.dev/llama-tools/steps-kirby-demo">
            {" "}
          </iframe>
          <CameraCalibration />

          {/* <BuyRobotPage /> */}

          {/* <LivingRobotDemo  second_thing={SeeingSpace} /> */}
          {/* <PricingPage /> */}
          <Footer />
          {/* <LogoCloud /> */}
        </div>
      </main>
    </div>
  );
}

// import Image from "next/image";

// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <ul>

//         <li>
//           <a href="/dynabot">
//             dynabot.dev - living demo (medbot, repairbot, roombacat)
//           </a>
//         </li>

//       ------------
//       <li>
//           <a href="/dynabot/deno-webgpu">
//             deno-webgpu
//           </a>
//         </li>

// -------------
//         <li>
//           <a href="/jupyter">
//             jupyter
//           </a>
//         </li>

//         <li>
//           <a href="/files">
//             files-derp
//           </a>
//         </li>

//         <li>
//           <a href="/llama_tools">
//             llama-tools - tools for llama 3.2
//           </a>
//         </li>

//         <li>
//           <a href="/baby-dynamicland">baby dynamicland</a>
//         </li>

//       </ul>
//     </div>
//   );
// }

// //50 llamas - 50 gpus --- instantly interpret and deno-webpgu suggestions

import Link from "next/link";
import Image from "next/image";

function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
        <p className="text-xl text-gray-600">
          Support an independent business and a product made with love.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Free Tier */}
        <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Free</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <svg
                className="h-6 w-6 text-purple-500 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" />
              </svg>
              <span className="ml-3 text-gray-600">Mac, iPad, and iPhone</span>
            </li>
            {/* Add other list items similarly */}
          </ul>
          <p className="mt-8 text-2xl font-bold">
            Free <span className="text-gray-600">forever</span>
          </p>
          <Link href="https://apps.apple.com" className="mt-8 block">
            <Image
              src="/app-store-badge.png"
              alt="Download on the App Store"
              width={140}
              height={42}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Unlimited Tier */}
        <div className="rounded-lg border-2 border-purple-500 p-8 shadow-lg relative">
          <div className="absolute -top-5 right-0 left-0">
            <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-purple-500">Unlimited</h2>
          {/* Similar structure to Free tier */}
          <div className="mt-8">
            <span className="text-2xl font-bold">$9.99</span>/month
            <div className="mt-2">
              <span className="text-2xl font-bold">$99.99</span>/year
            </div>
          </div>
        </div>

        {/* Setapp Tier */}
        <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Setapp</h2>
          {/* Similar structure to other tiers */}
          <div className="mt-8">
            <span className="text-2xl font-bold">$9.99</span>/month
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Students and teachers can contact us at{" "}
          <a
            href="mailto:hello@museapp.com"
            className="text-purple-600 hover:text-purple-500"
          >
            hello@museapp.com
          </a>{" "}
          for an education discount.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          *Mac device is required for Setapp; iPad and iPhone are optional.
        </p>
      </div>
    </div>
  );
}
