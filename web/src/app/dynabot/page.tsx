'use client'
import LivingRobotDemo from "@/components/demo";
import { Container } from "@/components/container";
import Footer from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";
import { Navbar } from "@/components/navbar";
import TitleRewriter from "@/components/title-rewriter";
import { SeeingSpace } from "@/components/seeingspace"; 

export default function Home() {
  return (
    <div className="overflow-hidden">
      <main>
        <div className="bg-gradient-to-b from-white from-50% to-gray-100 ">
          <LivingRobotDemo  second_thing={SeeingSpace} />
          <PricingPage />
          <Footer />
          {/* <LogoCloud /> */}
        </div>
      </main>
    </div>
  );
}




// import Image from "next/image";


// export default function Home() {
//   return (
//     <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
//       <ul>

    

//         <li>
//           <a href="/dynabot">
//             dynabot.dev - living demo (medbot, repairbot, roombacat)
//           </a>
//         </li>
 
//       ------------
//       <li>
//           <a href="/dynabot/deno-webgpu">
//             deno-webgpu
//           </a>
//         </li>






// -------------
//         <li>
//           <a href="/jupyter">
//             jupyter
//           </a>
//         </li>

//         <li>
//           <a href="/files">
//             files-derp
//           </a>
//         </li>

//         <li>
//           <a href="/llama_tools">
//             llama-tools - tools for llama 3.2
//           </a>
//         </li>

     
//         <li>
//           <a href="/baby-dynamicland">baby dynamicland</a>
//         </li>

//       </ul>
//     </div>
//   );
// }


// //50 llamas - 50 gpus --- instantly interpret and deno-webpgu suggestions 




import Link from 'next/link'
import Image from 'next/image'

function PricingPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Pricing</h1>
        <p className="text-xl text-gray-600">
          Support an independent business and a product made with love.
        </p>
      </div>

      {/* Pricing Cards Grid */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {/* Free Tier */}
        <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Free</h2>
          <ul className="mt-6 space-y-4">
            <li className="flex items-start">
              <svg className="h-6 w-6 text-purple-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"/>
              </svg>
              <span className="ml-3 text-gray-600">Mac, iPad, and iPhone</span>
            </li>
            {/* Add other list items similarly */}
          </ul>
          <p className="mt-8 text-2xl font-bold">Free <span className="text-gray-600">forever</span></p>
          <Link href="https://apps.apple.com" className="mt-8 block">
            <Image
              src="/app-store-badge.png"
              alt="Download on the App Store"
              width={140}
              height={42}
              className="mx-auto"
            />
          </Link>
        </div>

        {/* Unlimited Tier */}
        <div className="rounded-lg border-2 border-purple-500 p-8 shadow-lg relative">
          <div className="absolute -top-5 right-0 left-0">
            <span className="bg-purple-500 text-white px-4 py-1 rounded-full text-sm font-medium">
              Most Popular
            </span>
          </div>
          <h2 className="text-2xl font-semibold text-purple-500">Unlimited</h2>
          {/* Similar structure to Free tier */}
          <div className="mt-8">
            <span className="text-2xl font-bold">$9.99</span>/month
            <div className="mt-2">
              <span className="text-2xl font-bold">$99.99</span>/year
            </div>
          </div>
        </div>

        {/* Setapp Tier */}
        <div className="rounded-lg border border-gray-200 p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-900">Setapp</h2>
          {/* Similar structure to other tiers */}
          <div className="mt-8">
            <span className="text-2xl font-bold">$9.99</span>/month
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 text-center">
        <p className="text-gray-600">
          Students and teachers can contact us at{' '}
          <a href="mailto:hello@museapp.com" className="text-purple-600 hover:text-purple-500">
            hello@museapp.com
          </a>
          {' '}for an education discount.
        </p>
        <p className="mt-4 text-sm text-gray-500">
          *Mac device is required for Setapp; iPad and iPhone are optional.
        </p>
      </div>
    </div>
  )
}