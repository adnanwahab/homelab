'use client'

import { useState, useEffect } from 'react'

interface BlogPost {
  slug: string
  title: string
  date: string
  content: string
}

export default function BlogPage() {
    const loading = false
    const posts = [
        {
            slug: '183_tools',
            title: '183_tools',
            date: '2024-12-06',
            content: 'https://patatap.com/'
        }
    ]
    
//   const [posts, setPosts] = useState<BlogPost[]>([])
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const res = await fetch('/api/upstash')
//         const data = await res.json()
//         setPosts(data.posts)
//       } catch (error) {
//         console.error('Failed to fetch posts:', error)
//       } finally {
//         setLoading(false)
//       }
//     }

//     fetchPosts()
//   }, [])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
    </div>
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Blog Posts</h1>
        <div className="space-y-6">
          {posts.map((post) => (
            <article key={post.slug} className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <time className="text-gray-500 mb-4 block">
                {new Date(post.date).toLocaleDateString()}
              </time>
              <div className="prose max-w-none">
                {post.content.split('\n').slice(1).join('\n')}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  )
}