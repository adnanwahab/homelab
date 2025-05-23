import { getPostBySlug, getPosts } from '../../../lib/posts'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const posts = getPosts()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await getPostBySlug(params.slug)

  if (!post || !post.content) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-prose px-4 py-8">
      <h1 className="mb-4 text-3xl font-bold">{post.title}</h1>
      <p className="mb-8 text-gray-600">{post.date}</p>
      <div
        className="prose prose-lg"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  )
}
