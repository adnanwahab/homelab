import fs from "fs"

export async function GET() {
  try {
    // Read blog posts from a local directory
    const posts = fs.readdirSync('./data/blog')
      .filter(file => file.endsWith('.md'))
      .map(file => {
        const content = fs.readFileSync(`./data/blog/${file}`, 'utf-8')
        const title = content.split('\n')[0].replace('# ', '')
        const date = file.split('-')[0]
        
        return {
          slug: file.replace('.md', ''),
          title,
          date,
          content
        }
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

    return Response.json({ posts })
  } catch (error) {
    return Response.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
  }
}