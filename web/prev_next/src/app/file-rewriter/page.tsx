'use client'

import { useState } from 'react'

export default function FileRewriter() {
  const [file, setFile] = useState('')
  const [revision, setRevision] = useState('')
  const [document, setDocument] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const response = await fetch(`https://api.github.com/repos/${file}/contents?ref=${revision}`)
      const data = await response.text()
      setDocument(data)
    } catch (error) {
      console.error('Error fetching document:', error)
      setDocument('Error loading document')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">File Rewriter</h1>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label htmlFor="file" className="block mb-2">
            File Path (owner/repo/path):
          </label>
          <input
            type="text"
            id="file"
            value={file}
            onChange={(e) => setFile(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., username/repo/path/to/file"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="revision" className="block mb-2">
            Revision (branch/commit):
          </label>
          <input
            type="text"
            id="revision"
            value={revision}
            onChange={(e) => setRevision(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="e.g., main or commit hash"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Load Document
        </button>
      </form>

      {document && (
        <div className="mt-4">
          <h2 className="text-xl font-bold mb-2">Document Content:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            {document}
          </pre>
        </div>
      )}
    </div>
  )
}