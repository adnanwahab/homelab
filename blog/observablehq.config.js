export default {
  title: "robotics-odyssey",

  pages: [
    {
      name: "Dynamicland.org",
      pages: [
        {
          name: "Dynamicland is the future of robotics and biotech",
          path: "/dynamicland/dynamicland",
        },
       
      ],
    },
    {
      name: "Geospatial HD Mapping",
      pages: [
        {
          name: "Open street maps osmium",
          path: "/maps/open-street-maps",
        },
        { name: "HD Mapping", path: "/maps/hd-mapping" },
      ],
    },

    {
      name: "Modern C++",
      pages: [
        { name: "Memory Management", path: "/cpp/memory-management" },

        {
          name: "Concurrency & Parallelism",
          path: "/cpp/concurrency-parallelism",
        },
      ],
    },

    {
      name: "Simulation ",
      pages: [
        {
          name: "Reinforcement Learning with Unity",
          path: "/simulation/reinforcement-learning",
        },
        // { name: "Unreal Engine", path: "/simulation/Unreal-Engine" },
      ],
    },

    {
      name: "Machine Perception ",
      pages: [
        {
          name: "Object Detection",
          path: "/perception/object-detection",
        },
       
      ],
    },


    {
        name: "Embedded Systems",
        pages: [
            { name: "zig", path: "/embedded/zig" },
            {
                name: "hardware in the loop simulation",
                path: "/embedded/hardware-in-the-loop-simulation",
            },
        ],
    },

    {
      name: "Computer Vision",
      pages: [
        {
          name: "Object Detection with yolo",
          path: "/perception/object-detection",
        },
        {
          name: "Scene Understanding",
          path: "/perception/scene-understanding",
        },
        {
          name: "Semantic Segmentation with segment-anything-2",
          path: "/perception/semantic-segmentation",
        },
        {
          name: "Sensor Calibration",
          path: "/perception/sensor-calibration",
        },
      ],
    },
    {
        name: "Devops",
        pages: [
            { name: "terraform", path: "/devops/terraform" },
            { name: "docker", path: "/devops/docker" },
        ],
    },

    {
        name: "Robotics",
        pages: [
            { name: "Motion Planning", path: "/robotics/motion-planning" },
        ],
    },

    {
        name: "Hardware Engineering",
        pages: [
            {
                name: "Soldering, PCB, and 3D Printing",
                path: "/hardware/soldering-pcb-3d-printing",
            },
        ],
    },

    {
      name: "Data Visualization",
      pages: [
        {
          name: "capacity planning",
          path: "/data-vis/capacity-planning",
        },
        {
          name: "Anomaly Detection",
          path: "/data-vis/anomaly-detection",
        },
        { name: "Systems Design", path: "/data-vis/systems-design" },
        {
          name: "Crisis Diagnosis",
          path: "/data-vis/crisis-diagnosis",
        },
      ],
    },

    {
        name: "Data Analysis",
        pages: [{ name: "olap", path: "/data-analysis/olap" }],
    },

    {
        name: "Networking and Connectivity",
        pages: [
            {
                name: "Dashboard",
                path: "/connectivity/tailscale-caddy-dns-porkbun",
            },
            { name: "Report", path: "/connectivity/livekit-webrtc" },
        ],
    },
    {
        name: "LLMs theory and practice",
        pages: [
            {
                name: "ollama-claude-o1-pro",
                path: "/llms/ollama-claude-o1-pro",
            },
        ],
    },

    {
        name: "Python Fundamentals",
        pages: [
            {
                name: "uv jupyter testing",
                path: "/python/uv_jupyter_testing",
            },
        ],
    },

    {
        name: "NeuroScience and Biotech",
        pages: [
            { name: "Free will", path: "/neuroscience/free-will" },
            {
                name: "Single Cell Analysis",
                path: "/neuroscience/single-cell-analysis",
            },
        ],
    },

    // {
    //     name: "Dynamicland",
    //     pages: [{ name: "Dynamicland", path: "/dynamicland/dynamicland" }],
    // },

    // {
    //     name: "Embedded Systems",
    //     pages: [
    //         { name: "zig", path: "/embedded/zig" },
    //         {
    //             name: "hardware in the loop simulation",
    //             path: "/embedded/hardware-in-the-loop-simulation",
    //         },
    //     ],
    // },

    // {
    //     name: "Simulation with Unreal Engine",
    //     pages: [
    //         {
    //             name: "Dashboard",
    //             path: "/simulation/reinforcement-learning",
    //         },
    //         { name: "Report", path: "/simulation/reinforcement-learning" },
    //     ],
    // },
    {
        name: "Computer Vision",
        pages: [
            {
                name: "Object Detection with yolo",
                path: "/perception/object-detection",
            },
            {
                name: "Scene Understanding",
                path: "/perception/scene-understanding",
            },
            {
                name: "Semantic Segmentation with segment-anything-2",
                path: "/perception/semantic-segmentation",
            },
            {
                name: "Sensor Calibration",
                path: "/perception/sensor-calibration",
            },
        ],
    },
  ],

  // Content to add to the head of the page, e.g. for a favicon:
  head: ``,

  // The path to the source root.
  root: "src",

  // Some additional configuration options and their defaults:
  theme: "slate", // try "light", "dark", "slate", etc.
  header: "robotics odyssey blog", // what to show in the header (HTML)
  //footer: "", // what to show in the footer (HTML)
  sidebar: true, // whether to show the sidebar
  toc: true, // whether to show the table of contents
  pager: true, // whether to show previous & next links in the footer
  // output: "dist", // path to the output root for build
  search: true, // activate search
  linkify: true, // convert URLs in Markdown to links
  typographer: true, // smart quotes and other typographic improvements
  // preserveExtension: false, // drop .html from URLs
  // preserveIndex: false, // drop /index from URLs
};
