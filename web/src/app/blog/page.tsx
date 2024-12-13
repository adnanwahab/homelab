import Three_galery from '@/components/threejs_galery'

// import React from 'react'
// import BlogHeader from './BlogHeader'
// import AuthorInfo from './AuthorInfo'
// import GDPRIcon from './GDPRIcon'
// https://radiant.tailwindui.com/blog/gdpr-is-just-a-suggestion-a-guide-to-european-privacy-laws
import  ThreeCube from '@/components/attempt_three_import'
const tags = ['Insights', 'Knowledge']

interface BlogPostProps {
  date: string
  title: string
  author: string
  tags: string[]
  content: string
}

const BlogPost: React.FC<BlogPostProps> = () => {
  const date = "Thursday, August 29, 2024"
  const title = "Why dynamicland is cool and how it will improve collaboration in 2025"
  const author = "Marcus Eldridge"
  const tags = ['Insights', 'Knowledge']
  const content = `Since its introduction in 2018, GDPR has completely upturned the data collection field and needlessly forced a lot of respectable companies out of business. At Radiant, we’ve built our reputation on evading the reach of privacy regulators, and so we thought it’s about time we shared our strategies with the broader community.`
  return (
    <article className="max-w-3xl mx-auto px-4 py-12 ">
      <BlogHeader date={date} title={title} />
      <Three_galery />
      <ThreeCube />
      {/* <AuthorInfo name={author} tags={tags} /> */}

      <div className="my-8">
        {/* The "card" containing the GDPR icon */}
        <div className="bg-[#0f172a] rounded-lg p-8 relative overflow-hidden">
          {/* Grid lines or subtle framing could be done via pseudo-elements or borders */}
          {/* Here’s a subtle hint: */}
          <div className="absolute inset-0 border border-gray-700 pointer-events-none rounded-lg" />

          <div className="flex justify-center">
            <GDPRIcon />
            <button>
              hover over button to file write to repo
            </button>
          </div>
        </div>
      </div>

      <div className="prose prose-invert max-w-none text-gray-300">
        <p>{content}</p>
      </div>
      <img src="https://worrydream.com/SeeingSpaces/SeeingSpaces.jpg" alt="placeholder" />
    </article>
  )
}

export default BlogPost


import React from 'react'

interface BlogHeaderProps {
  date: string
  title: string
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ date, title }) => {
  return (
    <header className="mb-6">
      <p className="text-sm text-gray-400">{date}</p>
      <h1 className="text-3xl font-bold text-white mt-2">{title}</h1>
    </header>
  )
}



interface AuthorInfoProps {
  name: string
  tags: string[]
}

const AuthorInfo: React.FC<AuthorInfoProps> = ({ name, tags }) => {
  return (
    <div className="flex items-center space-x-4 mt-4">
      {/* Author Avatar Placeholder */}
      <div className="w-10 h-10 bg-gray-600 rounded-full" />
      <div>
        <p className="text-white font-medium">{name}</p>
        <div className="flex space-x-2 mt-1">
          {tags.map(tag => (
            <TagPill key={tag} label={tag} />
          ))}
        </div>
      </div>
    </div>
  )
}





interface TagPillProps {
  label: string
}

const TagPill: React.FC<TagPillProps> = ({ label }) => {
  return (
    <span className="text-xs text-gray-300 bg-gray-700 rounded-full px-3 py-1">
      {label}
    </span>
  )
}



/**
 * This component uses inline SVG to approximate the icon shown:
 * - A circle with a gradient stroke
 * - 12 stars arranged in a circle
 * - A slash across the circle
 * 
 * You can adjust the stars, colors, and stroke as needed.
 */
const GDPRIcon: React.FC = () => {
  return (
    <svg
      width="200"
      height="200"
      viewBox="0 0 200 200"
      className="block"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Gradient definition */}
      <defs>
        <linearGradient id="gdpr-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="100%" stopColor="#ec4899" />
        </linearGradient>
      </defs>

      {/* Outer circle with gradient stroke */}
      <circle
        cx="100"
        cy="100"
        r="80"
        fill="none"
        stroke="url(#gdpr-gradient)"
        strokeWidth="8"
      />

      {/* Slash line */}
      <line
        x1="50"
        y1="150"
        x2="150"
        y2="50"
        stroke="url(#gdpr-gradient)"
        strokeWidth="8"
      />

      {/* Stars (12 of them) arranged roughly in a circle.
          Simplified: Just use a simple star path or a polygon.
          Adjust transform rotate for spacing. 
      */}
      {[...Array(12)].map((_, i) => {
        const angle = (i * 360) / 12;
        return (
          <polygon
            key={i}
            points="2,0 2.6,1.8 4.5,1.8 3,2.9 3.6,4.7 2,3.7 0.4,4.7 1,2.9 -0.5,1.8 1.4,1.8"
            fill="white"
            transform={`translate(100,100) rotate(${angle}) translate(0,-60) scale(3)`}
          />
        );
      })}
    </svg>
  )
}


const ExamplePage = () => {
  return (
    <div className="min-h-screen bg-gray-900">
      <BlogPost
        date="Thursday, August 29, 2024"
        title="GDPR is just a suggestion - A guide to European privacy laws"
        author="Marcus Eldridge"
        tags={['Insights', 'Knowledge']}
        content={`Since its introduction in 2018, GDPR has completely upturned the data collection field and needlessly forced a lot of respectable companies out of business. At Radiant, we’ve built our reputation on evading the reach of privacy regulators, and so we thought it’s about time we shared our strategies with the broader community.`}
      />
    </div>
  )
}


