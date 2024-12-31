// export default async function Home() {
  
//   return <div>on break -- 2025 incombing</div>;
// }

'use client'

import * as d3 from 'd3'
import Link from 'next/link'
import { useEffect, useState } from 'react'

interface FileItem {
  title: string;
  size: string;
  source: string;
}

const files: FileItem[] = []

const images = [
  "1734731436790.gif",
  "image-1734920932306.png",
  "image-1734920933546.png",
  "image-1734920933856.png",
  "image-1734920934165.jpeg",
  "image-1734920934477.png",
  "image-1734920934787.png",
  "image-1734920935097.png",
  "image-1734920935406.png",
  "image-1734920936026.png",
  "image-1734920964357.png",
  "image-1734920964665.png",
  "image-1734920964975.png",
  "image-1734920965282.png",
  "image-1734920965591.png",
  "image-1734920965902.png",
  "image-1734920966210.png",
  "image-1734920966519.png",
  "image-1734920966829.png",
  "image-1734920967140.png",
  "image-1734920967448.png",
  "image-1734920967757.png",
  "image-1734920968065.png",
  "image-1734920968374.png",
  "image-1734920968685.png",
  "image-1734920968996.png",
  "image-1734920969306.png",
  "image-1734920969618.png",
  "image-1734920969930.png",
  "image-1734920970241.png",
  "image-1734920970549.png",
  "image-1734920970858.png",
  "image-1734920971166.png",
  "image-1734920971477.png",
  "image-1734920971787.png",
  "image-1734920972096.png",
  "image-1734920972406.png",
  "image-1734920972716.png",
  "image-1734920973026.png",
  "image-1734920973334.png",
  "image-1734920973645.png",
  "image-1734920973951.png",
  "image-1734920974263.png",
  "image-1734920974574.png",
  "image-1734920974885.png",
  "image-1734920975198.png",
  "image-1734920975507.png",
  "image-1734920975820.png",
  "image-1734920976132.png",
  "image-1734920976438.png",
  "image-1734920976744.png",
  "image-1734920977050.png",
  "image-1734920977366.png",
  "image-1734920977672.png",
  "image-1734920977980.png",
  "image-1734920978291.png",
  "image-1734920978601.png",
  "image-1734920978905.png",
  "image-1734920979217.png",
  "image-1734920979526.png",
  "image-1734920979836.png",
  "image-1734920980143.png",
  "image-1734920980451.png",
  "image-1734920980761.png",
  "image-1734920981068.png",
  "image-1734920981383.png",
  "image-1734920981693.png",
  "image-1734920982003.png",
  "image-1734920982315.png",
  "image-1734920982624.jpeg",
  "image-1734920982936.png",
  "image-1734920983243.png",
  "waymo_map.webp"
];

for (let i = 0; i < images.length; i++) {
  files.push({
    title: ``,
    size: '',
    source:
      `/vis/${images[i]}`,
  })
}
// d3.shuffle(files)


