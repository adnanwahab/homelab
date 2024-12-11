// app/page.tsx
'use client';
import { saveAs } from 'file-saver';
export default function DownloadPage() {
  const handleDownload = () => {
    const content = "echo hello tyvm";
    const blob = new Blob([content], { type: 'text/plain' });
    saveAs(blob, 'install.sh');
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <button
        onClick={handleDownload}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Download install.sh
      </button>
    </main>
  );
}