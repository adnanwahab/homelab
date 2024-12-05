export default function () {
  return <>asdf</>
}

// import DinoCustomizer from "./DinoCustomizer.jsx";
// import React, { useRef, useEffect } from "react";
// import Header from "../views/Header.js";
// import fs from "fs";
// import Constructionism from "./Constructionism.jsx";
// import Support_Students from "./support_students.jsx"; //support played well can support a carry who  didnt't get enough gold early game to win the game for both sides.
// import CatGrid from "./CatGrid.jsx";
// import Pricing from "./pricing.jsx";
// //import {marked} from "marked";
// import Readme_renderer from "./Readme_renderer.jsx";
// import What_is_roomba_cat from "./What_is_roomba_cat.jsx";

// import FourFrameWidget from "./observable_understanding_of_ai.jsx";

// function feedback() {
//   return <div>
//     <textarea className="w-full h-full">
//       what would you like your roomba cat to do ? 
//     </textarea>
//   </div>
// }

// import LlamaGrid from "./LamaGrid.jsx";
// import Footer from "./Footer.jsx";
// import Sisterschools from "./sisterschools.jsx";
// import Guest_instructor from "./Guest_instructor.jsx";
// import PowerPoint from "./PowerPoints.jsx";
// let url = 'https://e7.pngegg.com/pngimages/708/311/png-clipart-icon-logo-twitter-logo-twitter-logo-blue-social-media.png'




// function BillOfMaterials () {
//   const markdown = marked(fs.readFileSync('./src/markdown/bill-of-materials.md', 'utf8'));
//   return <div className="text-teal-100" dangerouslySetInnerHTML={{ __html: markdown }} />
// }

// function Livekit() {
//   return <div>
//      <div className="flex justify-center space-between space-4 mt-6 w-full mx-auto mb-4">   
//                   <div className="flex w-1/2 pr-4">
//                     <iframe src="/llama_zed" className="w-1/2  mb-4"></iframe>
                  

//                   </div>
//                   <div className="flex">
//                     {/* <iframe src="https://roboticsuniversity.observablehq.cloud/robotics-odyssey/" 
                    
//                   width="100%"
//                     height="500px"
//                     className=""><iframe> */}
//                         </a>
//                       </div>
//         </div>
// }


// function Youtube() {
//   <h1 className="text-teal-100">
//     <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="shiny-text">
//       Currently WOrk in progress - Launching 100% on Nov 23.
//     </a>
//     <iframe width="560" height="315" src="https://www.youtube.com/embed/5QHy1vTpQiA?si=KKEV_lVwMMd3gDPq" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//   </h1>


// }


// function Observable() {
//       const sections = [
//       {
//         id: "01",
//         title: "Perception",
//         description: "Computer vision, machine audio processing, and voice understanding systems forming the sensory foundation of AI systems. Enabling machines to see, hear, and comprehend their environment."
//       },
//       {
//         id: "02",
//         title: "Prediction & Reasoning",
//         description: "Advanced motion planning, LLM attention mechanisms, and reasoning systems. Exploring the frontier of LLM + Vision transformers for enhanced cognitive capabilities and decision-making."
//       },
//       {
//         id: "03",
//         title: "Simulation",
//         description: "Robotics safety validation, video game UI frameworks, and synthetic data generation. Creating virtual environments for training, testing, and improving AI systems."
//       },
//       {
//         id: "04",
//         title: "Real World Applications",
//         description: "Robot Lemonade Stand + Arcology experiments, Dynamicland implementations, and practical applications of Dynamical Systems Theory in robotics."
//       }
//     ];
  
//     return (
//       <div className="w-full max-w-6xl mx-auto p-6 bg-gray-900">
//         {/* Header */}
//         <div className="mb-8">
//           <h2 className="text-2xl font-bold text-white mb-2">AI & Robotics Research Areas</h2>
//           <p className="text-gray-400">Exploring the intersection of artificial intelligence and robotics through four key domains</p>
//         </div>
        
//         {/* Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//           {sections.map((section) => (
//             <div 
//               key={section.id}
//               className="relative p-6 bg-gray-800 rounded-lg border border-gray-700 hover:border-gray-600 transition-all duration-200"
//             >
//               {/* Section Number */}
//               <div className="absolute top-3 right-3 text-gray-500 font-mono">
//                 {section.id}
//               </div>
              
//               {/* Content */}
//               <div>
//                 <h3 className="text-lg font-semibold text-white mb-2">
//                   {section.title}
//                 </h3>
//                 <p className="text-gray-400 text-sm leading-relaxed">
//                   {section.description}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
  
