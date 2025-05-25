import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/posts');

export function getPostSlugs() {
  return fs.readdirSync(postsDirectory)
    .filter(fn => fn.endsWith('.mdx'))
    .map(fn => fn.replace(/\.mdx$/, ''));
}

export function getPostBySlug(slug) {
  const realSlug = slug.replace(/\.mdx$/, '');
  const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return { slug: realSlug, meta: data, content };
}

export function getAllPosts() {
  const slugs = getPostSlugs();
  return slugs.map(slug => getPostBySlug(slug));
}