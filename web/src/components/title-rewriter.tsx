'use client'
import { useEffect, useState } from 'react';


export default function TitleRewriter() {
  const roles = ["city builder", "economist", "operator", "craftsman", "surgeon"];
  const [currentRole, setCurrentRole] = useState(roles[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole(prev => {
        const currentIndex = roles.indexOf(prev);
        return roles[(currentIndex + 1) % roles.length];
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <h1 className="text-white font-display text-balance text-3xl/[0.9] font-medium tracking-tight text-gray-950 sm:text-8xl/[0.8] md:text-9xl/[0.8]">
      Become a<span className="shiny-text"> Robotics</span>
      <br></br>
      <span className="shiny-text">{currentRole}</span>
    </h1>
  );
}