

import fs from "fs"
import { Button } from "@/components/ui/button"

export default function InstallPage() {
  const handleDownload = () => {
    // For client-side download, you'll need to set up an API endpoint
    // This is just the UI component for now
    const scriptUrl = "/api/download-script" // Replace with your actual script endpoint
    window.location.href = scriptUrl
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Download Our Script</h1>
      
      <div className="prose max-w-none mb-8">
        <h2 className="text-xl font-semibold mb-4">Installation Instructions</h2>
        <p className="mb-4">
          Follow these steps to install and run our script:
        </p>
        <ol className="list-decimal list-inside mb-6">
          <li className="mb-2">Download the script using the button below</li>
          <li className="mb-2">Open your terminal</li>
          <li className="mb-2">Navigate to the download location</li>
          <li className="mb-2">Run the script using: <code>./script.sh</code></li>
        </ol>
      </div>

      <Button 
        onClick={handleDownload}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
      >
        Download Script
      </Button>

      <div className="mt-8 p-4 bg-gray-100 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">System Requirements</h3>
        <ul className="list-disc list-inside">
          <li>Operating System: Linux/MacOS</li>
          <li>Bash Shell</li>
          <li>Required Permissions: Execute</li>
        </ul>
      </div>
    </div>
  )
}