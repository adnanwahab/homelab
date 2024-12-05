export default () => {}

// import React, { useState } from 'react';
// import { Button } from '@/components/button';

// const ComponentPicker = () => {
//   const components = [
//     'Balloons',
//     'Sunglasses',
//     'Eyelashes',
//     'Fangs',
//     'Handlebars',
//     'Glasses',
//     'Skateboard',
//     'Ferris',
//     'Mustache',
//     'Mascara',
//     'Tattoo'
//   ];

//   const [selectedComponents, setSelectedComponents] = useState<string[]>([]);

//   const toggleComponent = (component: string) => {
//     setSelectedComponents(prev =>
//       prev.includes(component)
//         ? prev.filter(c => c !== component)
//         : [...prev, component]
//     );
//   };

//   const clearAll = () => {
//     setSelectedComponents([]);
//   };

//   const randomizeAll = () => {
//     const randomSelection = components.filter(() => Math.random() > 0.5);
//     setSelectedComponents(randomSelection);
//   };

//   return (
//     <div className="p-4 bg-gray-100 rounded-lg">
//       <div className="mb-4">
//       <img className='w-48'  src="https://nanosaur.ai/assets/images/nanosaur-wireframe-bw.png" />
// <img className='w-48' src="https://nanosaur.ai/assets/images/nanosaur_og.jpg" />
//         <select className="w-full p-2 border rounded mb-2">
//           <option>Party Hat</option>
//           <option>Bowtie</option>
//         </select>
//         <div className="flex space-x-2">
//           {['#a3e635', '#fbbf24', '#f97316', '#3b82f6', '#6366f1', '#ec4899', '#111827'].map(color => (
//             <div key={color} className="w-6 h-6 rounded-full" style={{ backgroundColor: color }}></div>
//           ))}
//         </div>
//       </div>
//       <div className="grid grid-cols-2 gap-4">
//         {components.map(component => (
//           <Button
//             key={component}
//             variant={selectedComponents.includes(component) ? 'default' : 'outline'}
//             onClick={() => toggleComponent(component)}
//             className="w-full"
//           >
//             {component}
//           </Button>
//         ))}
//       </div>
//       {selectedComponents.length > 0 && (
//         <div className="mt-4">
//           <p className="text-sm font-medium">Selected Components:</p>
//           <ul className="list-disc list-inside text-sm">
//             {selectedComponents.map(component => (
//               <li key={component}>{component}</li>
//             ))}
//           </ul>
//         </div>
//       )}
//       <div className="mt-4">
//         <Button variant="outline" onClick={clearAll} className="w-full">Clear All</Button>
//         <Button variant="outline" onClick={randomizeAll} className="w-full">Randomize All</Button>
//       </div>
//     </div>
//   );
// };

// export default ComponentPicker;