export default function TailwindPerspectiveDemo() {
  return (
    <main className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">Tailwind 4.0 Perspective Demo</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* Dramatic Perspective */}
        <div className="flex flex-col items-center">
          <h2 className="mb-4 font-mono text-sm text-gray-500 dark:text-gray-400">
            perspective-dramatic
          </h2>
          <div className="size-56 p-10 py-24">
            <div className="size-20 rotate-[0.75_1_0.75_45deg] perspective-dramatic transform-3d *:backface-visible">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i + 1}
                  className={`
                    absolute inset-0 
                    bg-sky-300/75 dark:bg-sky-400/85
                    text-center text-4xl leading-20 font-bold
                    text-sky-900 dark:text-white
                    ${i === 0 ? 'translate-z-12 rotate-x-0' :
                      i === 1 ? '-translate-z-12 rotate-y-180 opacity-75' :
                      i === 2 ? 'translate-x-12 rotate-y-90 opacity-75' :
                      i === 3 ? '-translate-x-12 -rotate-y-90' :
                      i === 4 ? '-translate-y-12 rotate-x-90 opacity-75' :
                      'translate-y-12 -rotate-x-90'}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Normal Perspective */}
        <div className="flex flex-col items-center">
          <h2 className="mb-4 font-mono text-sm text-gray-500 dark:text-gray-400">
            perspective-normal
          </h2>
          <div className="size-56 p-10">
            <div className="size-20 rotate-[0.75_1_0.75_45deg] perspective-normal transform-3d *:backface-visible">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i + 1}
                  className={`
                    absolute inset-0 
                    bg-sky-300/75 dark:bg-sky-400/85
                    text-center text-4xl leading-20 font-bold
                    text-sky-900 dark:text-white
                    ${i === 0 ? 'translate-z-12 rotate-x-0' :
                      i === 1 ? '-translate-z-12 rotate-y-180 opacity-75' :
                      i === 2 ? 'translate-x-12 rotate-y-90 opacity-75' :
                      i === 3 ? '-translate-x-12 -rotate-y-90' :
                      i === 4 ? '-translate-y-12 rotate-x-90 opacity-75' :
                      'translate-y-12 -rotate-x-90'}
                  `}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}