//         {/* Video Button */}
//         <div className="mt-8 flex justify-center">
//           <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200">
//             Watch Video
//           </button>
//         </div>
//       </div>
//     );
// }

// function Titles() {
//   return <div>
//       <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
//         From Nanobots to Iron Giant and Beyond: Dynamicland = Robotics UI done Better. 
//       </h2>

//       <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
//         Robotics Will create 10 billion high-paying, fun jobs where you just babysit a robot.
//       </h2>

//       <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
//        Lifetime Updates - 2 new world-class AI+robotics demos per week - DemoDay on Fridays.
//       </h2>


//       <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
//        Alexander wang says "scaling phase" of AI is over. Now its time for Innovation phase
//       </h2>

//       <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
//        Steam Engine + Electricity displaced workers short-term and long-term created more jobs, wealth and prosperity.
//       </h2>

//       <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
       
//        We want to shorten this transition period by 100x.
//        </h2>

//        <h2 className="text-5xl font-semibold shiny-text"></h2> <h3 className="shiny-text text-xl font-semibold tracking-tight text-white">
       
//       Text + ai = boring. But Images + interactivity increases memory + retention and engagement.
//        </h2>

//   </div>
// }


// /*
//   This example requires some changes to your config:
  
//   ```
//   // tailwind.config.js
//   module.exports = {
//     // ...
//     plugins: [
//       // ...
//       require('@tailwindcss/aspect-ratio'),
//     ],
//   }
//   ```
// */

// function FigmaNotebook() {
//   return <div>
//     <h1>Figma</h1>
//     {/* <canvas id="figma-canvas"></canvas> */}
//     <iframe width="100%" height="376" frameborder="0"
//   src="https://observablehq.com/embed/@xaris/drawable-canvas-element?cells=canvas"></iframe>
//   </div>
// }

// //in the right enviroment - everyone is happy.


// function NotionBook () {
//   return <div>
//     <h1>Notion</h1>
//     <textarea className="w-full h-full">
//       asdlkfasldkfjasldkfjasdf
//       asdlfkajsdlfkajsf
//       asdlkfasldkfjasldkfjasdfsdfasdflkjasdlfkasd
//       fastdfas
//       fas
//       fasldkfjlaskdjf
//       asdlkfasldkfjasldkfjasdfsdfasdflkjasdlfkasdasdf
//       asdlfkajsdlfkajsfasdf
//       async function name
        
//       }
//     </textarea>
//   </div>
// }


// //wheel chair 500 + manequin - 
// const features = [
//   {
//     name: 'Figma = fire = iroh',
//     description: 'Reddit.com/r/places = 100k concurrent users',
//     //imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-08-detail-01.jpg',
//     //imageAlt: 'Green cardstock box containing white, beige, and brown cards.',
//     component: FigmaNotebook 
//   },
//   {
//     name: 'Notion = water = korra',
//     description: 'Say what you want, llama figure out how - robot do what you mean.',
//     //imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-08-detail-02.jpg',
//     //imageAlt: 'Green cardstock box open with 50 cards inside.',
//     component: NotionBook 
//   },
//   {
//     name: 'Observablehq/Jupyter = air = aang',
//     description: '',
//     //imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-08-detail-03.jpg',
//     //imageAlt: 'Detail of white today card, beige next card, and brown someday card with dot grid.',
//     component: ProxyObservable 
//   },
//   {
//     name: 'Livekit = ground truth = toph',
//     description: '',
//     //imageSrc: 'https://tailwindui.com/plus/img/ecommerce-images/product-feature-08-detail-04.jpg',
//     //imageAlt: 'Stack of three green cardstock boxes with 3 hole cutouts showing cards inside.',
//     component: LivekitNotebook 
//   },
// ]
// function ProxyObservable() {
//   return <div>
//     <iframe src="/proxy_observable" width="100%" height="500px"></iframe> 
//   </div>
// }

// function LivekitNotebook() {
//   return <div>
//     <h1>Livekit</h1>
//     <div className="livekit-notebook">
//     <button id="startButton">Start</button>
//       <video className="w-full h-full livekit-video"></video>
//       <img src="https://files.hashirama.blog/blog/floorplan.jpg" />

//     <video autoPlay loop muted src="public/radiation-pressure.mp4" />
//     </div>
//   </div>
// }

