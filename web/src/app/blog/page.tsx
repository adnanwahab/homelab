import MagicIframe from '../../components/MagicIframe'
import Link from 'next/link'

import { getPosts } from '../../lib/posts'

export default function BlogPage() {
  const posts = getPosts()

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">All Posts</h1>
      <div className="space-y-8">
        {posts.map((post) => (
          <div key={post.slug} className="border-b pb-8">
            <h2 className="mb-2 text-2xl font-semibold">{post.title}</h2>
            <p className="mb-2 text-gray-600">{post.date}</p>
            <p className="mb-4">{post.excerpt}</p>
            <Link
              href={`/blog/${post.slug}`}
              className="text-blue-500 hover:underline"
            >
              Read more
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
