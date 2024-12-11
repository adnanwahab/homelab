// // import {Runtime, Inspector} from "@observablehq/runtime";
// // import notebook from "@roboticsuniversity/rtings-for-robots@17";import { useEffect, useRef } from 'react';
// import Footer from "@/components/footer";
// import HardwareConfigurator from "@/components/hardware_configurator";
// import Livekit_Desktop_Viewer from "@/components/Livekit_Desktop_Viewer";
// //import Rtings from "@/components/rtings";
// import Livekit_Callibration from "@/components/Livekit_Callibration";


// export const MainComponent = function () {
//   return     <div className="min-h-screen bg-gray-950 text-white">
//   {/* Hero Section */}
//   <div className="container mx-auto px-4 py-16">
//   <Livekit_Desktop_Viewer />
//     <h1 className="text-center text-4xl md:text-6xl font-bold text-gray-300 mb-4">
//      Self Driving Robot for $141
//     </h1>

//     {/* <h2 className="text-center text-3xl md:text-5xl font-bold mb-12">
//       The fastest way to get a robot you want
//     </h2> */}

//     {/* Features List */}
//     <div className="max-w-2xl mx-auto mb-8">
//       {/* <ul className="space-y-4 text-gray-300">
//         <li>• $141 cost for reagents</li>
//         <li>• Run on the latest AI models (VLMs, VLAs...)</li>
//         <li>• Can be taught new skills in less than 30mn</li>
//         <li>• Can be guided entirely with a prompt written in natural language</li>
//       </ul> */}
//       <p className="text-gray-400 mt-6">
//         Every skill learned by one robot is shared with all the others
//       </p>
//     </div>

//     <div className="text-center">
//       <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
//         Adopt a robot
//       </button>

//       <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">
//         Add Nanosaur Parts to amazon cart
//       </button>
//     </div>

//    {/* Examples Section */}
//    <div className="">
//       <h2 className="text-center text-3xl md:text-5xl font-bold mb-16">
//         In less than 30mn of teaching...
//       </h2>
      
//       <div className="grid md:grid-cols-2 gap-8">
//         <div className="p-6 bg-gray-900 rounded-lg">
//           <h3 className="text-2xl font-bold mb-4">Serve glasses to humans</h3>
//           <iframe width="560" height="315" src="https://www.youtube.com/embed/gc7Db8bylV4?si=jjEBE1LnV9yw3yh1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
//         </div>
//         <div className="p-6 bg-gray-900 rounded-lg">
//           <h3 className="text-2xl font-bold mb-4">Secure the house</h3>
//           <iframe width="560" height="315" src="https://www.youtube.com/embed/gc7Db8bylV4?si=jjEBE1LnV9yw3yh1" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"  ></iframe>
//         </div>
//       </div>
//     </div>

//     {/* Maurice Section */}
//     <div className="mt-32">
//       <h2 className="text-center text-4xl md:text-6xl font-bold mb-16">
//         Meet  Dynabot - Your first AI robot
//       </h2>
      
//       <div className="grid md:grid-cols-2 gap-12 items-center">
//         <div className="p-6">
//           <img 
//             src="https://nanosaur.ai/assets/images/nanosaur-wireframe-bw.png" 
//             alt="Robot Diagram" 
//             className="w-full spin" 
//           />
//         </div>
//         <div className="p-6">
//           <h3 className="text-2xl font-bold mb-6">
//             Our first embodiement - <span className="italic">limited production</span>
//           </h3>
//           <ul className="space-y-4 text-gray-300">
//             <li>• 20cm tall, 5DoF trainable arm</li>
//             <li>• Pre-trained for: Pick up trash, serve a shot glass, greet and guide  humans</li>
//             <li>• App and SDK control</li>
//             <li>• $100 with a $40 deposit</li>
//             <li>• innate.bot = enthusiast consumer robot</li>
//             <li>• hello-robot.com = smb/consumer</li>
//             <li>• kuka.com = industrial automation robot</li>
//             <li>• 50 million cat owners</li>
//             <li>• $141 with info-course free!</li>
//           </ul>
//         </div>
//       </div>
//     </div>

//     {/* CTA Section */}
//     <div className="mt-32 text-center">
//       <h2 className="text-4xl md:text-6xl font-bold mb-8">
//         The future is already here
//       </h2>
//       <p className="text-xl mb-12">
//         We are shipping for builders and enthusiasts in Silicon Valley
//       </p>
//       </div>
//   </div>
//   {/* <MarketRtings /> */}
//   <HardwareConfigurator />
//   <AmazonButton />
//   {/* <RobotFriends /> */}
// </div>
// }
// export default OnlyLivekit 

// function OnlyLivekit() {
//   return <>only livekit
  
//   <Livekit_Callibration />
//   </>
// }


// // export default function Robot() {
// //   return (
// //     <>
// //       <MainComponent />
// //       <Footer></Footer>
// //     </>
// //   );
// // }

// function AmazonButton() {   
//   return <>
//   <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-medium">  
//     Add all to cart
//   </button>
//   </>

// }

// function MarketRtings() {
// //return 'rtings'
// return <iframe width="100%" height="500" 
// className="bg-blue-100"
// src="https://observablehq.com/embed/@roboticsuniversity/rtings-for-robots@17?cell=*&banner=false"></iframe>
//   // return <RtingsForRobots />
// }

// function RobotFriends() {
//   const companies = {
//     'hello-robot': 'https://files.hashirama.blog/public/public/hello-robot.png',
//     'innae': 'https://innate.bot/'
//   }

//   return <div>  
//     {Object.keys(companies).map((company) => (
//       <a href={companies[company]}>
//         <h1 className="text-2xl font-bold text-green-100">{company}</h1>
//       </a>
//     ))}
//   </div>
//   }

// // function RtingsForRobots() {
// //   const ref = useRef();

// //   useEffect(() => {
// //     const runtime = new Runtime();
// //     runtime.module(notebook, Inspector.into(ref.current));
// //     return () => runtime.dispose();
// //   }, []);

// //   return (
// //     <>
// //       <div ref={ref} />
// //       <p>Credit: <a href="https://observablehq.com/@roboticsuniversity/rtings-for-robots@17">RTings for Robots by roboticsuniversity</a></p>
// //     </>
// //   );
// // }




export default function Robot() {
    return <div>Robots to improve and figure out how to make them
        <div>nanosaur.ai - </div>
        <iframe width="100%" height="500" 
  src="https://observablehq.com/embed/@roboticsuniversity/hardware?cell=*"></iframe>
    </div>;
}