// function ButtonGroup() {
//   return (
//     <span className="isolate inline-flex rounded-md shadow-sm">
//       <button
//         type="button"
//         className="relative inline-flex items-center rounded-l-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//         5 year old entrepreneur
//       </button>
//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//         College Student
//       </button>
//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//         Construction Worker / Robot Systems Techncian / Mechatronist Specialist
//       </button>


//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//         Knowledge Worker / Financial Analyst / Marketing Manager
//       </button>

//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//         Knowledge Worker / Financial Analyst / Marketing Manager
//       </button>




//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//       Aritist / Scientist / 
//       </button>


//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//      Parents / Care Givers / Teachers / Grandparents
//       </button>



//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//      Parents / Care Givers / Teachers / Grandparents
//       </button>
//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//      Parents / Care Givers / Teachers / Grandparents
//       </button>


//       <button
//         type="button"
//         className="relative -ml-px inline-flex items-center rounded-r-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10"
//       >
//  Healthcare Workers (Nurses, Technicians, Physicians, etc.)
//        </button>

   
//     </span>
//   )
// }



// function TimeSkipFunnel () {
//   return <div>
//       <h1>Time Skip</h1>
//       <div class="bg-gray-900 text-white font-sans">
//       <ButtonGroup />
//   <div class="p-8 text-center">
//     <h1 class="text-3xl font-bold mb-4">English language + diagram generation for understandable robots</h1>
//     <h1 class="text-3xl font-bold mb-4">Free Training program for Technicians, operators, and people who want to learn to build and robots for fun and profit. </h1>
//     <h1 class="text-3xl font-bold mb-4">Join the fastest growing sector of the economy - 11% yoy growth (doubles every 7 years</h1>
//     <h1 class="text-3xl font-bold mb-4">Robotics is the ultimate complement to AI because the only thing a chatbot can't do is clean your room.</h1>

//     <h1 class="text-3xl font-bold mb-4">oh noes will robots+ai eat jobs or make it easier to outsource?</h1>
//       <h1 class="text-3xl font-bold mb-4">Nop actually robots will create 800 million high paying jobs where you just babysit a robot - Jensen Huang.</h1>

//       <h1 class="text-3xl font-bold mb-4">All companies will make more revenue, and 50% less margins - like Waymo+Zoox+Cruise.</h1>
//       <h1 class="text-3xl font-bold mb-4">Instead of a bar that is run by 3 people, understaffed, and overworked - you will have a robot bartender that makes cocktails and serves them and cleans up and the people just have to order parts from amazon and supervise millions of agents.</h1>
//       <h1 class="text-3xl font-bold mb-4">Current world ecnomy is 130 trillion - Robotics+AI market will increase that by 100 trillion -Hal Varian (Chief Economist Google) </h1>
//       <h1 class="text-3xl font-bold mb-4">We want to rapidly shorten the transition period by 10,000x</h1>
//       <h1 class="text-3xl font-bold mb-4">Instead of a 2-4 year degree, you can learn to build robots in 2 weeks from scratch.</h1>
//       <h1 class="text-3xl font-bold mb-4">The program is 100% free and it's a wiki-course so everyone can contribute (because no one knows everything about robots).</h1>
//       <h1 class="text-3xl font-bold mb-4">Advanced Artifical Intelligence broken down into super fun and easy to learn modules (like a video game).</h1>
//       <h1 class="text-3xl font-bold mb-4">At Samasource and Scale.ai - I helped create Millions of jobs with Alex Wang, Casey Sackett Leilah, </h1>
//       <h1 class="text-3xl font-bold mb-4">Every human is blessed with infinite cognition and modern schools are only 100 years old and have not not been able to tap into your latent abilities.</h1>
//       <h1 class="text-3xl font-bold mb-4">Dynamicland Unlocks your infinite cognition - Capaibility Amplificaiton - 8 billion people learning together are way more powerful than 30 million NVidia GPUs sold per year.</h1>
//       <h1 class="text-3xl font-bold mb-4">tbh ai + robots are kinda boring sometimes, but Dynamicland is the greatest invention of the century - sincrely patennted ex Computer Vision Data Engineer</h1>
//       <h1 class="text-3xl font-bold mb-4">
//         Alan Kay created 30T of wealth in 1975 with the first graphical user interface. OPenAI was born when ALan Kay spoke to Sam Altman at VPRI.

//       </h1>
//       <h1 class="text-3xl font-bold mb-4">
//         Alan Kay's 3rd greatest Victory after OpenAI, Xerox Parc is Dynamicland.
        
//       </h1>

