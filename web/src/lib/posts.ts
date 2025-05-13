import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import html from 'remark-html'

// Define the directory where posts are stored
const postsDirectory = path.join(process.cwd(), 'src/content/posts')

export function getPosts() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory)

  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get slug
    const slug = fileName.replace(/\.md$/, '')

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName)
    const fileContents = fs.readFileSync(fullPath, 'utf8')

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents)

    // Combine the data with the slug
    return {
      slug,
      ...matterResult.data,
      excerpt: matterResult.content.substring(0, 150) + '...',
    } as {
      slug: string
      title: string
      date: string
      excerpt: string
    }
  })

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1
    } else {
      return -1
    }
  })
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const matterResult = matter(fileContents)
    const processedContent = await remark()
      .use(html)
      .process(matterResult.content)
    const contentHtml = processedContent.toString()

    // Log the HTML content for debugging
    console.log('Generated HTML:', contentHtml)

    return {
      slug,
      content: contentHtml,
      ...matterResult.data,
    } as {
      slug: string
      title: string
      date: string
      content: string
    }
  } catch (error) {
    return null
  }
}
