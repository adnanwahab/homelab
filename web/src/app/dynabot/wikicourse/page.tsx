import exp from "constants";

export default function Page() {
  return <div>Hello World</div>;
}
// "use client";
// import { useState } from "react";
// import { Radio, RadioGroup } from "@headlessui/react";
// import Link from "next/link";
// import SisterSchools from "./sisterschools";
// import {
//   ClerkProvider,
//   SignInButton,
//   SignedIn,
//   SignedOut,
//   UserButton,
// } from "@clerk/nextjs";
// interface CourseHeroProps {
//   title?: string;
//   subtitle?: string;
//   price?: string;
//   studentCount?: number;
//   author?: {
//     name: string;
//     avatar?: string;
//   };
//   trustpilotStars?: number;
// }

// const mockData = {
//   isFree: true,
// };

// //https://github.com/adnanwahab/homelab/blob/main/notebooks/readme.md
// //

// export function CourseHero({
//   title = "Become a Robotics Engineer",
//   subtitle = "Everything you need in one place:",
//   price = "$25",
//   studentCount = 12,
//   author = {
//     name: "Adnan Wahab",
//     avatar: "/friends.jpg",
//   },
//   trustpilotStars = 5,
// }: CourseHeroProps) {
//   return (
//     <div className="flex min-h-screen bg-slate-950">
//       <SignInButton />
//       {/* Left Column */}
//       <div className="flex-1 p-12 flex flex-col justify-center">
//         {/* Author */}
//         <div className="flex items-center gap-3 mb-8">
//           {/* {author.avatar && (
//             <img
//               src={author.avatar}
//               alt={author.name}
//               className="w-12 h-12 rounded-full"
//             />
//           )}
//           <span className="text-gray-300">by {author.name}</span> */}
//         </div>

//         {/* Title */}
//         <h1 className="text-6xl font-bold text-white mb-6">{title}</h1>

//         {/* Subtitle */}
//         <div className="mb-8">
//           <p className="text-xl text-gray-300">{subtitle}</p>
//           <p className="text-xl text-gray-300">
//             <span className="font-bold">93 hours of video</span> to go from{" "}
//             <span className="font-bold">absolute beginner</span> to{" "}
//             <span className="font-bold">advanced Robotics Engineer</span>
//           </p>
//         </div>

//         {/* Stats */}
//         <div className="flex items-center gap-4 mb-8">
//           <div className="flex items-center gap-2">
//             <span className="text-purple-300">🎓</span>
//             <span className="text-gray-300">
//               {studentCount.toLocaleString()} Students
//             </span>
//           </div>
//           <div className="flex items-center gap-1">
//             {"★".repeat(trustpilotStars)}
//             <span className="text-gray-300 ml-1">on Trustpilot</span>
//           </div>
//         </div>

//         {/* Price Card */}
//         <div className="flex items-center gap-4 bg-purple-900/50 p-4 rounded-xl w-fit">
//           <div className="w-24 h-16 bg-gray-800 rounded overflow-hidden">
//             <img
//               src="/static-dynamicland.gif"
//               alt="Course preview"
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <div className="text-3xl font-bold text-purple-300">
//             {price}
//             <div className="text-sm font-normal text-gray-400">
//               Access for life, VAT incl.
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Right Column - 3D Scene */}
//       <div className="flex-1 relative">
//         <div className="absolute inset-0 flex items-center justify-center">
//           <div className="w-[80%] aspect-square relative">
//             <img
//               src="/static-dynamicland.gif"
//               alt="3D Scene"
//               className="w-full h-full object-cover rounded-xl"
//             />

//             {/* Navigation Dots */}
//             <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
//               <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
//                 ←
//               </button>
//               <button className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm">
//                 •
//               </button>
//               <button className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
//                 →
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// import Footer from "@/components/footer";
// import Constructionism from "./Constructionism";
// import { CheckIcon } from "@heroicons/react/20/solid";
// import { Container } from "@/components/container";
// import { SeeingSpace } from "@/components/seeingspace";