//       <h1 class="text-3xl font-bold mb-4">
//        Dynamicland = 100T.
//        Robotics+AI = 100T. 
//        Current Economy = 130T.
//       When world generates 330T, tottal pize size / 330T = 36k per year = UBI our goal. 
//       </h1>
//       <h1 class="text-3xl font-bold mb-4">
//        Dynamicland = 100T.
//        Robotics+AI = 100T. 
//        Current Economy = 130T.
//       When world generates 330T, tottal pize size / 330T = 36k per year = UBI our goal. 
//       </h1>



//       <h1 class="text-3xl font-bold mb-4">
//       Bret Victor invented the Future of Human User Interface @ Dynamicland.
//       </h1>

//       <h1 class="text-3xl font-bold mb-4">
//       Why Human User Interface important? Technology doesnt change the world, people do.
//       </h1>
//       <h1 class="text-3xl font-bold mb-4">
      
//       Technology has no soul, but people do.
//       </h1>


//       <h1 class="text-3xl font-bold mb-4">
      
// Human User Interface = Seeing, Reasoning, and Thinking made into physical form.
//       </h1>

//       <h1 class="text-3xl font-bold mb-4">
//      Dynamicland = Super Collaboration IRL Space - Shared Model of Reasoning = Infininte money cheat code.

//       </h1>

//       <h1 class="text-3xl font-bold mb-4">
//     Bret Victor - Predicted the future 22 years ago --
//     Our pioneers are those who transcend interaction—designers whose creations anticipate, not obey. 
//     The hero of tomorrow is not the next Steve Wozniak, but the next William Playfair. 
//     An artist who redefines how people learn. An artist who paints with magic ink.
//       </h1>

//       <h1 class="text-3xl font-bold mb-4">
//   Thats you! Paint Magic Pictures to Teach Robotics, AI how to create everything you want!
//       </h1>


//       <h1 class="text-3xl font-bold mb-4">
//   We are making a new school that has no hierarchy. No students and teachers. Everyone learns together.
//   The only way to learn is to do and teach each other!!
//       </h1>
//       {/* https://lumalabs.ai/dream-machine/api */}
//     {/* <input
//       type="email"
//       placeholder="Enter your email"
//       class="p-3 rounded-md text-gray-900"
//     /> */}
//   </div>

  
//   <div class="flex justify-center space-x-8 px-8">
    
//     <div class="w-1/3 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//     <h3 class="text-xl font-semibold text-center py-4">Past</h3>

//       <img src="https://images.emulatorgames.net/nintendo-famicom-disk-system/Super%20Mario%20Brothers%20(Japan).png" alt="Past" />
//     </div>

    
//     <div class="w-1/3 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//     <h3 class="text-xl font-semibold text-center py-4">Present</h3>

//       <img src="https://media2.giphy.com/media/kWDKV5Msj2WsM/giphy.gif?cid=6c09b9524himymppeusgnyvnu5g1g0gcuuu8rx0jlpd7dms8&ep=v1_internal_gif_by_id&rid=giphy.gif&ct=g" alt="Present" />
//     </div>


//     <div class="w-1/3 bg-gray-800 rounded-lg overflow-hidden shadow-lg">
//     <h3 class="text-xl font-semibold text-center py-4">Future</h3>

//       <img src="https://files.hashirama.blog/blog/future-city.gif" alt="Future" />
//     </div>
//   </div>

//   {/* https://files.hashirama.blog/blog/health_wealth.gif */}
//   {/* https://files.hashirama.blog/blog/horizon.png */}
//   {/* https://files.hashirama.blog/blog/infinity.png */}
//   {/* https://files.hashirama.blog/blog/Optimized%20copy%202.gif */}
//   <div class="text-center mt-12">
//     <h2 class="text-4xl font-bold mb-4">Easy-to-use Robotics</h2>
//     <p class="text-lg mb-6 max-w-2xl mx-auto">
//       alsdkfalkfals
//       {/* Robotics is the ultimate complement to AI because the only thing a chatbot can't do is clean your room. */}
//     </p>
//     <a
//       href="#"
//       class="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-6 rounded-md"
//     >
//       Get started
//     </a>
//     <p class="text-blue-300 mt-2"><a href="#">Read the docs</a></p>
//   </div>

  
//   <div class="flex justify-center space-x-8 mt-12 px-8">
    
//     <div class="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
//       <div class="bg-blue-500 p-3 rounded-full">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           class="w-6 h-6 text-white"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M3 8.25h2.25m13.5 0H21m-9-5.25v16.5M3 12h18"
//           />
//         </svg>
//       </div>
//       <div>
//         <h3 class="text-lg font-bold">Pet Care</h3>
//         <p class="text-sm text-gray-400">Feed stray cats and dogs.</p>
//       </div>