const vis = {
  "topics": [
    {
      "id": 1,
      "title": "3D Simulation with Gazebo",
      "description": "Learn how to set up and simulate robot models in a realistic 3D environment using Gazebo."
    },
    {
      "id": 2,
      "title": "Robot Visualization with RViz",
      "description": "Explore how to use RViz in ROS to visualize sensor data, robot states, and interactive markers."
    },
    {
      "id": 3,
      "title": "Building URDF Models",
      "description": "Understand how to create and visualize robot models using the Unified Robot Description Format (URDF)."
    },
    {
      "id": 4,
      "title": "Interactive Markers in RViz",
      "description": "Implement interactive markers in RViz for user-driven control and manipulation of on-screen robots."
    },
    {
      "id": 5,
      "title": "Multi-Robot Coordination in Gazebo",
      "description": "Simulate fleets of robots in Gazebo to study collaborative control, path planning, and task allocation."
    },
    {
      "id": 6,
      "title": "Sensor Fusion Visualization",
      "description": "Combine data from multiple sensors in real time to provide a comprehensive view of a robot’s surroundings."
    },
    {
      "id": 7,
      "title": "Motion Planning with MoveIt!",
      "description": "Use MoveIt! with RViz to visualize and plan trajectories for robotic arms in simulation or on real hardware."
    },
    {
      "id": 8,
      "title": "ROS TF Frames Visualization",
      "description": "Display coordinate frames of complex robotic systems to better understand transformations and hierarchies."
    },
    {
      "id": 9,
      "title": "Map Building and SLAM",
      "description": "Visualize map building processes and pose updates using SLAM algorithms like gmapping or Cartographer."
    },
    {
      "id": 10,
      "title": "3D Point Cloud Rendering",
      "description": "Render point clouds from depth cameras or LiDAR sensors in RViz to observe real-time environmental data."
    },
    {
      "id": 11,
      "title": "Kinematic Chains Visualization",
      "description": "Show how joints and links of robotic arms move and connect through an interactive kinematic chain display."
    },
    {
      "id": 12,
      "title": "Robot Control Dashboards",
      "description": "Design interactive dashboards with control widgets and live data visualizations for teleoperation."
    },
    {
      "id": 13,
      "title": "Virtual Reality Robot Visualization",
      "description": "Explore VR environments to view and interact with robot simulations in an immersive 3D space."
    },
    {
      "id": 14,
      "title": "AR Overlays for Robotics",
      "description": "Use augmented reality headsets to overlay robot status, sensor readings, and path planning in the real world."
    },
    {
      "id": 15,
      "title": "Navigation Stack Visualization",
      "description": "Inspect navigation goals, local and global paths, and costmaps in RViz to debug robot navigation behavior."
    },
    {
      "id": 16,
      "title": "Trajectory Visualization",
      "description": "Plot and analyze robot trajectories to understand motion planning outcomes and optimize route efficiency."
    },
    {
      "id": 17,
      "title": "Robot Arm Grasp Simulation",
      "description": "Visualize robotic grippers closing on target objects to evaluate grasp planning algorithms."
    },
    {
      "id": 18,
      "title": "Collision Detection and Avoidance",
      "description": "Detect collisions in real time within simulated environments to prevent robot damage or unsafe maneuvers."
    },
    {
      "id": 19,
      "title": "RQT Graph for ROS Nodes",
      "description": "Visually represent communication between ROS nodes, topics, and services for better debugging."
    },
    {
      "id": 20,
      "title": "Gazebo Plugin Visualization",
      "description": "Enhance simulations with custom Gazebo plugins to visualize sensor noise, contact forces, or advanced physics."
    },
    {
      "id": 21,
      "title": "Lidar Scan Visualization",
      "description": "Render 2D lidar scans in RViz to identify obstacles, measure distances, and support SLAM applications."
    },
    {
      "id": 22,
      "title": "Map Server and AMCL",
      "description": "Visualize robot localization within a pre-built map using Adaptive Monte Carlo Localization in RViz."
    },
    {
      "id": 23,
      "title": "3D Model Import into Gazebo",
      "description": "Import custom 3D object models (like furniture or machinery) to create realistic robot simulation scenarios."
    },
    {
      "id": 24,
      "title": "Dynamic Simulation with Physics Engines",
      "description": "Explore the impact of gravity, friction, and collisions in robotics using simulators like ODE or Bullet."
    },
    {
      "id": 25,
      "title": "Camera Calibration and Visualization",
      "description": "Visualize camera images and perform calibration checks to ensure accurate robot vision workflows."
    },
    {
      "id": 26,
      "title": "Heatmaps for Sensor Data",
      "description": "Create heatmaps from sensor data to quickly spot high-intensity areas, like distance or temperature readings."
    },
    {
      "id": 27,
      "title": "Visual Odometry Debugging",
      "description": "Plot odometry data to validate robot motion estimates and correct drifting or calibration errors."
    },
    {
      "id": 28,
      "title": "Interactive Scripts in Jupyter for Robotics",
      "description": "Use Jupyter notebooks for plotting sensor data, controlling robots, and visualizing results in real time."
    },
    {
      "id": 29,
      "title": "Point Cloud Segmentation",
      "description": "Display segmented point clouds to separate foreground objects from backgrounds for advanced perception tasks."
    },
    {
      "id": 30,
      "title": "3D Mesh Visualization",
      "description": "Render 3D mesh models of robots or environments for improved realism in simulation and debugging."
    },
    {
      "id": 31,
      "title": "Open3D for Robotics",
      "description": "Leverage Open3D libraries to visualize point clouds, meshes, and perform advanced geometric processing."
    },
    {
      "id": 32,
      "title": "Robotic Swarm Visualization",
      "description": "Animate multiple robots working together in a swarm, highlighting interactions and group objectives."
    },
    {
      "id": 33,
      "title": "Distance and Proximity Sensors",
      "description": "Use distance sensor data, such as ultrasound or IR, to visualize how robots perceive close-range objects."
    },
    {
      "id": 34,
      "title": "Simulating Differential Drive Robots",
      "description": "Set up and visualize differential drive robots, including wheel encoders, odometry, and motion constraints."
    },
    {
      "id": 35,
      "title": "In-circuit Signal Visualization",
      "description": "Monitor and visualize signals at the microcontroller level to debug robotics hardware integration."
    },
    {
      "id": 36,
      "title": "Marine Robot Simulation",
      "description": "Simulate underwater or surface vehicles with environment-specific factors like buoyancy and water currents."
    },
    {
      "id": 37,
      "title": "Aerial Drone Visualization",
      "description": "Visualize drone flight paths, sensor data, and control signals for multi-rotor or fixed-wing UAVs."
    },
    {
      "id": 38,
      "title": "Mechanical Linkage Animations",
      "description": "Create animations of gears, levers, and linkages to illustrate the mechanics of complex robot assemblies."
    },
    {
      "id": 39,
      "title": "Robot End-Effector Paths",
      "description": "Display the paths of end-effectors (grippers, tools) in real or simulated environments to refine planning."
    },
    {
      "id": 40,
      "title": "Telemetry Data Dashboards",
      "description": "Set up real-time dashboards for critical telemetry like battery level, temperature, and motor currents."
    },
    {
      "id": 41,
      "title": "Physics-Based Soft Robot Simulation",
      "description": "Visualize soft, deformable robots in simulations that account for elasticity and shape changes."
    },
    {
      "id": 42,
      "title": "Haptic Feedback Visualization",
      "description": "Integrate haptic devices with robotics software and visualize force-feedback interactions."
    },
    {
      "id": 43,
      "title": "Network Topology for Distributed Robots",
      "description": "Map out communication networks for distributed robot systems, including bandwidth and latency metrics."
    },
    {
      "id": 44,
      "title": "Path Optimization Visual Aid",
      "description": "Compare multiple path planning solutions side by side for speed, safety, and energy usage optimization."
    },
    {
      "id": 45,
      "title": "Thermal Imaging Overlays",
      "description": "Use thermal camera data to visualize temperature gradients and detect overheating in robotic components."
    },
    {
      "id": 46,
      "title": "Factory Floor Robot Simulations",
      "description": "Model assembly line robots and conveyor belts with interactive layers showing throughput and potential jams."
    },
    {
      "id": 47,
      "title": "Time-lapse of Robot Operations",
      "description": "Generate accelerated visual timelines of complex robot tasks to study efficiency and detect bottlenecks."
    },
    {
      "id": 48,
      "title": "Multi-Camera Robot Monitoring",
      "description": "Display video feeds from multiple cameras on a single dashboard for complete situational awareness."
    },
    {
      "id": 49,
      "title": "State Machine Visualization",
      "description": "Graphically depict finite state machines controlling robots, highlighting transitions and active states."
    },
    {
      "id": 50,
      "title": "Advanced Kinematics Visualization",
      "description": "Show forward and inverse kinematics solutions for complex manipulators, emphasizing reachable workspaces."
    }
  ]
}