// // https://tevisthompson.com/saving-zelda/

// function RoboticsTimeline() {
//   const timelineItems = [
//     {
//       period: "Past",
//       image:
//         "https://i.pinimg.com/originals/b3/9e/e4/b39ee473da74ac009dfb6e56afcb9c22.gif", // Replace with actual Mario-style image
//       alt: "Retro platformer game screenshot",
//     },
//     {
//       period: "Present",
//       image:
//         "https://www.nintendo.com/eu/media/images/08_content_images/country_support_2/uk_6/CapturedLavaBubble_01.gif", // Replace with actual 3D robot image
//       alt: "3D robot on green platform",
//     },
//     {
//       period: "Future",
//       image:
//         "https://www.minecraft.net/content/dam/minecraftnet/games/minecraft/screenshots/bedrock_header.jpg", // Replace with actual futuristic city image
//       alt: "Futuristic city with gradient colors",
//     },
//   ];

//   const features = [
//     {
//       icon: "🐱", // You can replace with proper icon component
//       title: "Pet Care",
//       description: "Feed stray cat and dogs",
//     },
//     {
//       icon: "🧺", // You can replace with proper icon component
//       title: "Automate Chores",
//       description: "Fold laundry + load dishes",
//     },
//     {
//       icon: "🌱", // You can replace with proper icon component
//       title: "Infinite Creation",
//       description: "Gardening, painting, etc.",
//     },
//   ];

//   return (
//     <div className="bg-gray-900 text-white p-8">
//       {/* Timeline Section */}
//       <div className="grid grid-cols-3 gap-4 mb-12">
//         {timelineItems.map((item, index) => (
//           <div key={index} className="relative">
//             <div className="text-sm text-cyan-400 mb-2">{item.period}</div>
//             <div className="rounded-lg overflow-hidden">
//               <img
//                 src={item.image}
//                 alt={item.alt}
//                 className="w-full h-48 object-cover"
//               />
//             </div>
//           </div>
//         ))}
//         {/* <img className="w-48" src="https://github.com/matthiasn/talk-transcripts/raw/master/Kay_Alan/NonIncrementalFuture/00.34.18.jpg" />
//                         <img className="w-48" src="https://github.com/matthiasn/talk-transcripts/raw/master/Kay_Alan/NonIncrementalFuture/00.34.18.jpg" /> */}
//       </div>
//     </div>
//   );
// }

// function AlanHow() {
//   return (
//     <div>
//       Alan How
//       <iframe
//         width="100%"
//         height="968"
//         frameBorder="0"
//         src="https://observablehq.com/embed/@roboticsuniversity/alan_how@262?cells=pdfViewer"
//       ></iframe>
//     </div>
//   );
// }

// function Dynamicland() {
//   return (
//     <div>
//       Dynamicland
//       <SeeingSpace />
//     </div>
//   );
// }

// function FeatureSection() {
//   return (
//     <div className="overflow-hidden">
//       <Container className="pb-24">
//         {/* <Heading as="h2" className="max-w-3xl">
//           Build robots users love - perception prediction simulation realworld
//         </Heading> */}
//         <Observable_understanding_of_ai />
//         {/* <Screenshot
//           width={1216}
//           height={768}
//           src="/screenshots/app.png"
//           className="mt-16 h-[36rem] sm:h-auto sm:w-[76rem]"
//         /> */}
//       </Container>
//     </div>
//   );
// }

// const Observable_understanding_of_ai = () => {
//   const frames = [
//     {
//       title: "Perception",
//       description: "Computer Vision, Audio Recognition, and more.",
//       // imgSrc: 'https://files.hashirama.blog/blog/zed_sensor.gif', // Replace with the actual path to your images
//       videoSrc: "/_z/perception.mp4",
//     },

