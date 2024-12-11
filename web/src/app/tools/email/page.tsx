'use client'

import { useState, useEffect } from 'react'

export default function Page() {
    const [text, setText] = useState('')
    const [savedPastes, setSavedPastes] = useState<{id: string, content: string, timestamp: number}[]>([])

    useEffect(() => {
        const stored = localStorage.getItem('pastes')
        if (stored) {
            setSavedPastes(JSON.parse(stored))
        }
    }, [])

    const savePaste = () => {
        if (!text.trim()) return
        
        const newPaste = {
            id: crypto.randomUUID(),
            content: text,
            timestamp: Date.now()
        }
        
        const updatedPastes = [newPaste, ...savedPastes]
        localStorage.setItem('pastes', JSON.stringify(updatedPastes))
        setSavedPastes(updatedPastes)
        setText('')
    }

    const deletePaste = (id: string) => {
        const filtered = savedPastes.filter(paste => paste.id !== id)
        localStorage.setItem('pastes', JSON.stringify(filtered))
        setSavedPastes(filtered)
    }

    return (
        <div className="p-4 max-w-3xl mx-auto">
            <h1 className="text-2xl font-bold mb-4">Simple Pastebin</h1>
            
            <div className="mb-4">
                <textarea 
                    className="w-full h-32 p-2 border rounded"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Enter your text here..."
                />
                <button 
                    onClick={savePaste}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Save Paste
                </button>
            </div>

            <div className="space-y-4">
                {savedPastes.map(paste => (
                    <div key={paste.id} className="p-4 border rounded">
                        <div className="flex justify-between items-start mb-2">
                            <span className="text-sm text-gray-500">
                                {new Date(paste.timestamp).toLocaleString()}
                            </span>
                            <button 
                                onClick={() => deletePaste(paste.id)}
                                className="text-red-500 hover:text-red-600"
                            >
                                Delete
                            </button>
                        </div>
                        <pre className="whitespace-pre-wrap">{paste.content}</pre>
                    </div>
                ))}
            </div>
        </div>
    )
}