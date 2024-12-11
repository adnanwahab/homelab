"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function Blog() {
  return <PortfolioSite />;
}

function PortfolioSite() {
  const writings = [
    {
      title: "Dynamicland makes intractable problems tractable",
      description:
        "",
      slug: "/blog/articles/dynamicland",
    },
    {
      title: "Robotics Design Award Winners 2024",
      description:
        "",
      slug: "/blog/articles/robotics_design_award_winners_2024",
    },
    // ... other writings
  ];

  const [hoveredWriting, setHoveredWriting] = useState<number | null>(null);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 font-serif bg-slate-800 text-blue-100">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-xl font-medium text-blue-100">Adnan Wahab</h1>
          <p className="shiny-text text-blue-100">
            robotics, cgi, and infrastructure!
          </p>
        </div>

        <nav className="flex gap-6 text-blue-100">
          <a href="/" className="hover:opacity-70">
            Projects
          </a>
        </nav>
      </header>

      <section className="mb-8 prose prose-lg prose-invert">
        <p className="text-lg mb-4 text-blue-100">
          I'm a Tools Engineer at Zoox where I work on Perception Algorithms and
          infrastructure. I've also been a Developer for Sony, Square, American
          Express, Samasource.ai, and more.
        </p>

        <p className="text-lg mb-8 flex items-center justify-center gap-6">
          <Link
            href="mailto:adnan@llama-tools.com"
            className="group flex items-center gap-2 hover:text-blue-300 transition-colors text-blue-100"
          >
            <span className="underline">Email</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
          <span className="text-blue-100">•</span>
          <Link
            href="https://x.com/dynabotdev"
            className="group flex items-center gap-2 hover:text-blue-300 transition-colors text-blue-100"
          >
            <span className="underline">Twitter</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </Link>
        </p>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-8 border-b border-blue-100/20 pb-2 text-blue-100">
          Selected Writing
        </h2>
        <div className="grid gap-8">
          {writings.map((writing, index) => (
            <Link
              key={index}
              href={writing.slug}
              className="p-6 rounded-lg transition-all duration-300 hover:bg-slate-700 cursor-pointer"
              onMouseEnter={() => setHoveredWriting(index)}
              onMouseLeave={() => setHoveredWriting(null)}
            >
              <h3 className="text-xl font-bold mb-2 flex items-center gap-2 text-blue-100">
                {writing.title}
                {hoveredWriting === index && (
                  <svg
                    className="w-4 h-4 text-blue-100"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                )}
              </h3>
              <p className="text-blue-100 leading-relaxed">
                {writing.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

function SiteDirectory() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="space-y-6">
        {/* Llama Tools */}
        <a href="/tools" className="block">
          <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-2">
              llama-tools.com
            </h2>
            <p className="text-white/90">
              ML Devops for unity-webgpu, llama-on-4-machines, o1: 3 iframes
            </p>
          </div>
        </a>

        {/* Dynabot */}
        <a href="/dynabot" className="block">
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-2">dynabot.dev</h2>
            <p className="text-white/90">
              Free course - pay for compute - just the course
            </p>
          </div>
        </a>

        {/* Personal Site */}
        <a href="/articles" className="block">
          <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-2">
              adnanwahab.com
            </h2>
            <p className="text-white/90">
              Mirror of localhost: - demo, wiki-course, modal-mini
            </p>
          </div>
        </a>

        {/* Hardware */}
        <a href="/hardware" className="block">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg p-6 shadow-lg transform transition-transform hover:scale-105">
            <h2 className="text-2xl font-bold text-white mb-2">
              tai-yong-robotics.com
            </h2>
            <p className="text-white/90">Arms 4 cheap</p>
          </div>
        </a>

        {/* Logs */}
        <div className="bg-gradient-to-r from-gray-700 to-gray-900 rounded-lg p-6 shadow-lg">
          <h2 className="text-2xl font-bold text-white mb-2">
            files.hashirama.blog
          </h2>
          <p className="text-white/90">
            CDN to Cloudflare - 1TB — I don't want your personal logs - put that
            in Hugging Face
          </p>
        </div>

        {/* Raytrace */}
        <div className="bg-gradient-to-r from-pink-500 to-rose-600 rounded-lg p-6 shadow-lg">
          <p className="text-white/90">
            Raytrace Roomba for dynabot.dev/buy_robot
          </p>
        </div>

        <FullscreenSlider />
      </div>
    </div>
  );
}

function FullscreenSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const content = [
    {
      image:
        "https://imgproxy.compute.toys/insecure/width:1080/plain/https://hkisrufjmjfdgyqbbcwa.supabase.co/storage/v1/object/public/shaderthumb/c3559dda-9533-4907-a5c2-9de5215a260c/14.jpg",
      text: "The curious elephant discovered a rainbow umbrella in the garden.",
    },
    {
      image:
        "https://i.ytimg.com/vi/NsMKvVdEPkw/hq720_2.jpg?sqp=-oaymwE2CNAFEJQDSFXyq4qpAygIARUAAIhCGABwAcABBvABAfgBzgWAAoAKigIMCAAQARhlIFcoSDAP&rs=AOn4CLCuGl3BgvMPp3FETtYzArP8tnNcDQ",
      text: "Little stars danced around the sleeping moon at midnight.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The magical tree grew candy instead of leaves.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "Three purple penguins had a tea party on an ice cloud.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The friendly dragon taught mathematics to forest creatures.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "A tiny spaceship full of teddy bears landed in the backyard.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The musical fish orchestra performed under the sea.",
    },
    {
      image: "/api/placeholder/1920/1080",
      text: "The sleepy sunshine wore pajamas on a rainy day.",
    },
  ];

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === content.length - 1 ? 0 : prevIndex + 1,
    );
  };

  const previousSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? content.length - 1 : prevIndex - 1,
    );
  };

  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "ArrowLeft") {
        previousSlide();
      } else if (event.key === "ArrowRight") {
        nextSlide();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src={content[currentIndex].image}
          alt={`Slide ${currentIndex + 1}`}
          className="w-full h-full object-contain"
        />

        {/* Text Overlay */}
        <div className="absolute bottom-0 w-full bg-black bg-opacity-50 p-6 text-white">
          <p className="text-center text-2xl font-bold">
            {content[currentIndex].text}
          </p>
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={previousSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        aria-label="Previous slide"
      >
        <ChevronLeft size={40} />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 p-2 rounded-full hover:bg-opacity-75 transition-opacity"
        aria-label="Next slide"
      >
        <ChevronRight size={40} />
      </button>

      {/* Page Indicator */}
      <div className="absolute bottom-24 w-full flex justify-center gap-2">
        {content.map((_, index) => (
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

// const md = `
// Adnan Wahab
// Award losing junior Developer

// I'm an Engineer living in my native Scottsdale, AZ. I'm currently working on dynabot.dev, an app for making interactive scientific art with robots on your phone.Rena is my honey

// Before that, I was a Tools Engineer at Zoox where I worked on self-driving cars. I've also been a freelancer and in-house designer for a wide variety of companies including Sony, Bookfresh acquired by Square, American Express, Samasource.ai, and more.

// Email
// •
// Twitter

// Selected Writing
// Dynamicland is the future of Robotics & Biotech
// okay.

// Mechanics Case Study in Robotics Infrastructure
// 50 min tour through Robotics Systems.
// `

// export default function Blog() {
//   return <div>Blog</div>
// }






// import Dynamicland from './dynamicland/page.mdx'

// function DynamiclandPage() {
//   return <Dynamicland />
// }


// const posts = {
//   "favorites": [
//     "visualzing zoox and waymo 5000 research papers in practice",
//     "1001 Request for Robotics Startup"
//   ],
//   "robotic_perception": [
//     "Whisper",
//     "Vision transformers for captioning Environmental cameras to capture action logs",
//     "3D Annotation for Robotics - 3x",
//     "Designing a 3D Captcha"
//   ],
//   "robotic_prediction": [
//     "LLama 3.2 theory and practice"
//   ],
//   "robotic_simulation": [
//     "Eterna",
//     "Deterministic CI pipelines for testing robotics"
//   ],
//   "robotic_graphics": [
//     "NERF",
//     "gaussian splatting",
//     "point cloud rendering",
//     "voxels and stixels",
//     "server side webgpu streaming",
//     "ray tracing (2d and 3d) - visibility"
//   ],
//   "robotics_systems": [
//     "I love zig",
//     "Tailscale & starlink for Robotic Connectivity in outdoor environments.",
//     "Robotic Locomotion for outdoor environments"
//   ]
// }


// import { type Metadata } from 'next'
// import { Card } from '@/components/Card'

// import Footer from '@/components/footer'

// import { type ArticleWithSlug, getAllArticles } from '@/lib/articles'
// import { formatDate } from '@/lib/formatDate'


// function Article({ article }: { article: ArticleWithSlug }) {
//   return (
//     <article className="md:grid md:grid-cols-4 md:items-baseline">
//       <Card className="md:col-span-3">
//         <Card.Title href={`/articles/${article.slug}`}>
//           {article.title}
//         </Card.Title>
//         <Card.Description>{article.description}</Card.Description>
//         <Card.Cta>Read article</Card.Cta>
//       </Card>
//       <Card.Eyebrow
//         as="time"
//         dateTime={article.date}
//         className="mt-1 hidden md:block"
//       >
//         {formatDate(article.date)}
//       </Card.Eyebrow>
//     </article>
//   )
// }

// export const metadata: Metadata = {
//   title: 'Articles',
//   description:
//     'All of my long-form thoughts on programming, leadership, product design, and more, collected in chronological order.',
// }

// export default async function ArticlesIndex() {
//   let articles = await getAllArticles()

//   return (

//       <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
//       {/* <iframe src="/articles/dynamicland" title="YouTube video player" className="w-full h-full" style={{'width': '1080px', 'height': '1080px'}} /> */}

//         <div className="flex max-w-3xl flex-col space-y-16">
//           <h1>hi </h1>
//           <Dynamicland />


//           {/* {articles.map((article) => (
//             <Article key={article.slug} article={article} />
//           ))} */}

//         </div>
//         <Footer/>
//       </div>

//   )
// }