//     </div>
//     <video autoPlay  width="400px" loop muted src="https://files.hashirama.blog/dist/2.mp4" />


//     <div class="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
//       <div class="bg-blue-500 p-3 rounded-full">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           class="w-6 h-6 text-white"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M6.75 9v10.5M12 9v10.5m5.25-10v10.5"
//           />
//         </svg>
//       </div>
//       <div>
//         <h3 class="text-lg font-bold">Automate Chores</h3>
//         <p class="text-sm text-gray-400">Fold laundry, load dishes.</p>
//       </div>
//     </div>


//     <div class="bg-gray-800 p-6 rounded-lg flex items-center space-x-4">
//       <div class="bg-blue-500 p-3 rounded-full">
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           viewBox="0 0 24 24"
//           stroke-width="1.5"
//           stroke="currentColor"
//           class="w-6 h-6 text-white"
//         >
//           <path
//             stroke-linecap="round"
//             stroke-linejoin="round"
//             d="M5.25 6.75h13.5M5.25 12h13.5M5.25 17.25h13.5"
//           />
//         </svg>
//       </div>
//       <div>
//         <h3 class="text-lg font-bold">Infinite Creation</h3>
//         <p class="text-sm text-gray-400">Gardening, painting, etc.</p>
//       </div>
//     </div>
//   </div>
// </div>
      

//   </div>
// }


// function Avatar_Notebook() {

//   // Avatar Beyond = Beyamn Beyond - ---
//   return (
//     <div className="">
//       <div className="mx-auto max-w-2xl px-4  sm:px-6  lg:max-w-7xl lg:px-8">
//         <div className="max-w-3xl">
//           {/* <h2 id="features-heading" className="font-medium text-gray-500">
//             Focus
//           </h2> */}
//           {/* <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Avatar Beyond</p>
//           <p className="mt-4 shiny-text">
//             "Creative AI is the most exciting field in Robotics" - Kai Wang, Director of Prediction!
            
//           </p>
//           <p className="mt-4 shiny-text">
//             Avatar Notebook = Figma - Notion - ObservableHq/Jupyter - LiveStream Robotics
            
//           </p> */}
//         </div>

//         <div className="mt-11 grid grid-cols-1 items-start gap-x-6 gap-y-16 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-8">
//           <div key={features[0].name} className="flex flex-col">
//             <div className="mt-6">
//               {/* <img src="https://static1.cbrimages.com/wordpress/wp-content/uploads/2020/06/Iroh-Dragon-of-the-west-featured.jpg" /> */}
//               <h3 className="text-sm font-medium shiny-text">{features[0].name}</h3>
//               <p className="mt-2 text-sm shiny-text">{features[0].description}</p>
//             </div>
//             <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
//               <FigmaNotebook />
//               {/* <iframe src="http://localhost:5173" width="100%" height="500px"></iframe> */}
//             </div>
//           </div>
//           <div key={features[1].name} className="flex flex-col">
//             <div className="mt-6">
//               {/* <img src="https://media.tenor.com/blO5N8znhCUAAAAM/legend-of.gif" /> */}
//               <h3 className="text-sm font-medium shiny-text">{features[1].name}</h3>
//               <p className="mt-2 text-sm shiny-text">{features[1].description}</p>
//             </div>
//             <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
//               <NotionBook />
//               {/* <img src="https://pbs.twimg.com/media/EAv7fT5UIAAD7zA?format=jpg&name=4096x4096" /> */}

//             </div>
//           </div>
//           <div key={features[2].name} className="flex flex-col">
//           {/* <img src="https://i.redd.it/ze345w68d7t51.jpg" /> */}

//             <div className="mt-6">
//               <h3 className="text-sm font-medium shiny-text">{features[2].name}</h3>
//               <p className="mt-2 text-sm shiny-text">{features[2].description}</p>
//             </div>
//             <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
//               <img src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/get-more-value.jpg" alt="get more value illustration" className="tw-block tw-w-full"></img>
//               {/* <ProxyObservable /> */}
//             </div>
//           </div>
//           <div key={features[3].name} className="flex flex-col">
//           {/* <img src="https://media1.tenor.com/m/DUNRrAHuwzYAAAAd/toph-metalbending.gif" /> */}

