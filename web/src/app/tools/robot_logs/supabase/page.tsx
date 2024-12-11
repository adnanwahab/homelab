"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function Home() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data, error } = await supabase.from('projects').select('*');
    if (error) console.error("Error fetching projects:", error);
    else setProjects(data);
  };

  return (
    <div className="max-w-screen-xl mx-auto px-6 py-12">
      <header className="flex justify-between items-center mb-16">
        <div>
          <h1 className="text-xl font-medium">Dynabot.dev</h1>
          <p className="shiny-text">Robotics, CGI, and Infrastructure.</p>
        </div>
        <nav className="flex gap-6">
          <a href="/tools" className="hover:opacity-70">
            Tools
          </a>
          <a href="/blog" className="hover:opacity-70">
            Blog
          </a>
        </nav>
      </header>

      <main className="grid gap-8">
        {projects.map((project) => (
          <a key={project.id} href={`/project/${project.slug}`} className="block">
            <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
              <img src={project.image_url} className="w-full h-full" alt={project.title} />
            </div>
            <div className="mt-4">
              <h2 className="text-xl font-medium">{project.title}</h2>
              <p className="text-gray-600">{project.description}</p>
            </div>
          </a>
        ))}
      </main>
    </div>
  );
}