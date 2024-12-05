'use client'
import React from "react";
import { BentoCard } from "@/components/bento-card";
import { Container } from "@/components/container";
import { Heading, Subheading } from "@/components/text";

import SemanticSegmentation from "@/components/SemanticSegmentation";
import Roomba from "@/components/Roombadrive";
import ThreeScene from "@/components/ThreeScene";
import OverHeadMap from "@/components/OverheadMap";

import Powerpoint from "@/components/PowerPoint";
import {SeeingSpace} from "@/components/seeingspace";

import DrawableCanvas from "@/components/DrawableCanvas";

type Theme = 'roombacat' | 'gardening' | 'medbot' | 'seeingspace';

export default DarkBentoSection


// function ThreeScene() {
//   return <div>ThreeScene</div>
// }


//1. livekit Zed 2i - morrowind buttons / speech 
//2. roomba map + 3.js semseg - list of labels to click on / search
//3. semseg - swap???
//4. worry dream cube - time control - see possibilties



function SensorHistory () {
  return <iframe height="100%" width="100%" src="/dynabot/micro-dynamicland/seeingspace" />
}





function Livekit_zed_2i(): JSX.Element {
  return (<>
    <div className="flex gap-4 mb-4">
      {/* <button className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
        Left Button
      </button>
      <button className="w-1/2 px-4 py-2 bg-gray-800 text-white rounded hover:bg-gray-700">
        Right Button
      </button> */}
    </div>
    
    <iframe width="80%" height="100%" src="/dynabot/livekit/subscriber" />
  </>)
}

function DynamicLandCube(){
return  <> 

<div className="grid grid-cols-3 gap-4 inline">
  <OverHeadMap />
  <textarea
  
  className="text-black w-30 h-full "
  defaultValue="wish robot radiation pressure walks in circles following laser pointer" />
</div>
</>
}

function FigmaDrawing(){} 

function playwrightDebuggerShitUploadTweetsToobservableHq() {
  //5 million observables --- cherry pick
  return 'test, iterate, improve, link-to-living-data-with-docs-for-high-perf-endpoints-1tbs'
}

function JP_Demo_go_here() {

  return   <SeeingSpace/>

 //return  <img className='w-full' src="https://github.com/denoland/webgpu-examples/blob/main/shadow/output.gif?raw=true" />

  //return <iframe width="100%" height="590" src="https://observablehq.com/embed/@roboticsuniversity/hardware@719?cells=_"></iframe>
}

function Eric_Demo_go_here() {
  return   <DrawableCanvas />


  //return <iframe src="http://localhost:5173/" />;
  //return <SeeingSpace />

//   return (<><iframe width="100%" height="427" 
//   src="https://observablehq.com/embed/@roboticsuniversity/simulation?cells=canvasContainer"></iframe>
// <iframe width="100%" height="422"
//   src="https://observablehq.com/embed/@roboticsuniversity/simulation?cells=ezgifComOptimize13"></iframe>
//   </>
//   )
}

const robot_views = [
  <Livekit_zed_2i />,
  <JP_Demo_go_here />,
  <Eric_Demo_go_here />,
  <DynamicLandCube />,
]


function DynamicLand() {
  return (
    <div className="grid grid-cols-2 gap-4">

      <iframe width="100%" height="300" src="//jsfiddle.net/designsystemweb/cLnuxha7/embedded/"  loading="lazy" ></iframe>
      {/* <img
        src="https://files.hashirama.blog/blog/future-city.gif"
        className="h-full w-full"
      /> */}

      {/* <iframe
        src="https://threejs.org/examples/?q=voxel#webgl_interactive_voxelpainter"
        className="h-96 w-full"
      ></iframe> */}
    </div>
  );
}



//1. 

