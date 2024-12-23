"use client"
import React, { useRef } from 'react';

import { cool_beans } from './multi_editor';

export default function Editor(props) {
  const url = "https://raw.githubusercontent.com/adnanwahab/homelab/refs/heads/main/music_game/src/SimpleCube.js"
  const editorRef = useRef(null);
  const [fileContent, setFileContent] = React.useState('');

  React.useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Failed to fetch file content');
        const text = await response.text();
        setFileContent(text);
      } catch (error) {
        console.error('Error fetching file:', error);
      }
    };
    fetchContent();
  }, []);

  if (props.draft) {
    return <div>{props.draft}</div>;
  }

  const execCmd = (cmd) => {
    document.execCommand(cmd, false, null);
    editorRef.current.focus();
  };

  const handleChange = async (e: React.FormEvent<HTMLDivElement>) => {
    console.log("handleChange");
    if (!editorRef.current) return;
    
    const content = editorRef.current.innerHTML;
    try {
      const response = await fetch('/api/file-writer', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save changes');
      }
    } catch (error) {
      console.error('Failed to save changes:', error);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Toolbar */}
      <div className="flex space-x-2 p-2 bg-gray-800 border-b border-gray-700">
        <button 
          onClick={() => execCmd('bold')}
          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600"
        >
          B
        </button>
        <button 
          onClick={() => execCmd('italic')}
          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 italic"
        >
          I
        </button>
        <button 
          onClick={() => execCmd('underline')}
          className="px-2 py-1 bg-gray-700 rounded hover:bg-gray-600 underline"
        >
          U
        </button>
      </div>

      {/* Editable Area */}
      <div 
        ref={editorRef}
        className="flex-1 p-4 overflow-auto text-gray-100 bg-gray-900 focus:outline-none leading-relaxed"
        contentEditable
        suppressContentEditableWarning
        onInput={handleChange}
      >
        {fileContent || (
          <>
            <h2 className="text-xl font-bold mb-4">Edit This Text</h2>
            <p>Loading content...</p>
          </>
        )}
      </div>
    </div>
  );
}