'use client'
import { useState } from 'react';
import type { Page } from '@playwright/test';
import fs from 'fs';

// Define the types for our automation steps
type AutomationStep = {
  type: 'text' | 'button';
  value: string;
  timestamp: number;
};

type SavedAutomation = {
  name: string;
  steps: AutomationStep[];
  createdAt: string;
};

export default function PlaywrightControl() {
  const [prompt, setPrompt] = useState('');
  const [status, setStatus] = useState<string>('');
  const [isRunning, setIsRunning] = useState(false);
  const [currentSteps, setCurrentSteps] = useState<AutomationStep[]>([]);

  const processUserPrompt = (userInput: string) => {
    // Simple NLP-like processing
    const input = userInput.toLowerCase();
    const step: AutomationStep = {
      timestamp: Date.now(),
      type: 'text',
      value: ''
    };

    if (input.includes('click') || input.includes('press')) {
      step.type = 'button';
      // Extract the button text - assuming it's in quotes
      const match = userInput.match(/"([^"]+)"/);
      step.value = match ? match[1] : userInput.split(' ').slice(-1)[0];
    } else if (input.includes('type') || input.includes('enter')) {
      step.type = 'text';
      // Extract the text to type - assuming it's in quotes
      const match = userInput.match(/"([^"]+)"/);
      step.value = match ? match[1] : userInput.split(' ').slice(1).join(' ');
    }

    return step;
  };

  const saveAutomation = async (name: string) => {
    const automation: SavedAutomation = {
      name,
      steps: currentSteps,
      createdAt: new Date().toISOString()
    };

    try {
      const filePath = `./automations/${name}.json`;
      fs.writeFileSync(filePath, JSON.stringify(automation, null, 2));
      setStatus(`Automation saved to ${filePath}`);
    } catch (error) {
      setStatus(`Error saving automation: ${error.message}`);
    }
  };

  const handlePromptSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    const step = processUserPrompt(prompt);
    setCurrentSteps([...currentSteps, step]);
    setStatus(`Added step: ${JSON.stringify(step)}`);
    setPrompt('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Playwright Automation REPL</h1>
      
      <form onSubmit={handlePromptSubmit} className="mb-4">
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Type your command (e.g., 'click "Send"' or 'type "Hello world"')"
          className="w-full p-2 border rounded"
        />
      </form>

      <div className="mb-4">
        <h2 className="font-semibold mb-2">Current Steps:</h2>
        <pre className="bg-gray-100 p-2 rounded">
          {JSON.stringify(currentSteps, null, 2)}
        </pre>
      </div>

      <div className="flex gap-2 mb-4">
        <button
          onClick={() => saveAutomation('automation-' + Date.now())}
          disabled={currentSteps.length === 0}
          className="bg-green-500 text-white px-4 py-2 rounded disabled:bg-gray-400"
        >
          Save Automation
        </button>
        <button
          onClick={() => setCurrentSteps([])}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Clear Steps
        </button>
      </div>

      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold">Status:</h2>
        <p>{status}</p>
      </div>
    </div>
  );
}