function DarkBentoSection({second_thing}: {second_thing: React.ReactNode}) {
  const [theme, setTheme] = React.useState<Theme>('roombacat');

  return (
    <div className="rounded-4xl bg-gray-900 py-1 ">
      <Container>
        
        {/* <div className="flex gap-4 mb-6">
          {(['roombacat', 'gardening', 'medbot'] as Theme[]).map((t) => (
            <label key={t} className="flex items-center space-x-2 text-white cursor-pointer">
              <input
                type="radio"
                name="theme"
                value={t}
                checked={theme === t}
                onChange={(e) => setTheme(e.target.value as Theme)}
                className="text-blue-500 focus:ring-blue-500"
              />
              <span className="capitalize">{t}</span>
            </label>
          ))}
        </div> */}

        <Subheading dark>Biotech Robotics Dynamicland gamified</Subheading>
        <Heading as="h3" dark className="mt-2 max-w-3xl">
          Living Robot Demo
        </Heading>

        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          <BentoCard
            dark
            eyebrow=""
            title=""
            description=""
            graphic={robot_views[0]}
            fade={["top"]}
            className="max-lg:rounded-t-4xl lg:col-span-4 lg:rounded-tl-4xl transform transition-transform hover:scale-105 hover:rotate-1 translate-y-0 hover:-translate-y-2 duration-300 ease-in-out"
          />
          <BentoCard
            dark
            eyebrow=""
            title=""
            description=""
            graphic={<iframe src={'/dynabot/seeingspace'} />}
            // `!overflow-visible` is needed to work around a Chrome bug that disables the mask on the graphic.
            className="z-10 !overflow-visible lg:col-span-2 lg:rounded-tr-4xl"
          />
          <BentoCard
            dark
            eyebrow=""
            title=""
            description=""
            graphic={robot_views[2]}
            className="lg:col-span-2 lg:rounded-bl-4xl"
          />
          <BentoCard
            dark
            eyebrow=""
            title=""
            description=""
            graphic={robot_views[3]}
            className="max-lg:rounded-b-4xl lg:col-span-4 lg:rounded-br-4xl"
          />
        </div>
      </Container>
      <div className="mt-10"> 
        {/* <Powerpoint /> */}
      </div>
    </div>
  );
}

// 'use client'
// import * as Headless from '@headlessui/react'
// import { clsx } from 'clsx'
// import { Link } from './link'

// const variants = {
//   primary: clsx(
//     'inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
//     'rounded-full border border-transparent bg-gray-950 shadow-md',
//     'whitespace-nowrap text-base font-medium text-white',
//     'data-[disabled]:bg-gray-950 data-[hover]:bg-gray-800 data-[disabled]:opacity-40',
//   ),
//   secondary: clsx(
//     'relative inline-flex items-center justify-center px-4 py-[calc(theme(spacing.2)-1px)]',
//     'rounded-full border border-transparent bg-white/15 shadow-md ring-1 ring-[#D15052]/15',
//     'after:absolute after:inset-0 after:rounded-full after:shadow-[inset_0_0_2px_1px_#ffffff4d]',
//     'whitespace-nowrap text-base font-medium text-gray-950',
//     'data-[disabled]:bg-white/15 data-[hover]:bg-white/20 data-[disabled]:opacity-40',
//   ),
//   outline: clsx(
//     'inline-flex items-center justify-center px-2 py-[calc(theme(spacing.[1.5])-1px)]',
//     'rounded-lg border border-transparent shadow ring-1 ring-black/10',
//     'whitespace-nowrap text-sm font-medium text-gray-950',
//     'data-[disabled]:bg-transparent data-[hover]:bg-gray-50 data-[disabled]:opacity-40',
//   ),
// }

// type ButtonProps = {
//   variant?: keyof typeof variants
// } & (
//   | React.ComponentPropsWithoutRef<typeof Link>
//   | (Headless.ButtonProps & { href?: undefined })
// )

// export function Button({
//   variant = 'primary',
//   className,
//   ...props
// }: ButtonProps) {
//   className = clsx(className, variants[variant])

//   if (typeof props.href === 'undefined') {
//     return <Headless.Button {...props} className={className} />
//   }

//   return <Link {...props} className={className} />
// }



