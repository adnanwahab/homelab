"use client";
import Livekit_Subscriber from "./Livekit_Subscriber";
import Contact_Or_replay_calendar from "./Contact_Or_replay_calendar";

//measure 30% on 3d-annotation - webgpu
//        30% on dynabot - hardware
//        30% on rev - backend

function Show_Five_Desktop_Livekits() {
  return <div>Show_Five_Desktop_Livekits</div>;
}

function Egress_List() {
  return <div>Egress_List</div>;
}

function Twitch_Picker() {
  return <div>Twitch_Picker</div>;
}

export default function Livekit_Desktop_Viewer() {
  return (
    <div>
      Livekit Replay analyzer ---
      <ul>
        <li>[ ] Desktop Viewer current state + prompt</li>
        <li>[ ] react native app</li>
        <li>[ ] replit integration 75mb to 25mb</li>
      </ul>
      <Livekit_Subscriber />
      <DesktopViewer />
      {/* <Contact_Or_replay_calendar /> */}
      <Egress_List />
      <Twitch_Picker />
      <iframe src="/proxy?url=https://threejs.org/examples/css3d_periodictable.html" />
    </div>
  );
}

import { useState } from "react";
import { Maximize2, Minus, X } from "lucide-react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

const Card = ({ children, className = "" }: CardProps) => {
  return (
    <div className={`rounded-lg border bg-white shadow ${className}`}>
      {children}
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader = ({ children, className = "" }: CardHeaderProps) => {
  return (
    <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
      {children}
    </div>
  );
};

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent = ({ children, className = "" }: CardContentProps) => {
  return <div className={`p-6 pt-0 ${className}`}>{children}</div>;
};

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle = ({ children, className = "" }: CardTitleProps) => {
  return (
    <h3
      className={`text-lg font-semibold leading-none tracking-tight ${className}`}
    >
      {children}
    </h3>
  );
};

function Button({ children, className = "" }: ButtonProps) {
  return (
    <button className={`rounded-md bg-blue-500 text-white p-2 ${className}`}>
      {children}
    </button>
  );
}

//can you add simple functions for Card, CardContent, CardHeader, CardTitle and Button in this file
interface Window {
  id: number;
  title: string;
  content: string;
  isMaximized: boolean;
}

function DesktopViewer() {
  const [windows, setWindows] = useState<Window[]>([
    {
      id: 1,
      title: "Window 1",
      content: "Content for window 1",
      isMaximized: false,
    },
    {
      id: 2,
      title: "Window 2",
      content: "Content for window 2",
      isMaximized: false,
    },
    {
      id: 3,
      title: "Window 3",
      content: "Content for window 3",
      isMaximized: false,
    },
    {
      id: 4,
      title: "Window 4",
      content: "Content for window 4",
      isMaximized: false,
    },
    {
      id: 5,
      title: "Window 5",
      content: "Content for window 5",
      isMaximized: false,
    },
  ]);

  const toggleMaximize = (id: number) => {
    setWindows(
      windows.map((window) =>
        window.id === id
          ? { ...window, isMaximized: !window.isMaximized }
          : window,
      ),
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div
        className={`grid gap-4 ${windows.some((w) => w.isMaximized) ? "" : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"}`}
      >
        {windows.map((window) => (
          <Card
            key={window.id}
            className={`${window.isMaximized ? "fixed inset-4 z-50" : "relative"} bg-background shadow-lg transition-all duration-200`}
          >
            <CardHeader className="border-b p-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm font-medium">
                  {window.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6"
                    onClick={() => toggleMaximize(window.id)}
                  >
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="rounded-lg bg-muted p-4">
                <pre className="text-sm">
                  <code>{window.content}</code>
                </pre>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