//     {
//       title: "Prediction",
//       description: "Behavior Modeling, Motion Planning, and reasoning.",
//       imgSrc: "",
//       videoSrc: "/_z/prediction.mp4",
//     },
//     {
//       title: "Simulation",
//       description:
//         "Saftey, preventing Edge cases, synthetic data generation and fun video game interfaces for reinforcement learning and control.",
//       imgSrc: "",
//       videoSrc: "/_z/planning.mp4",
//     },
//     {
//       title:
//         "Real World Applications w/ dynamicland & dynamical-systems-theory",
//       description:
//         "Build a $141 robot that can feed Your Cat,  clean your room, garden your plants, and build Dynamicland + Arcology.",
//       imgSrc: "",
//       videoSrc: "/_z/map.mp4",
//     },
//   ];

//   return (
//     <div className="bg-gray-900 py-12">
//       <div className=" px-6 lg:px-8">
//         {frames.map((frame, index) => (
//           <div key={index} className="mb-16 last:mb-0">
//             <div className="flex flex-col md:flex-row items-center gap-8">
//               <div className="flex-1 max-w-xl">
//                 <h2 className="text-4xl font-semibold text-blue-300 mb-4">
//                   {frame.title}
//                 </h2>
//                 <p className="text-xl text-gray-300">{frame.description}</p>
//               </div>
//               <div className="flex-1 flex justify-center">
//                 {frame.videoSrc && (
//                   <video
//                     loop
//                     muted
//                     autoPlay
//                     playsInline
//                     src={frame.videoSrc}
//                     className="w-full max-w-lg rounded-lg border border-gray-700 shadow-xl"
//                   />
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// const _ = "https://roboticsuniversity.observablehq.cloud/roomba-cat-academy/";

// const includedFeatures = [
//   "Lifetime GPU Access + Career & Research Support",
//   "Daily Content Updates of New Robotics Research",
//   "Discounts on Hardware & Software",
// ];

// function Example() {
//   return (
//     <div className="bg-gray-900 py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-4xl sm:text-center">
//           <h2 className="text-pretty text-5xl font-semibold tracking-tight text-gray-100 sm:text-balance sm:text-6xl">
//             Simple no-tricks pricing
//           </h2>
//           <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg font-medium text-gray-300 sm:text-xl/8">
//             All material 100% free, open source and only pay for lifetime gpu
//             access.
//           </p>
//         </div>
//         <div className="mx-auto mt-16 max-w-2xl rounded-3xl ring-1 ring-gray-700 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none">
//           <div className="p-8 sm:p-10 lg:flex-auto">
//             <h3 className="text-3xl font-semibold tracking-tight text-gray-100">
//               Lifetime membership
//             </h3>
//             <p className="mt-6 text-base/7 text-gray-300"></p>
//             <div className="mt-10 flex items-center gap-x-4">
//               <h4 className="flex-none text-sm/6 font-semibold text-indigo-400">
//                 Whats included
//               </h4>
//               <div className="h-px flex-auto bg-gray-700" />
//             </div>
//             <ul
//               role="list"
//               className="mt-8 grid grid-cols-1 gap-4 text-sm/6 text-gray-300 sm:grid-cols-2 sm:gap-6"
//             >
//               {includedFeatures.map((feature) => (
//                 <li key={feature} className="flex gap-x-3">
//                   <CheckIcon
//                     aria-hidden="true"
//                     className="h-6 w-5 flex-none text-indigo-400"
//                   />
//                   {feature}
//                 </li>
//               ))}
//             </ul>
//           </div>
//           <div className="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-md lg:flex-shrink-0">
//             <div className="rounded-2xl bg-gray-800 py-10 text-center ring-1 ring-inset ring-gray-700 lg:flex lg:flex-col lg:justify-center lg:py-16">
//               <div className="mx-auto max-w-xs px-8">
//                 <p className="text-base font-semibold text-gray-300">
//                   Pay once, own it forever
//                 </p>
//                 <p className="mt-6 flex items-baseline justify-center gap-x-2">
//                   <span className="text-5xl font-semibold tracking-tight text-gray-100">
//                     $25
//                   </span>
//                   <span className="text-sm/6 font-semibold tracking-wide text-gray-400">
//                     USD
//                   </span>
//                 </p>
//                 {/* <a
//                   id="login-or-signup-button2"
//                   href="https://llama-tools.com/signup-odyssey"
//                   className="mt-10 mb-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
//                 >
//                   Get access
//                 </a> */}

