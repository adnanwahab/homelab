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
          <img src="/api/placeholder/W32/32" alt="Storybook" className="h-8" />
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

import {
  Command,
  ExternalLink,
  Github,
  Code,
  ChevronRight,
} from "lucide-react";

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

const LandingPage = () => {
  const techLogos = [
    { name: "React", icon: <div className="text-2xl">⚛️</div> },
    { name: "Vue", icon: <div className="text-2xl">💚</div> },
    { name: "Angular", icon: <div className="text-2xl">🅰️</div> },
    { name: "HTML5", icon: <div className="text-2xl">🌐</div> },
    { name: "More", icon: <div className="text-2xl">+7</div> },
  ];

  const topBrands = [
    { name: "VS Code", icon: "◇" },
    { name: "GitHub", icon: "GH" },
    { name: "Airbnb", icon: "⌂" },
    { name: "Mozilla", icon: "Moz" },
    { name: "Monday", icon: "◆" },
    { name: "BBC", icon: "BBC" },
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Top brands bar */}
      <div className="w-full border-b border-gray-800">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center space-x-8">
            {topBrands.map((brand) => (
              <div
                key={brand.name}
                className="text-gray-400 hover:text-white transition-colors"
              >
                {brand.icon}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="container mx-auto px-6 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <h1 className="text-5xl font-bold leading-tight">
              Develop durable user interfaces
            </h1>
            <p className="text-xl text-gray-400">
              Storybook provides a workshop to build UIs in isolation. It helps
              you develop hard-to-reach states and edge cases without needing to
              run the whole app.
            </p>

            {/* Tech stack badges */}
            <div className="space-y-4">
              <p className="text-sm uppercase tracking-wider text-gray-500">
                MADE FOR
              </p>
              <div className="flex space-x-4">
                {techLogos.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex items-center justify-center w-10 h-10 rounded bg-gray-800 hover:bg-gray-700 transition-colors"
                  >
                    {tech.icon}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className="flex space-x-4">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg flex items-center space-x-2">
                <Code size={20} />
                <span>Get Started</span>
                <ChevronRight size={20} />
              </button>
              <button className="px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg">
                Browse docs
              </button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="relative">
            <div className="bg-gray-800 rounded-lg p-4 shadow-xl">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-1 bg-gray-700 rounded-lg p-4">
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-600 rounded w-2/3"></div>
                  </div>
                </div>
                <div className="col-span-2 bg-gray-700 rounded-lg p-4">
                  <div className="space-y-4">
                    <div className="h-32 bg-gray-600 rounded"></div>
                    <div className="h-4 bg-gray-600 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-600 rounded w-3/4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

import React from "react";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  BarChart,
  Bar,
  Cell,
} from "recharts";
import {
  Eye,
  Box,
  MousePointer2,
  Accessibility,
  Code2,
  ListTodo,
} from "lucide-react";

const TestingDashboard = () => {
  const lineData = [
    { time: "20ms", value: 5 },
    { time: "30ms", value: 15 },
    { time: "40ms", value: 20 },
  ];

  const pieData = [
    { name: "Slice 1", value: 25 },
    { name: "Slice 2", value: 25 },
    { name: "Slice 3", value: 25 },
    { name: "Slice 4", value: 12.5 },
    { name: "Slice 5", value: 12.5 },
  ];

  const barData = [
    { time: "20ms", value: 5 },
    { time: "25ms", value: 15 },
    { time: "30ms", value: 15 },
    { time: "35ms", value: 18 },
    { time: "40ms", value: 22 },
    { time: "45ms", value: 15 },
  ];

  const calendar = Array.from({ length: 35 }, (_, i) => i + 1);

  const COLORS = ["#00C49F", "#0088FE", "#FFBB28", "#8884D8", "#FF8042"];

  return (
    <div className="min-h-screen bg-navy-900 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Test UIs with less effort and no flake
          </h1>
          <p className="text-gray-300">
            Stories capture the "known good" states of UI components. They're a
            pragmatic, reproducible way to keep track of UI edge cases. Reuse
            stories to power automated tests
          </p>
          <button className="mt-4 bg-gray-600 text-white px-6 py-2 rounded-full hover:bg-gray-700 transition-colors">
            Learn about UI tests
          </button>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-4 rounded-lg shadow">
            <AreaChart width={300} height={200} data={lineData}>
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.3}
              />
            </AreaChart>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <PieChart width={300} height={200}>
              <Pie
                data={pieData}
                cx={150}
                cy={100}
                innerRadius={60}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
            </PieChart>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <BarChart width={300} height={200} data={barData}>
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <div className="grid grid-cols-7 gap-1">
              <div className="col-span-7 grid grid-cols-7 text-center text-xs text-gray-500 mb-2">
                <div>Su</div>
                <div>Mo</div>
                <div>Tu</div>
                <div>We</div>
                <div>Th</div>
                <div>Fr</div>
                <div>Sa</div>
              </div>
              {calendar.map((day) => (
                <div
                  key={day}
                  className={`aspect-square flex items-center justify-center text-sm ${
                    day === 8 ? "bg-blue-500 text-white rounded-full" : ""
                  }`}
                >
                  {day}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {[
            {
              icon: Eye,
              title: "Spot test",
              description: "Stories are tests you can debug in dev and QA.",
              color: "bg-blue-500",
            },
            {
              icon: Box,
              title: "Visual test appearance",
              description: "Pinpoint UI changes down to the pixel.",
              color: "bg-emerald-500",
            },
            {
              icon: MousePointer2,
              title: "Component test behavior",
              description: "Simulate user behavior and assert in the browser.",
              color: "bg-blue-600",
            },
            {
              icon: Accessibility,
              title: "Accessibility tests",
              description: "Check stories for WCAG and ARIA issues.",
              color: "bg-purple-500",
            },
            {
              icon: Code2,
              title: "Snapshot test markup",
              description: "Detect regressions in DOM markup.",
              color: "bg-orange-500",
            },
            {
              icon: ListTodo,
              title: "Reuse tests in other test tools",
              description:
                "Write stories once to reuse across your test suite.",
              color: "bg-gray-500",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="p-4 bg-navy-800 rounded-lg flex items-center space-x-4"
            >
              <div className={`p-2 ${item.color} rounded-lg`}>
                <item.icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-white font-semibold">{item.title}</h3>
                <p className="text-gray-400">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default function () {
  return (
    <>
      <StoryBookLanding />
      <LandingPage />
      <TestingDashboard />
      <StoryBookFooter />
    </>
  );
}
