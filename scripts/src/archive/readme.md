
uv pip install pymupdf
uv pip install pdf.js-extract
uv pip install pdf-lib
uv pip install PIL
uv pip install pyttsx3


uv 


<!-- https://docs.astral.sh/uv/ -->



const _ = [
  {
    name: "Machine Perception",
    pages: [
      { name: "Object Detection", path: "object-detection" },
      { name: "Camera Calibration", path: "camera-calibration" },
      { name: "Vision Transformers", path: "vision-transformers" },
    ],
  },
  {
    name: "Planning & Prediction",
    pages: [
      { name: "Attention Mechanisms", path: "attention-mechanisms" },
      { name: "Motion Trajectory Prediction", path: "motion-prediction" },
      { name: "LLMs vs Classical Planning", path: "llms-vs-classical" },
    ],
  },
  {
    name: "Simulation",
    pages: [
      { name: "Unreal Engine and Isaac ROS", path: "unreal-isaac" },
      { name: "Sim2Real Generalization", path: "sim2real" },
      { name: "Manipulation Policy Evaluation", path: "policy-evaluation" },
    ],
  },
  {
    name: "User Interfaces and Command Systems",
    pages: [
      { name: "Tele-guidance and Remote Control", path: "tele-guidance" },
      { name: "Command and Control Interface", path: "command-control" },
      { name: "Interactive Debugging", path: "interactive-debugging" },
    ],
  },
  {
    name: "Real World Applications",
    pages: [
      { name: "Cat Food", path: "cat-food" },
      { name: "Agriculture and Logistics", path: "agri-logistics" },
      { name: "House Building and Gardening", path: "house-garden" },
      { name: "Aqua Robotics", path: "aqua-robotics" },
    ],
  },
  {
    name: "Foundations of Hardware Design & Repair & Maintenance",
    pages: [
      { name: "Assembly", path: "assembly-disassembly" },
      { name: "Kinematics and Dynamics", path: "kinematics-dynamics" },
      { name: "Essential Robotics Tools", path: "robotics-tools" },
      { name: "Fault Diagnosis", path: "fault-diagnosis" },
      { name: "Motor and Sensor Repair", path: "motor-sensor-repair" },
      { name: "Preventative Maintenance", path: "preventative-maintenance" },
    ],
  },
  {
    name: "Electrical Engineering Essentials",
    pages: [
      { name: "Power Management", path: "power-management" },
      { name: "Embedded Systems", path: "embedded-systems" },
      { name: "Communication Protocols", path: "communication-protocols" },
    ],
  },
];

// {
//   name: "Building Robotics UI",
//   pages: [
//     { name: "Tele-guidance and Remote Control", path: "tele-guidance" }
//     // {name: "Command and Control Interface", path: "command-control"},
//     // {name: "Interactive Debugging", path: "interactive-debugging"}
//   ]
// }
//
const frontMatter = (path) => `---
  title: ${path}
---
   `;

// _.forEach((_) => {
//   _.pages.forEach((_) => {
//     const page = _;

//     fs.writeFileSync(
//       `course_content/src/${page.path}.md`,
//       frontMatter(page.name),
//     );
//   });
// });

//  Twitter  LinkedIn  Github  YouTube  Instagram  Email  Terms


// alan and bret were the only answers - there were others like kapilgupta, friends, wizards, family, but they were all helpful --- but alan and bret were the only ones who ---- 
// and it took a few months to really figure out how to implement their ideas.


//await processAllFilesInDirectory();


// Use Response as stdin.
//await $`cat < ${response} | wc -c`; // 125

// console.log('ollama');

// const res = await $`ollama run llama3.1 'how are you'`

// console.log(res)

// folders.forEach((_) => {
//   fs.writeFileSync(
//     `course_content/src/${_}.md`,
//     `---
// title: ${_}
// ---
// `,
//   );
// });

//import observableConfig from "../../course_content/observablehq.config.js";

//console.log("Observable Config:", observableConfig);
