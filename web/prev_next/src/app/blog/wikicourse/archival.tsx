/// app/page.js
// function Notion_ListView() {
//   const res = await fetch(
//     `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/notion`,
//     {
//       cache: "no-store",
//     },
//   );
//   const json = await res.json();

//   if (!res.ok) {
//     return <div>Error: {json.error}</div>;
//   }

//   const data = json.data || [];

//   return (
//     <main className="p-8">
//       <h1 className="text-2xl font-bold mb-4">Notion Database Entries</h1>
//       <ul className="space-y-2">
//         {data.map((item) => {
//           // Each item is a page object from the Notion API.
//           // Extract a title property from the page if it exists:
//           const title =
//             item.properties?.Name?.title?.[0]?.plain_text || "Untitled";
//           return (
//             <li key={item.id} className="p-4 bg-white shadow rounded">
//               {title}
//             </li>
//           );
//         })}
//       </ul>
//     </main>
//   );
// }

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


            