//             <div className="mt-6">
//               <h3 className="text-sm font-medium shiny-text">{features[3].name}</h3>
//                   <p className="mt-2 text-sm shiny-text">{features[3].description}</p>
//             </div>
//             <div className="aspect-h-1 aspect-w-1 overflow-hidden rounded-lg bg-gray-100">
//               <LivekitNotebook />
  
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


// const GradientText = ({ children, gradient }) => {
//   return (
//     <span className={`text-transparent bg-clip-text ${gradient}`}>
//       {children}
//     </span>
//   );
// };

// const Dynabot = () => {
//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-center space-y-4">
//       {/* Main Title */}
//       <h1 className="text-6xl font-bold">
//         <GradientText gradient="bg-gradient-to-r from-purple-500 via-pink-500 to-red-500">
//           Dynabot.dev
//         </GradientText>
//       </h1>
      
//       {/* Subtitle */}
//       <h2 className="text-4xl">
//         <GradientText gradient="bg-gradient-to-r from-teal-400 via-green-400 to-blue-500">
//           Robotics for the rest of us
//         </GradientText>
//       </h2>

//       {/* Available Now */}
//       <p className="text-xl text-gray-200 mt-6">
//         Available Now
//       </p>
//     </div>
//   );
// };

// function ObservableFramework() {
//   return <>
//   <h1 className="text-4xl font-bold text-center mb-4 shiny-text">Observable Framework</h1>
// <div className="w-full h-screen">  
//   <iframe width="100%" height="100%" className="border border-gray-700" src="https://gpu.jerboa-kokanue.ts.net/" width="100%" height="100%"></iframe>
// </div>
// </>
// }

// function ShipFastForRobotics() {
//   return <div> 
//     <h1>Ship Fast for Robotics</h1>
//     <p>
      
//       Ship Fast for Robotics is a technique to ship fast for robotics.
//     </p>
//     <img src="https://www.apple.com/v/apple-intelligence/b/images/overview/apple_intelligence_screen_endframe__floolltiipym_large.jpg"/>
//   </div>
// }

// function LearnByExample () {
//   return <>
//             <div className="text-center text-4xl font-extrabold leading-tight text-pink-400 drop-shadow-[2px_2px_0px_rgba(var(--pink-800))] md:text-5xl">
//                 <h2 className="shiny-text">Learn by robotics example.</h2>
//             </div>
//             <div className="h-4"></div>
//             {/* <p className="text-center text-xl text-gray-800 dark:text-gray-400">
//                 Every Robotics, Science, Art, Math and AI project documented and made easy to use.
//             </p> */}

//             <p className="text-center text-xl text-gray-800 dark:text-gray-400">
//               English Language Explorable Explanation generation to make robotics easy to use.
//             </p>
//             {/* <div className="h-16"></div> */}
//             <div className="grid grid-cols-1 gap-[25px] sm:grid-cols-2 md:grid-cols-3 hidden">
//                 <a href="https://deusex.fandom.com/wiki/Matsu-Gravas_R-118_Repair_bot" className="block text-pink-800 visited:text-pink-900 dark:text-gray-400 dark:visited:text-gray-400 dark:hover:text-gray-300">
//                     <div className="group flex h-full w-full flex-col rounded-lg border-[2px] border-gray-200 bg-white px-5 py-[14px] hover:cursor-pointer hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
//                         {/* <p className="text-gray-500 ">Ecosystem</p> */}
//                         <p className="mb-4 text-lg font-semibold leading-tight dark:group-hover:text-gray-300">
//                             Do chores with robots
//                            {/* Robotic Construction and Repair with Robots */}
//                            {/* <img src="https://files.hashirama.blog/dist/repairbot.webp" /> */}
//                            {/* <img class="width-full" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcXKRfvR_tGVy8sOQed22rECT9cVBbEcBO2w&s" /> */}
//                            {/* <script type="module" src="https://unpkg.com/@splinetool/viewer@1.9.37/build/spline-viewer.js"></script>
//                            <spline-viewer url="https://prod.spline.design/283G61KZu01s6BtK/scene.splinecode"></spline-viewer> */}
//                         </p>
//                         <div className="flex-1"></div>
//                         <div className="mt-4 text-gray-500 ">
//                             View guide
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="mb-[3px] ml-[1px] inline h-[18px] w-[18px] text-gray-500">
//                                 <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path>
//                             </svg>
//                         </div>
//                     </div>
//                 </a>
//                 <a href="https://deusex.fandom.com/wiki/Matsu-Gravas_GV-4_Nightingale_medical_bot" className="block text-pink-800 visited:text-pink-900 dark:text-gray-400 dark:visited:text-gray-400 dark:hover:text-gray-300">
//                     <div className="group flex h-full w-full flex-col rounded-lg border-[2px] border-gray-200 bg-white px-5 py-[14px] hover:cursor-pointer hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
//                         {/* <p className="text-gray-500 ">Runtime</p> */}
//                         <p className="mb-4 text-lg font-semibold leading-tight dark:group-hover:text-gray-300">
//                             Build Dynamicland 
//                                     {/* Robotic First Aid and Surgery Simulation
//                                     <img src="https://files.hashirama.blog/dist/MedicalBot.webp" /> */}
// <iframe width="100%" height="315" src="https://www.youtube.com/embed/-80VsIdAHZw?si=M5eWVwobrRor4Ga3" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
//                         </p>
//                         <div className="flex-1"></div>
//                         <div className="mt-4 text-gray-500 ">
//                             View guide
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="mb-[3px] ml-[1px] inline h-[18px] w-[18px] text-gray-500">
//                                 <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path>
//                             </svg>
//                         </div>
//                     </div>
//                 </a>
//                 <a href="/guides/streams/to-string" className="block text-pink-800 visited:text-pink-900 dark:text-gray-400 dark:visited:text-gray-400 dark:hover:text-gray-300">
//                     <div className="group flex h-full w-full flex-col rounded-lg border-[2px] border-gray-200 bg-white px-5 py-[14px] hover:cursor-pointer hover:border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:hover:border-gray-600">
//                         <p className="text-gray-500 ">RoombaCat</p>
//                         <p className="mb-4 text-lg font-semibold leading-tight dark:group-hover:text-gray-300">
//                         Feeding Cat Robot
//                         </p>
//                         {/* <img src="https://files.hashirama.blog/dist/roombacat.png" /> */}
//                         <video autoPlay  width="400px" loop muted src="https://files.hashirama.blog/dist/2.mp4" />


