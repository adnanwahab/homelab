import { MessageCircle, Twitter, Youtube } from "lucide-react";

const StoryBookFooter = () => {
  const stats = [
    {
      title: "Join 2282 contributors building\nthe future of UI development.",
      button: "Star on Github",
      count: "2282",
      subtext: "Contributors",
      icon: <Github className="w-12 h-12 text-white" />,
    },
    {
      title: "Chat with 19,854+ frontend\ndevelopers.",
      button: "Join Discord server",
      count: "19,854+",
      subtext: "Server members",
      icon: <MessageCircle className="w-12 h-12 text-white" />,
    },
    {
      title: "Get the latest news and updates\nfrom Storybook maintainers.",
      button: "Follow on X",
      count: "24,200+",
      subtext: "Followers",
      icon: <Twitter className="w-12 h-12 text-white" />,
    },
    {
      title: "Watch tutorials, feature previews,\nand interviews.",
      button: "Watch on YouTube",
      count: "7,020+",
      subtext: "Subscribers",
      icon: <Youtube className="w-12 h-12 text-white" />,
    },
  ];

  const footerLinks = {
    Why: ["Why Storybook", "Component driven UI"],
    Docs: ["Guides", "Tutorials", "Changelog", "Telemetry"],
    Community: ["Addons", "Get involved", "Blog"],
    Showcase: ["Explore", "Projects", "Component glossary"],
  };

  return (
    <footer className="bg-gray-900 text-white p-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {stats.map((stat, index) => (
          <div key={index} className="space-y-4">
            {stat.icon}
            <p className="text-lg whitespace-pre-line">{stat.title}</p>
            <button className="px-6 py-2 rounded-full border border-white hover:bg-white hover:text-gray-900 transition-colors">
              {stat.button}
            </button>
            <div>
              <div className="text-xl font-bold">{stat.count}</div>
              <div className="text-gray-400">{stat.subtext}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Newsletter Section */}
      <div className="mb-12 flex flex-col md:flex-row items-center justify-between">
        <h3 className="text-xl mb-4 md:mb-0">Join the community</h3>
        <div className="flex gap-4 items-center">
          <input
            type="email"
            placeholder="you@domain.com"
            className="bg-gray-800 px-4 py-2 rounded-lg text-white"
          />
          <button className="bg-blue-500 px-6 py-2 rounded-lg hover:bg-blue-600">
            Subscribe
          </button>
        </div>
        <p className="text-gray-400 mt-4 md:mt-0">
          6,378 developers and counting
        </p>
      </div>

      {/* Links Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
        {Object.entries(footerLinks).map(([category, links]) => (
          <div key={category}>
            <h3 className="font-bold mb-4">{category}</h3>
            <ul className="space-y-2">
              {links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-gray-400 hover:text-white">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom Section */}
      <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-800">
        <div className="flex items-center gap-4 mb-4 md:mb-0">
          <span className="text-gray-400">Open source software</span>
          <img src="/api/placeholder/32/32" alt="Storybook" className="h-8" />
          <span className="text-gray-400">Maintained by</span>
          <img src="/api/placeholder/32/32" alt="Chromatic" className="h-8" />
        </div>
        <div className="text-gray-400">
          Special thanks to{" "}
          <a href="#" className="text-white">
            Netlify
          </a>{" "}
          and{" "}
          <a href="#" className="text-white">
            CircleCI
          </a>
        </div>
      </div>
    </footer>
  );
};

import React from "react";
import { Command, ExternalLink, Github } from "lucide-react";

const StoryBookLanding = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-red-800 to-blue-900 text-white">
      {/* Navigation */}
      <nav className="p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <div className="flex items-center">
              <div className="bg-pink-500 p-2 rounded">
                <span className="text-2xl font-bold">S</span>
              </div>
              <span className="ml-2 font-semibold">Storybook</span>
            </div>

            {/* Nav Links */}
            <div className="hidden md:flex space-x-6">
              <a href="#" className="hover:text-pink-300">
                Docs
              </a>
              <a href="#" className="hover:text-pink-300">
                Addons
              </a>
              <a href="#" className="hover:text-pink-300">
                Showcase
              </a>
              <a href="#" className="hover:text-pink-300">
                Blog
              </a>
              <a href="#" className="hover:text-pink-300">
                Visual Test
              </a>
              <a href="#" className="hover:text-pink-300">
                Enterprise
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center bg-gray-800 rounded-full px-4 py-1">
              <Github className="w-4 h-4 mr-2" />
              <span>84,897</span>
            </div>
            <div className="relative">
              <input
                type="search"
                placeholder="Search docs"
                className="bg-gray-800 rounded-full px-4 py-1 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
                ⌘K
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 py-20">
        <h1 className="text-6xl font-bold mb-8">
          Build UIs without the grunt work
        </h1>
        <p className="text-xl text-gray-300 max-w-2xl mb-12">
          Storybook is a frontend workshop for building UI components and pages
          in isolation. Thousands of teams use it for UI development, testing,
          and documentation. It's open source and free.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
          <button className="bg-white text-gray-900 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
            Get Started
          </button>
          <div className="flex items-center bg-gray-800 px-6 py-3 rounded-lg space-x-2 hover:bg-gray-700 transition-colors">
            <Command className="w-5 h-5" />
            <span>npx storybook@latest init</span>
            <ExternalLink className="w-4 h-4" />
          </div>
        </div>

        {/* Stats */}
        <div className="mt-16 flex space-x-12">
          <div>
            <div className="text-3xl font-bold">27.83m</div>
            <div className="text-gray-400">Installs per month</div>
          </div>
          <div>
            <div className="text-3xl font-bold">2282</div>
            <div className="text-gray-400">Contributors</div>
          </div>
          <div>
            <div className="text-3xl font-bold">8</div>
            <div className="text-gray-400">Version</div>
          </div>
        </div>

        {/* Navigation Pills */}
        <div className="mt-20 flex justify-center space-x-8">
          <button className="text-gray-400 hover:text-white">
            Development
          </button>
          <button className="text-gray-400 hover:text-white">
            Component testing
          </button>
          <button className="text-gray-400 hover:text-white">
            Visual testing
          </button>
          <button className="bg-white/10 px-4 py-2 rounded-full">
            Documentation
          </button>
        </div>
      </main>
    </div>
  );
};

export default function () {
  return (
    <>
      <StoryBookLanding />
      <StoryBookFooter />
    </>
  );
}