//                 <SignInButton />

//                 {/* <stripe-buy-button
//   buy-button-id="buy_btn_1QHbhYId2dkGhN5mxxd48zrS"
//   publishable-key="pk_live_51QB42BId2dkGhN5m5qnmBDA9s6EklBon8LsfGudaVN7hsE96LE58bUTWxuMUxS8FHlr5OevT26LqziNcCtXzVXKH00Ywx5nkl7"
// >
// </stripe-buy-button> */}
//                 <a
//                   href="https://roboticsuniversity.observablehq.cloud/roomba-cat-academy"
//                   className="mt-1"
//                 >
//                   {/* <button

//           className={`flex-1 py-3 rounded-lg ${true ? 'bg-purple-500 text-white' : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}

//         >
//           Preview Free Course Content
//         </button> */}
//                   {/* </a> */}
//                 </a>
//                 {/* <p className="mt-6 text-xs/5 text-gray-300">
//                   We not charging till Dec 1 - have fun
//                 </p> */}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
// // https://mail.google.com/mail/u/1/#sent/KtbxLwHHmVLxgPZbsZqHxfhsVtkSzFmBML

// function Course() {
//   return (
//     <div className="min-h-screen bg-gray-900 text-white">
//       <div className="px-4 sm:px-6 lg:px-8 py-12">
//         {/* <h1 className="text-4xl font-bold mb-8">Course</h1> */}
//         <SisterSchools />

//         <CourseHero />

//         {/* Observable iframe with proper spacing */}
//         <div className="mb-16">
//           <iframe
//             width="100%"
//             height="750"
//             src="https://roboticsuniversity.observablehq.cloud/dynamicbotnotebook/"
//             className="rounded-lg"
//           />
//           {/* <iframe
//             width="100%"
//             height="750"
//             src="http://localhost:3001"
//             className="rounded-lg"
//         /> */}
//         </div>

//         <RoboticsTimeline />

//         <FeatureSection />
//         {/* <AlanHow /> */}

//         {/* Course description section */}
//         <div className="my-16 prose prose-invert max-w-none">
//           <p className="text-xl">
//             Robotics Odyssey Nov 1 - 5000 research papers converted to video
//             games
//             <br />
//             Become a Al+Robotics engineer for $25
//             <br />
//             Earn up to $50 by contribution to course and I will personally file
//             patents for significant contributions.
//           </p>

//           <h2 className="text-2xl font-bold mt-8 mb-4">Fun Lessons</h2>
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             <div className="p-6 rounded-lg bg-gray-800">Robot Bartender</div>
//             <div className="p-6 rounded-lg bg-gray-800">Robot Policeman</div>
//             <div className="p-6 rounded-lg bg-gray-800">
//               Feed Your Pets with Robot
//             </div>
//           </div>
//         </div>

//         {/* Project showcase grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 my-16">
//           {/* ... existing project cards ... */}
//         </div>

//         <Constructionism />

//         {/* Future vision section */}
//         <div className="my-16 p-8 bg-gray-800 rounded-lg">
//           <p className="text-xl text-cyan-300">
//             Coming 2025 - English Language code and diagram generation will get
//             good enough that 100% of people can contribute...
//           </p>
//         </div>

//         {/* <Robot_Pricing /> */}

