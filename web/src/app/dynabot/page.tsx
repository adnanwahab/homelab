"use client";
import LivingRobotDemo from "@/components/demo";
import { Container } from "@/components/container";
import Footer from "@/components/footer";
import { LogoCloud } from "@/components/logo-cloud";
import { Navbar } from "@/components/navbar";
import TitleRewriter from "@/components/title-rewriter";
import { SeeingSpace } from "@/components/seeingspace";
import { MainComponent as BuyRobotPage } from "./robot/page";
 // <a href="https://nanosaur.ai">nanosaur.ai</a>
  //             <a href="https://hello-robot.com">hello robot.ai</a>
  //             <a href="https://innate.bot">Maurice</a>

  //             <img
  //               src="https://images.squarespace-cdn.com/content/v1/65789f5bc31b3c64091939a3/31563aa0-c09d-46a1-a2d1-b0193528775e/STRETCH+3+KEYSHOT+2024+FULL+02+%281%29.png?format=2500w"
  //             />





  const LandingPage = () => {
    return (
      <div className="min-h-screen bg-gradient-to-b from-purple-900 via-purple-800 to-blue-900">
        {/* Updated Navigation */}
        <nav className="bg-transparent py-4 px-6">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                {/* Updated Storybook logo */}
                <svg className="w-8 h-8" viewBox="0 0 100 100" fill="#FF4785">
                  <path d="M20 84c0 3.3 2.7 6 6 6h48c3.3 0 6-2.7 6-6V16c0-3.3-2.7-6-6-6H26c-3.3 0-6 2.7-6 6v68z" />
                </svg>
                <span className="ml-2 text-white font-semibold text-xl">Storybook</span>
              </div>
              {/* Updated navigation items */}
              <div className="hidden md:flex space-x-6">
                {['Docs', 'Addons', 'Showcase', 'Blog', 'Visual Test', 'Enterprise'].map((item) => (
                  <a key={item} href="#" className="text-gray-300 hover:text-white">
                    {item}
                  </a>
                ))}
              </div>
            </div>
            {/* Updated right side navigation */}
            <div className="flex items-center space-x-4">
              <button className="bg-[#2A0481] text-white px-4 py-2 rounded-full">
                84,832
              </button>
              <div className="relative">
                <input
                  type="search"
                  placeholder="Search docs"
                  className="bg-[#2A0481] text-white px-4 py-2 rounded-full w-48 focus:outline-none"
                />
                <span className="absolute right-3 top-2 text-gray-400">⌘K</span>
              </div>
            </div>
          </div>
        </nav>
  
        {/* Updated Hero Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h1 className="text-6xl font-bold text-white mb-8">
            Build UIs without the grunt work
          </h1>
          <p className="text-xl text-gray-300 mb-12 max-w-2xl">
            Storybook is a frontend workshop for building UI components and 
            pages in isolation. Thousands of teams use it for UI development, 
            testing, and documentation. It's open source and free.
          </p>
          <div className="flex space-x-4">
            <button className="bg-white text-purple-900 px-6 py-3 rounded-lg font-semibold">
              Get Started
            </button>
            <button className="bg-[#2A0481] text-white px-6 py-3 rounded-lg font-semibold flex items-center">
              npx storybook@latest init
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
  
          {/* Updated Stats */}
          <div className="mt-20 flex space-x-12">
            <div>
              <div className="text-2xl font-bold text-white">27.21m</div>
              <div className="text-gray-400">Installs per month</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white">2282</div>
              <div className="text-gray-400">Contributors</div>
            </div>
            <div className="flex items-baseline">
              <div className="text-gray-400">Version</div>
              <div className="text-5xl font-bold text-white ml-2">8</div>
            </div>
          </div>
  
          {/* Updated Feature Tabs */}
          <div className="mt-20">
            <div className="flex space-x-8 border-b border-gray-700">
              {['Development', 'Component testing', 'Visual testing', 'Documentation'].map((tab) => (
                <button
                  key={tab}
                  className={`pb-4 text-gray-300 hover:text-white ${
                    tab === 'Development' ? 'border-b-2 border-white text-white' : ''
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>
  
        {/* Testimonial Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <blockquote className="relative bg-[#131416] p-8 rounded-lg text-white">
            <p className="text-2xl mb-8">
              “Storybook has made developing components more streamlined by allowing us to easily include technical documentation within our design system!”
            </p>
            <div className="flex items-center space-x-4">
              {/* Replace this with a suitable avatar if you have one */}
              <div className="w-12 h-12 bg-gray-700 rounded-full" />
              <div>
                <div className="font-semibold">Taurie Davis</div>
                <div className="text-sm text-gray-400">Author of Building Design Systems</div>
              </div>
              {/* GitLab logo (replace src with a valid image URL if needed) */}
              <div className="ml-auto">
                <img 
                  src="https://about.gitlab.com/images/press/logo/png/gitlab-logo-gray-stacked-rgb.png" 
                  alt="GitLab" 
                  className="h-8"
                />
              </div>
            </div>
          </blockquote>
        </div>
  
        {/* "Share how the UI actually works" Section */}
        <div className="max-w-7xl mx-auto px-6 py-20">
          <h2 className="text-5xl font-bold text-white mb-8">Share how the UI actually works</h2>
          <p className="text-lg text-gray-300 max-w-3xl">
            Stories show how UIs actually work not just a static design of how they’re supposed to work. 
            That keeps everyone aligned on what’s currently in production.
          </p>
        </div>
      </div>
    );
  };

export default LandingPage;

 