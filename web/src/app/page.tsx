import Image from "next/image";
import Link from "next/link";

export default function Home() {
  // You could move this to a separate data file
  const visualizations = Array(12).fill({
    src: "/shit.png",
    alt: "Visualization",
    href: "#"
  });

  return (
    <div className="max-w-7xl mx-auto px-5">
      <header className="flex justify-between items-center py-8">
        <h1 className="text-5xl font-bold">Jason Davies</h1>
      </header>

      <div className="space-y-1 mb-8">
        <Link href="https://twitter.com/jasondavies" className="block hover:underline">
          @jasondavies
        </Link>
        <Link href="mailto:jason@jasondavies.com" className="block hover:underline">
          jason@jasondavies.com
        </Link>
        <Link href="https://github.com/jasondavies" className="block hover:underline">
          github.com/jasondavies
        </Link>
      </div>

      <h2 className="text-2xl font-bold mb-8">Visualisations</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {visualizations.map((viz, index) => (
          <Link href={viz.href} key={index} className="aspect-square relative group">
            <Image
              src={viz.src}
              alt={viz.alt}
              fill
              className="object-cover transition-opacity group-hover:opacity-80"
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          </Link>
        ))}
      </div>
    </div>
  );
}
