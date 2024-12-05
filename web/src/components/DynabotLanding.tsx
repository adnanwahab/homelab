'use client'
import { useEffect, useState } from 'react';

const DynabotLanding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showIframe, setShowIframe] = useState(false);

  const roles = [
    'robotics engineer.',
    'robotics economist.',
    'robotics operator.',
    'robotics craftsman.',
    'robotics blacksmith.',
    'robotics city builder.'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % roles.length);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleLogin = async () => {
    const res = await fetch('/signup', {
      method: 'POST',
      body: JSON.stringify({ email: '' }), // Modified since input was removed
    });
  };

  return (
    <div id="hideme" className="bg-blue-950 text-white min-h-screen absolute top-0 left-0 w-full h-full z-50 hidden">
      <img id="shit" className="h-full w-full absolute top-0 right-0" width="100%" height="100%" />

      <header className="container mx-auto px-6 py-8">
        <a href="https://dyna-bot.dev">
          <h1 className="text-2xl font-light text-gray-400">dynabot.dev</h1>
        </a>
      </header>

      <main className="container mx-auto px-6 mt-24">
        <h2 className="text-6xl font-semibold mb-12">
          Become a <span id="rotating-role" className="shiny-text roll">
            {roles[currentIndex]}
          </span>
        </h2>

        <p className="text-gray-400 text-2xl max-w-3xl mb-12 leading-relaxed">
          We are building something special so you can build the next generation of robots using
          <a className="shiny-text" href="https://eurekalabs.ai/"> english language</a>
          <a className="shiny-text"> to</a>
          <a className="shiny-text" href="https://worrydream.com/ExplorableExplanations/">
            Explorable Explanation / Diagram generation
          </a>
          . Or <a href="">autonomous systems</a>
        </p>

        <div className="max-w-4xl relative">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 blur-xl"></div>

            <div className="relative flex gap-4 mb-8">
              <button
                onClick={() => window.location.href = '/auth_github'}
                className="bg-white/5 px-6 py-4 rounded-md ring-1 ring-inset ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all flex items-center gap-2"
              >
                Login
              </button>

              {/* <button
                onClick={() => window.location.href = '/auth_github'}
                className="bg-white/5 px-6 py-4 rounded-md ring-1 ring-inset ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all flex items-center gap-2"
              >
                Login with Twitter
              </button> */}

              <button
                onClick={() => document.getElementById('hideme')?.classList.add('hidden')}
                className="bg-white/5 px-6 py-4 rounded-md ring-1 ring-inset ring-white/10 hover:bg-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 transition-all flex items-center gap-2"
              >
                Preview without login
              </button>
            </div>
          </div>

          <iframe
            className={`w-screen h-screen ${showIframe ? '' : 'hidden'}`}
            src="https://roboticsuniversity.observablehq.cloud/dynamicbotnotebook/"
            id="hover-iframe"
          />

          <p className="text-gray-500 mt-4 text-lg">
            To support this project, follow{' '}
            <a className="shiny-text" href="https://twitter.com/dynamicland1">
              @Dynamicland1
            </a>{' '}
            or watch this video{' '}
            <a className="shiny-text" href="https://youtu.be/-80VsIdAHZw?si=hg7SA5rEuf6RJK7V">
              here
            </a>
          </p>
        </div>
      </main>

      <style jsx>{`
        .shiny-text {
          font-weight: bold;
          background: linear-gradient(90deg, #f0f, #0ff, #f0f);
          background-size: 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 5s infinite linear;
        }

        @keyframes shine {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        .roll {
          display: inline-block;
          overflow: hidden;
          vertical-align: top;
        }
      `}</style>
    </div>
  );
};

export default DynabotLanding; 