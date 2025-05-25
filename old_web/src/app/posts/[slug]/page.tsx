import { getPostBySlug, getPostSlugs } from '../../../lib/posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  try {
    const PostModule = await import(`../../../content/posts/${params.slug}.mdx`);
    const Post = PostModule.default;
    const { metadata } = PostModule;

    console.log(metadata);

    return (
      <main>
        <h1>{metadata?.title}</h1>
        <Post />
      </main>
    );
  } catch (e) {
    notFound();
  }
}