//         {/* <Footer /> */}
//       </div>
//     </div>
//   );
// }

// export default Course;

// function ___() {
//   return (
//     <div className="block">
//       <div className="relative">
//         <div className="absolute top-0 h-full w-full">
//           <div
//             className="w-100 center container-grid container"
//             style={{
//               maxWidth: "var(--max-width-page)",
//               height: "100%",
//               paddingTop: "0px",
//               paddingBottom: "0px",
//             }}
//           >
//             <div
//               className="sticky col-[7_/_span_6] flex flex-col justify-center"
//               style={{ height: "100vh", top: "0px" }}
//             >
//               <div className="relative" style={{ aspectRatio: 1 / 1 }}>
//                 <div className="absolute top-0 w-full">
//                   <div
//                     className="relative"
//                     style={{
//                       aspectRatio: 1 / 1,
//                       perspective: "1200px",
//                       opacity: 0,
//                       zIndex: 0,
//                       transition: "opacity 0.3s",
//                     }}
//                   >
//                     <div
//                       className="border-light-gray absolute bottom-[5%] left-0 w-[90%] transform-gpu rounded border border-solid"
//                       style={{
//                         transform: "rotateY(var(--transform-deg-0))",
//                         boxShadow:
//                           "rgba(39, 39, 39, 0.3) 0px 4px 30px 0px, rgba(39, 39, 39, 0.16) 0px 1px 16px 0px",
//                       }}
//                     >
//                       <img
//                         src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/dashboard.png"
//                         alt="build dashboards illustration dashboard"
//                         className="block w-48"
//                       />
//                     </div>
//                     <div
//                       className="border-light-gray absolute right-0 top-[5%] w-[50%] transform-gpu rounded border border-solid"
//                       style={{
//                         transform:
//                           "rotateY(var(--transform-deg-0)) translateZ(5px)",
//                         boxShadow:
//                           "rgba(39, 39, 39, 0.3) 0px 4px 30px 0px, rgba(39, 39, 39, 0.16) 0px 1px 16px 0px",
//                       }}
//                     >
//                       <img
//                         src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/views.png"
//                         alt="build dashboards illustration views"
//                         className="block w-48"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 w-full">
//                   <div
//                     className="relative"
//                     style={{
//                       aspectRatio: 1 / 1,
//                       perspective: "1200px",
//                       opacity: 1,
//                       zIndex: 1,
//                       transition: "opacity 0.3s",
//                     }}
//                   >
//                     <div
//                       className="border-light-gray absolute left-0 top-[5%] w-[95%] transform-gpu rounded border border-solid"
//                       style={{
//                         transform: "rotateY(var(--transform-deg-1))",
//                         boxShadow:
//                           "rgba(39, 39, 39, 0.3) 0px 4px 30px 0px, rgba(39, 39, 39, 0.16) 0px 1px 16px 0px",
//                       }}
//                     >
//                       <img
//                         src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/get-more-value.jpg"
//                         alt="get more value illustration"
//                         className="block w-48"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 w-full">
//                   <div
//                     className="relative"
//                     style={{
//                       aspectRatio: 1 / 1,
//                       perspective: "120px",
//                       opacity: 0,
//                       zIndex: 0,
//                       transition: "opacity 0.3s",
//                     }}
//                   >
//                     <div
//                       className="border-light-gray absolute bottom-[11%] left-0 w-[90%] transform-gpu overflow-hidden rounded-lg border border-solid"
//                       style={{
//                         transform: "rotateY(var(--transform-deg-2))",
//                         boxShadow:
//                           "rgba(39, 39, 39, 0.3) 0px 4px 30px 0px, rgba(39, 39, 39, 0.16) 0px 1px 16px 0px",
//                       }}
//                     >
//                       <img
//                         src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/deploy-bg-unrounded.png"
//                         alt="a workflow developers already know and love illustration git push"
//                         className="block w-48"
//                       />
//                     </div>
//                     <div
//                       className="border-light-gray absolute right-0 top-[11%] w-[86%] transform-gpu overflow-hidden rounded-lg border border-solid"
//                       style={{
//                         transform:
//                           "rotateY(var(--transform-deg-2)) translateZ(5px)",
//                         boxShadow:
//                           "rgba(39, 39, 39, 0.3) 0px 4px 30px 0px, rgba(39, 39, 39, 0.16) 0px 1px 16px 0px",
//                       }}
//                     >
//                       <img
//                         src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/deploy-fg-unrounded.png"
//                         alt="a workflow developers already know and love illustration deploy status"
//                         className="block w-48"
//                       />
//                     </div>
//                   </div>
//                 </div>
//                 <div className="absolute top-0 w-full">
//                   <div
//                     className="relative"
//                     style={{
//                       aspectRatio: 1 / 1,
//                       perspective: "120px",
//                       opacity: 0,
//                       zIndex: 0,
//                       transition: "opacity 0.3s",
//                     }}
//                   >
//                     <div
//                       className="ov`erflow-hidden absolute left-0 top-[28%] z-10 w-[100%] transform-gpu cursor-pointer"
//                       style={{
//                         transform: "rotateY(var(--transform-deg-3))",
//                         boxShadow:
//                           "rgba(39, 39, 39, 0.3) 0px 4px 30px 0px, rgba(39, 39, 39, 0.16) 0px 1px 16px 0px",
//                       }}
//                     >
//                       <div className="group relative cursor-pointer">
//                         <button className="sr-only">Watch product tour</button>
//                         <video
//                           poster="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/demo-thumb.png"
//                           playsInline
//                           loop
//                           autoPlay
//                           className="block w-full cursor-pointer"
//                         >
//                           <source
//                             src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/demo-video-thumb-1440.webm"
//                             type="video/webm"
//                           />
//                           <source
//                             src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/demo-video-thumb-1440.mp4"
//                             type="video/mp4"
//                           />
//                         </video>
//                         <img
//                           src="https://static.observablehq.com/assets/marketing/components/home-scroll-cloud/demo-play.svg"
//                           alt="Observable product tour video play button"
//                           aria-hidden="true"
//                           className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-all group-hover:brightness-75"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         <div
//           className="bg-near-black text-near-white flex min-h-[var(--screenHeight,_100vh)] flex-col justify-center"
//           data-scroll-section="true"
//           data-section-idx="0"
//         >
//           <div
//             className="w-100 center container-grid container"
//             style={{ maxWidth: "var(--max-width-page)" }}
//           >
//             <div className="col-[1_/_span_5]">
//               <h2 className="heading-two balanced font-spline-mono font-medium">
//                 Build dashboards that users love
//               </h2>
//               <div className="body-content sans-serif text-sm md:text-xl">
//                 Exceed stakeholder and customer expectations by delivering
//                 bespoke, interactive data apps and instantly loading dashboards.
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           className="bg-near-black text-near-white flex min-h-[var(--screenHeight,_100vh)] flex-col justify-center"
//           data-scroll-section="true"
//           data-section-idx="1"
//         >
//           <div
//             className="w-100 center container-grid container"
//             style={{ maxWidth: "var(--max-width-page)" }}
//           >
//             <div className="col-[1_/_span_5]">
//               <h2 className="heading-two balanced font-spline-mono font-medium">
//                 Get more value from your data
//               </h2>
//               <div className="body-content sans-serif text-sm md:text-xl">
//                 Observable’s static site architecture allows you to display a
//                 massive amount of data so you can discover deeper insights.
//               </div>
//             </div>
//           </div>
//         </div>
//         <div
//           className="bg-near-black text-near-white flex min-h-[var(--screenHeight,_100vh)] flex-col justify-center"
//           data-scroll-section="true"
//           data-section-idx="2"
//         >
//           <div
//             className="w-100 center container-grid container"
//             style={{ maxWidth: "var(--max-width-page)" }}
//           >
//             <div className="col-[1_/_span_5]">
//               <h2 className="heading-two balanced font-spline-mono font-medium">
//                 A workflow developers already know and love
//               </h2>
//               <div className="body-content sans-serif text-sm md:text-xl">
//                 We speak your (programming) language — whatever it is. Bring
//                 CI/CD to your dashboards and data apps. Develop and test
//                 locally, then build and deploy automatically on Observable
//                 Cloud.
//               </div>
//               <a
//                 className="button-or-link naked sans-serif fw7 dib tc mt3 pointer align-left white-phosphate-theme mt-8"
//                 href="/platform"
//               >
//                 <span className="inner-wrap inline-flex">
//                   <span>View the Observable Platform</span>
//                   <span className="arrow-wrap inline-flex items-center">
//                     <svg
//                       width="16"
//                       height="16"
//                       viewBox="0 0 16 16"
//                       fill="none"
//                       stroke="currentColor"
//                       strokeWidth="1.6"
//                     >
//                       <path d="M8.5 11L11 8L8.5 5"></path>
//                       <line x1="4" y1="8" x2="11" y2="8"></line>
//                     </svg>
//                   </span>
//                 </span>
//               </a>
//             </div>
//           </div>
//         </div>
//         <div
//           className="bg-near-black text-near-white flex min-h-[var(--screenHeight,_100vh)] flex-col justify-center"
//           data-scroll-section="true"
//           data-section-idx="3"
//         >
//           <div
//             className="w-100 center container-grid container"
//             style={{ maxWidth: "var(--max-width-page)" }}
//           >
//             <div className="col-[1_/_span_5]">
//               <h2 className="heading-two balanced font-spline-mono font-medium">
//                 See Observable in action
//               </h2>
//               <div className="body-content sans-serif text-sm md:text-xl">
//                 Watch our 3-minute overview video to see how Observable’s
//                 end-to-end platform streamlines the process of building,
//                 deploying, and managing data apps.
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function ObsPreview() {
//   return (
//     // <img alt="" loading="lazy" decoding="async" data-nimg="fill" sizes="(min-width: 760px) 50vw, (min-width: 1000px) 33vw, 100vw" src="https://files.hashirama.blog/blog/floorplan.jpg" />
//     <iframe
//       width="100%"
//       height="684"
//       src="https://observablehq.com/embed/@roboticsuniversity/robot-map?cells=canvas"
//     ></iframe>
//     // <div>
//     //   <iframe src="https://roboticsuniversity.observablehq.cloud/dynamicbotnotebook" width="100%" height="730"></iframe>
//     // </div>
//   );
// }

// const frequencies = [
//   { value: "monthly", label: "Monthly", priceSuffix: "" },
//   { value: "annually", label: "Annually", priceSuffix: "/year" },
// ];
// const tiers = [
//   {
//     name: "Course only",
//     id: "tier-ai-only",
//     href: "#",
//     price: { monthly: "$19", annually: "$199" },
//     description: "Bring your own Robot",
//     features: [
//       "64 Machine Learning Demos",
//       "20 Free AI Tools",
//       "90 hours of video demonstrations",
//     ],
//     mostPopular: false,
//   },
//   {
//     name: "Nanosaur",
//     id: "tier-nanosaur",
//     href: "#",
//     price: { monthly: "$141", annually: "$299" },
//     description: "Nvidia Jetson Nano with 64GB SSD",
//     features: ["Robust Robotics Fool-Proof Infrastructure"],
//     mostPopular: false,
//   },
//   {
//     name: "Nanosaur+Arm",
//     id: "tier-startup",
//     href: "#",
//     price: { monthly: "$400", annually: "$599" },
//     description: "A plan that scales with your rapidly growing business.",
//     features: [
//       "25 products",
//       "Up to 10,000 subscribers",
//       "Advanced analytics",
//       "24-hour support response time",
//       "Marketing automations",
//     ],
//     mostPopular: false,
//   },
//   {
//     name: "Maurice",
//     id: "tier-enterprise",
//     href: "#",
//     price: { monthly: "$3000", annually: "$999" },
//     description: "builders and enthusiasts",
//     features: ["Pick up trash", "serve a shot glass", "greet and guide humans"],
//     mostPopular: true,
//   },
// ];

// function classNames(...classes) {
//   return classes.filter(Boolean).join(" ");
// }

// function Robot_Pricing() {
//   const [frequency, setFrequency] = useState(frequencies[0]);

//   return (
//     <div className="bg-white py-24 sm:py-32">
//       <div className="mx-auto max-w-7xl px-6 lg:px-8">
//         <div className="mx-auto max-w-4xl text-center">
//           <h2 className="text-base/7 font-semibold text-indigo-600">Pricing</h2>
//           <p className="mt-2 text-balance text-5xl font-semibold tracking-tight text-gray-900 sm:text-6xl">
//             Gift The perfect Educational Robot
//           </p>
//         </div>
//         <p className="mx-auto mt-6 max-w-2xl text-pretty text-center text-lg font-medium text-gray-600 sm:text-xl/8">
//           Make Advanced Science, Mathematics, Machine Learning, AI fun and easy
//           to learn by teaching your robotic pet to feed your other pets and baby
//           sit your brothers and sisters.
//         </p>
//         <div className="mt-16 flex justify-center">
//           <fieldset aria-label="Payment frequency"></fieldset>
//         </div>
//         <div className="isolate mx-auto mt-10 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl xl:mx-0 xl:max-w-none xl:grid-cols-4">
//           {tiers.map((tier, index) => (
//             <div
//               key={tier.id}
//               className={classNames(
//                 tier.mostPopular
//                   ? "ring-2 ring-indigo-600"
//                   : "ring-1 ring-gray-200",
//                 "rounded-3xl p-8",
//               )}
//             >
//               <h3
//                 id={tier.id}
//                 className={classNames(
//                   tier.mostPopular ? "text-indigo-600" : "text-gray-900",
//                   "text-lg/8 font-semibold",
//                 )}
//               >
//                 {tier.name}
//               </h3>
//               <p className="mt-4 text-sm/6 text-gray-600">{tier.description}</p>
//               <p className="mt-6 flex items-baseline gap-x-1">
//                 <span className="text-4xl font-semibold tracking-tight text-gray-900">
//                   {tier.price[frequency.value]}
//                 </span>
//                 <span className="text-sm/6 font-semibold text-gray-600">
//                   {frequency.priceSuffix}
//                 </span>
//               </p>
//               <a
//                 href={tier.href}
//                 aria-describedby={tier.id}
//                 className={classNames(
//                   tier.mostPopular
//                     ? "bg-indigo-600 text-white shadow-sm hover:bg-indigo-500"
//                     : "text-indigo-600 ring-1 ring-inset ring-indigo-200 hover:ring-indigo-300",
//                   "mt-6 block rounded-md px-3 py-2 text-center text-sm/6 font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600",
//                 )}
//               >
//                 {index === 0 ? "Buy Info Product" : "Buy Robot"}
//               </a>
//               <ul
//                 role="list"
//                 className="mt-8 space-y-3 text-sm/6 text-gray-600"
//               >
//                 {tier.features.map((feature) => (
//                   <li key={feature} className="flex gap-x-3">
//                     <CheckIcon
//                       aria-hidden="true"
//                       className="h-6 w-5 flex-none text-indigo-600"
//                     />
//                     {feature}
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// ///nanosaur with mods - 350
// //pre manufactured - amazon - 350

// //spend time and make nanosaur better + easier
// ///https://rigbetellabs.com/