function Header() {
  return (
    <div className="flex justify-between items-center p-8 border-b border-gray-700 bg-[#1e2231] text-[#8b98e8]">
      <div className="flex flex-col space-y-2">
        <h1 className="text-5xl font-bold tracking-tight text-[#8b98e8]">Adnan Wahab</h1>
        <div className="flex space-x-4 text-gray-400">
          <a href="https://github.com/adnanwahab" className="hover:text-[#8b98e8]">github</a>
          <a href="https://x.com/dynabotdev" className="hover:text-[#8b98e8]">twitter</a>
          <a href="https://linkedin.com/in/adnanwahab" className="hover:text-[#8b98e8]">linkedin</a>

          <a href="/blog" className="hover:text-[#8b98e8]">blog</a>
        </div>
      </div>
      <img 
        src="/personal/friends.jpg" 
        alt="Profile"
        className="w-32 h-32 rounded-lg"
      />
    </div>
  )
}

function PortfolioGrid() {
  const [shuffledFiles, setShuffledFiles] = useState<FileItem[]>(files);

  useEffect(() => {
    const processedFiles: FileItem[] = [...files];
    for (let i = 0; i < images.length; i++) {
      processedFiles.push({
        title: ``,
        size: '',
        source: `/vis/${images[i]}`,
      });
    }
    setShuffledFiles(d3.shuffle(processedFiles));
  }, []);

  return (
    <div className="p-8 bg-[#1e2231]">
      <h2 className="text-2xl font-semibold mb-6 text-[#8b98e8]">Visualisations</h2>
      <ul role="list" className="grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {shuffledFiles.map((file, index) => (
          <Link href={``} key={index}>
            <li className="relative group">
              <div className="aspect-[10/7] overflow-hidden rounded-lg bg-gray-800">
                <img
                  alt=""
                  src={file.source}
                  className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                />
              </div>
              <p className="mt-2 text-sm font-medium text-[#8b98e8] truncate">{file.title}</p>
              {file.size && (
                <p className="text-sm text-gray-400">{file.size}</p>
              )}
            </li>
          </Link>
        ))}
      </ul>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-[#1e2231]">
      <Header />
      <PortfolioGrid />
    </div>
  )
}
