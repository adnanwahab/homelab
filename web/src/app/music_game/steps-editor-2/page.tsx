"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
//import { iterateSteps } from '../actions/iterate-steps'
import { clsx } from "clsx";
import React from "react";
import SimpleThreeDemo from "./SimpleThreeDemo";

const initialCode = `
export default function Page() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Hello, World!</h1>
      <p>This is a sample page. Edit the code on the left to see changes.</p>
    </div>
  )
}
`;

function CodeEditor() {
  const [code, setCode] = useState(initialCode);

  return (
    <div className="w-1/2 h-full border-r border-gray-200 dark:border-gray-800">
      <textarea
        className="w-full h-full p-4 font-mono text-sm bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 resize-none"
        value={code}
        onChange={(e) => setCode(e.target.value)}
      />
    </div>
  );
}

function Preview() {
  return (
    <div className="w-1/2 h-full">
      <h1>Preview</h1>
      {/* <iframe  width="100%" height="100%" src="https://threejs.org/examples/?q=physics#physics_ammo_break"/> */}

      {/* <iframe src="https://www.dynabot.dev/articles/dynamicland/game/page.tsx" width="100%" height="100%"></iframe> */}
      <SimpleThreeDemo />
    </div>
  );
}

export default function Home() {
  return (
    <div className="flex h-screen">
      <CodeEditor />
      <Preview />
    </div>
  );
}
