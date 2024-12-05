export default function () {
  return <>asdf</>
}

// function LLamaCell(props) {
//     const {src} = props
//     return  (<>
  
//     <iframe width="100%" height="500" frameborder="0" 
//           height="500" 
  
//     src={src}></iframe>
  
//     </>
//     )
//   }
  

// function LlamaGrid() {
//   const urls = [
//     "https://observablehq.com/embed/@roboticsuniversity/perception?cell=*&banner=false",
// "https://observablehq.com/embed/@roboticsuniversity/prediction?cell=*&banner=false",
//     "https://observablehq.com/embed/@roboticsuniversity/simulation?cell=*&banner=false",
//     "https://observablehq.com/embed/@roboticsuniversity/dynamical-systems-xerox-parc-dynamicland?cell=*&banner=false",
//   ];
  

//   return (
//     <div className="w-full px-4">
//       <div className="mx-auto px-0 lg:px-0">
//         <h1 className="text-2xl font-semibold text-teal-100 w-96 mx-auto">Syllabus Preview</h1>
//         <div className="mt-10 grid grid-cols-2 lg:grid-cols-6 grid-rows-2" style={{ width: 'calc(100% - 2px)' }}>
//           <div className="relative lg:col-span-2">
//             <div className="absolute inset-px rounded-lg bg-white lg:rounded-tl-[2rem]" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-tl-[2rem]">
//               <LLamaCell src={urls[0]} />
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tl-[2rem]" />
//           </div>
          
//           <div className="relative col-span-2">
//             <div className="absolute inset-px rounded-lg bg-white lg:rounded-tr-[2rem]" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-tr-[2rem]">
//               <LLamaCell src={urls[1]} />
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-tr-[2rem]" />
//           </div>
          
//           <div className="relative col-span-2">
//             <div className="absolute inset-px rounded-lg bg-white lg:rounded-bl-[2rem]" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-lg lg:rounded-bl-[2rem]">
//               <LLamaCell src={urls[2]} />
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5 lg:rounded-bl-[2rem]" />
//           </div>
          
//           <div className="relative col-span-6">
//             <div className="absolute inset-px rounded-lg bg-white" />
//             <div className="relative flex h-full flex-col overflow-hidden rounded-lg">
//               <LLamaCell src={urls[3]} />
//             </div>
//             <div className="pointer-events-none absolute inset-px rounded-lg shadow ring-1 ring-black/5" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default LlamaGrid;