//                         <div className="flex-1"></div>
//                         <div className="mt-4 text-gray-500 ">
//                             View guide
//                             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" data-slot="icon" className="mb-[3px] ml-[1px] inline h-[18px] w-[18px] text-gray-500">
//                                 <path fill-rule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clip-rule="evenodd"></path>
//                             </svg>
//                         </div>
//                     </div>
//                 </a>
//             </div>
//             </>
// }



// function RoboticsOdyssey() {
//   return (
//     <div className="dark">
//       <div className="text-gray-950 antialiased bg-slate-900">
//         <div className="overflow-hidden items-center min-h-screen">
//           <main className="flex flex-col items-center px-8">
//           <LearnByExample />
//             {/* <Avatar_Notebook /> */}
//             {/* <TimeSkipFunnel /> */}

//             {/* <Titles /> */}
//             {/* <Living_robotics /> */}
//             <CatGrid />  
//             {/* <What_is_roomba_cat />  */}
//             {/* <Readme_renderer />  */}

//             <FourFrameWidget />

//             {/* <Observable /> */}
//             {/* <Sisterschools />  */}


//             {/* <iframe width="800" height="450" src="https://embed.figma.com/slides/SItzVntC7fNMSUoYIRzxYx/Untitled?node-id=20-12&embed-host=share" allowfullscreen></iframe> */}
  
//             {/* <Support_Students />  5 */}
//             {/* <Guest_instructor />  6 */}
//             {/* <DinoCustomizer />   */}
//             {/* <PowerPoint />           */}
//             {/* <GapFinding /> */}

//             {/* <LlamaGrid /> */}

//             {/* <Constructionism />  */}
//         <ObservableFramework />
//                 {/* <iframe className="border border-gray-700" src="/lessons" width="900" height="500"></iframe> */}
//                 {/* <Pricing />   */}
//                 {/* <Goals /> */}

// {/* <Readme_renderer /> */}
//             <Footer />  
// {/* if you use the powers you have been designed with - you can be as good at thinking as xero parc and dynmaicland */}
//             {/* <BillOfMaterials /> */}
//           </main>
//         </div>
//       </div>
//     </div>
//   );
// }

// function TImeSkip () {
//   return <div>
//     <h1>Time Skip</h1>
//     <p>
//       Time Skip is a technique to skip time by using the powers you have been designed with.
//     </p>
//   </div>
// }

// function Goals() {
//   // https://www.quora.com/profile/Alan-Kay-11/answers
//   return <div className="py-12 px-6">
//     <h1 className="text-4xl font-bold text-center mb-10 bg-gradient-to-r from-teal-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-pulse">
//       Our Goals
//     </h1>

