import { getPostBySlug, getPostSlugs } from '../../../lib/posts';
import { MDXRemote } from 'next-mdx-remote/rsc';

export async function generateStaticParams() {
  return getPostSlugs().map(slug => ({ slug }));
}

export default function PostPage({ params }) {
  const post = getPostBySlug(params.slug);
  return (
    <main>
      <h1>{post.meta.title}</h1>
      <MDXRemote source={post.content} />
    </main>
  );
}

const postsDirectory = path.join(process.cwd(), 'src/content/posts');

