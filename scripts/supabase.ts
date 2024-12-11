import { createClient } from '@supabase/supabase-js'
import fs from 'fs'

supabase

const url = "https://ewkxvbgbzikwwudriebh.supabase.co"
const anon = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV3a3h2Ymdiemlrd3d1ZHJpZWJoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM1MjYzMDEsImV4cCI6MjA0OTEwMjMwMX0.LjW3EYwo7bg4Za_fGjXKGXS92fPqcAGVJRrbr3Vgh0Y"
// Replace with your Supabase credentials
const supabase = createClient(
  url,
  anon
)

// Create basic server
Bun.serve({
  port: 3000,
  async fetch(req) {
    if (req.url.endsWith('/')) {
      // Read directory contents
      const files = fs.readdirSync('.', { withFileTypes: true })
        .filter(file => file.isFile())
        .slice(0, 5)

      // Get file info and store in Supabase
      const fileInfos = files.map(file => {
        const stats = fs.statSync(`../data/${file.name}`)
        return {
          name: file.name,
          size: stats.size,
          modified: stats.mtime,
          created: stats.birthtime
        }
      })

      // Insert into Supabase
      const { data, error } = await supabase
        .from('files')
        .insert(fileInfos)
        .select()

      // Generate HTML response
      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>File Information</title>
            <style>
              table { border-collapse: collapse; width: 100%; }
              th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
              th { background-color: #f2f2f2; }
            </style>
          </head>
          <body>
            <h1>File Information</h1>
            <table>
              <tr>
                <th>Name</th>
                <th>Size (bytes)</th>
                <th>Modified</th>
                <th>Created</th>
              </tr>
              ${fileInfos.map(file => `
                <tr>
                  <td>${file.name}</td>
                  <td>${file.size}</td>
                  <td>${file.modified}</td>
                  <td>${file.created}</td>
                </tr>
              `).join('')}
            </table>
          </body>
        </html>
      `

      return new Response(html, {
        headers: {
          'Content-Type': 'text/html'
        }
      })
    }

    return new Response('Not Found', { status: 404 })
  },
})

console.log('Server running at http://localhost:3000')