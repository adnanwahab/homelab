import Link from 'next/link';
import { getAllPosts } from 'lib/posts';

export default function HomePage() {
  const posts = getAllPosts();
  return (
    <main>
      <h1>My Blog</h1>
      <ul>
        {posts.map(post => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              {post.meta.title} {post.meta.date && `(${post.meta.date})`}
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}