//     <div className="space-y-6 max-w-3xl mx-auto">
//       <div className="transform hover:scale-105 transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-teal-300 hover:text-teal-200 p-4 rounded-lg border border-teal-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-teal-500/20">
//           1. Build Dynamicland + Arcology
//         </h2>
//       </div>

//       <div className="transform hover:scale-105 transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-blue-300 hover:text-blue-200 p-4 rounded-lg border border-blue-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-blue-500/20">
//           2. Implement UBI with HARC
//         </h2>
//       </div>

//       <div className="transform hover:scale-105 transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-purple-300 hover:text-purple-200 p-4 rounded-lg border border-purple-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-purple-500/20">
//           3. Blur the Line Between Maker & Audience
//         </h2>
//       </div>

//       <div className="transform hover:scale-105 transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-pink-300 hover:text-pink-200 p-4 rounded-lg border border-pink-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-pink-500/20">
//           4. Make Robotics Education as Fun as Video Games
//         </h2>
//       </div>

//       <div className="transform hover:scale-105 transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-amber-300 hover:text-amber-200 p-4 rounded-lg border border-amber-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-amber-500/20">
//           5. Create Problem-Solving Robots with 40,000 Student Co-Designers
//         </h2>
//       </div>

//       <div className="transform hover:scale-105 transition-all duration-300">
//         {/* <h2 className="text-2xl font-semibold text-emerald-300 hover:text-emerald-200 p-4 rounded-lg border border-emerald-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-emerald-500/20">
//           6. Eliminate Craving, Aversion from the Human Condition
//         </h2> */}
//       </div>
//       {/* <div className="transform hover:scale-105 transition-all duration-300">
//         <h2 className="text-2xl font-semibold text-emerald-300 hover:text-emerald-200 p-4 rounded-lg border border-emerald-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-emerald-500/20">
//           6. Eliminate Aversion from the Human Condition
//         </h2>
//       </div> */}
//       <div className="transform hover:scale-105 transition-all duration-300">
//         {/* <h2 className="text-2xl font-semibold text-emerald-300 hover:text-emerald-200 p-4 rounded-lg border border-emerald-500/20 bg-gradient-to-r from-slate-800 to-slate-900 shadow-lg hover:shadow-emerald-500/20">
//           6. Eliminate Craving, Aversion from the Human Condition
//         </h2> */}
//       </div>
//     </div>
// {/* https://worrydream.com/Home2011/#!/Bio2011 */}
// {/* https://www.youtube.com/results?search_query=bret+victor */}
//     {/* <Stats /> */}
//   </div>
// }

// function Stats() {
//   const stats = [
//     { id: 1, name: 'Transactions every 24 hours', value: '44 million' },
//     { id: 2, name: 'Assets under holding', value: '$119 trillion' },
//     { id: 3, name: 'New users annually', value: '46,000' },
//   ]
  
//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3">
//           {stats.map((stat) => (
//             <div key={stat.id} className="mx-auto flex max-w-xs flex-col gap-y-4">
//               <dt className="text-base/7 text-gray-600">{stat.name}</dt>
//               <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
//                 {stat.value}
//               </dd>
//             </div>
//           ))}
//         </dl>
//       </div>
//     </div>
//   )
// }

// function GapFinding() {
//   return (
//     <div className="max-w-3xl mx-auto bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl shadow-lg p-8 mt-8">
//       <h1 className="text-3xl font-bold text-white mb-4 border-b-2 border-white pb-2">
//         Gap Finding Preview
//       </h1>
//       <p className="text-lg text-white mb-4">
//         <span className="font-semibold">ETA:</span> <span className="italic">Dec 1, 2024</span>
//       </p>
//       <p className="text-white mb-4">
//         Gap Finding is an econometrics technique designed to bridge research papers with companies seeking consultants to plan, implement, and test AGILE spikes on innovative projects.
//       </p>
//       <p className="text-sm text-white italic">
//         <span className="font-semibold">Citation:</span> Andy Gavin.
//       </p>
//     </div>
//   );
// }


// function Iframe_preview() {
//   return <div>
//     <h1>Iframe Preview</h1>
//     <iframe width="100%" height="735" frameborder="0"
//   src="https://observablehq.com/embed/@roboticsuniversity/prediction?cells=xerox&banner=false"></iframe>
//   </div>
// }





// export default RoboticsOdyssey;



// function clickButtonTomakeButton() {
//   console.log("clicked")
// }