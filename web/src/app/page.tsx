import Image from "next/image";
import Link from "next/link";

let visualizations = [
  "https://www.jasondavies.com/maps/gingery/thumb.png",
  "https://www.jasondavies.com/maps/zoom/thumb.png",
  "https://www.jasondavies.com/bbp/thumb.png",
  "https://www.jasondavies.com/simplify/thumb.png",
  "https://www.jasondavies.com/maps/circle-tree/thumb.png",
  "https://www.jasondavies.com/poisson-disc/thumb.png",
  "https://www.jasondavies.com/lloyd/thumb.png",
  "https://www.jasondavies.com/power-diagram/thumb.png",
  "https://www.jasondavies.com/voronoi-treemap/thumb.png",
  "https://www.jasondavies.com/rrt/thumb.png",
  "https://www.jasondavies.com/ford-circles/thumb.png",
  "https://www.jasondavies.com/maps/voronoi/mlb/thumb.png",
  "https://www.jasondavies.com/maps/voronoi/capitals/thumb.png",
  "https://www.jasondavies.com/maps/voronoi/us-capitals/thumb.png",
  "https://www.jasondavies.com/maps/voronoi/airports/thumb.png",
  "https://www.jasondavies.com/maps/voronoi/thumb.png",
  "https://www.jasondavies.com/maps/rotate/thumb.png",
  "https://www.jasondavies.com/maps/foucaut/thumb.png",
  "https://www.jasondavies.com/maps/gilbert/thumb.png",
  "https://www.jasondavies.com/maps/interrupted-transverse-mercator/thumb.png",
  "https://www.jasondavies.com/maps/raster/goode/thumb.png",
  "https://www.jasondavies.com/maps/raster/mollweide/thumb.png",
  "https://www.jasondavies.com/maps/raster/satellite/thumb.png",
  "https://www.jasondavies.com/maps/raster/thumb.png",
  "https://www.jasondavies.com/maps/us-rivers/thumb.png",
  "https://www.jasondavies.com/maps/tile/thumb.png",
  "https://www.jasondavies.com/maps/chamberlin-trimetric/thumb.png",
  "https://www.jasondavies.com/eyedropper/thumb.png",
  "https://www.jasondavies.com/maps/airocean/thumb.png",
  "https://www.jasondavies.com/maps/bounds/thumb.png",
  "https://www.jasondavies.com/bullet/thumb.png",
  "https://www.jasondavies.com/maps/north-korea-distance/thumb.png",
  "https://www.jasondavies.com/maps/double-cordiform/thumb.png",
  "https://www.jasondavies.com/maps/sphere-spirals/thumb.png",
  "https://www.jasondavies.com/maps/loxodrome/thumb.png",
  "https://www.jasondavies.com/maps/countries-by-area/thumb.png",
  "https://www.jasondavies.com/maps/polyconic/thumb.png",
  "https://www.jasondavies.com/maps/azimuth-distance/thumb.png",
  "https://www.jasondavies.com/d3-dependencies/thumb.png",
  "https://www.jasondavies.com/maps/peirce/thumb.png",
  "https://www.jasondavies.com/wordtree/thumb.png",
  "https://www.jasondavies.com/maps/bartholomew/thumb.png",
  "https://www.jasondavies.com/maps/spilhaus/16/thumb.png",
  "https://www.jasondavies.com/maps/waterman-butterfly/thumb.png",
  "https://www.jasondavies.com/maps/transition/thumb.png",
  "https://www.jasondavies.com/maps/clip/thumb.png",
  "https://www.jasondavies.com/mekko/thumb.png",
  "https://www.jasondavies.com/maps/antipodes/thumb.png",
  "https://www.jasondavies.com/simplify/koch/thumb.png",
  "https://www.jasondavies.com/maps/random-points/thumb.png",
  "https://www.jasondavies.com/duplicates/thumb.png",
  "https://www.jasondavies.com/factorisation-diagrams/thumb.png",
  "https://www.jasondavies.com/bubbles/thumb.png",
  "https://www.jasondavies.com/set-partitions/thumb.png",
  "https://www.jasondavies.com/primos/thumb.png",
  "https://www.jasondavies.com/plasma/thumb.png",
  "https://www.jasondavies.com/random-arboretum/thumb.png",
  "https://www.jasondavies.com/crayola/thumb.png",
  "https://www.jasondavies.com/parallel-sets/thumb.png",
  "https://www.jasondavies.com/rhodonea/thumb.png",
  "https://www.jasondavies.com/wordcloud/thumb.png",
  "https://www.jasondavies.com/necklaces/thumb.png",
  "https://www.jasondavies.com/bml/thumb.png",
  "https://www.jasondavies.com/9patch/thumb.png",
  "https://www.jasondavies.com/graph-music/thumb.png",
  "https://www.jasondavies.com/planarity/thumb.png",
  "https://www.jasondavies.com/mobile-lawsuits/thumb.png",
  "https://www.jasondavies.com/sunflower-phyllotaxis/thumb.png",
  "https://www.jasondavies.com/girko-circle/thumb.png",
  "https://www.jasondavies.com/calkin-wilf-tree/thumb.png",
  "https://www.jasondavies.com/bloomfilter/thumb.png",
  "https://www.jasondavies.com/carotid/thumb.png",
  "https://www.jasondavies.com/coffee-wheel/thumb.png",
  "https://www.jasondavies.com/17x17/thumb.png",
  "https://www.jasondavies.com/animated-quasicrystals/thumb.png",
  "https://www.jasondavies.com/collatz-graph/thumb.png",
  "https://www.jasondavies.com/hamming-quilt/thumb.png",
  "https://www.jasondavies.com/hilbert-stocks/thumb.png",
  "https://www.jasondavies.com/hilbert-curve/thumb.png",
  "https://www.jasondavies.com/voynich/thumb.png",
  "https://www.jasondavies.com/gaussian-primes/thumb.png",
  "https://www.jasondavies.com/wave/thumb.png",
  "https://www.jasondavies.com/earthquakes/thumb.png",
  "https://www.jasondavies.com/tree-of-life/thumb.png",
  "https://www.jasondavies.com/voroboids/thumb.png",
  "https://www.jasondavies.com/thumbs/rakieandjake.png",
  "https://www.jasondavies.com/animated-bezier/thumb.png",
  "https://www.jasondavies.com/animated-trig/thumb.png",
  "https://www.jasondavies.com/apollonian-gasket/thumb.png",
  "https://www.jasondavies.com/catmap/thumb.png",
  "https://www.jasondavies.com/bifurcation/thumb.png",
  "https://www.jasondavies.com/sorting/thumb.png",
  "https://www.jasondavies.com/complete-graphs/thumb.png",
  "https://www.jasondavies.com/dla/thumb.png",
  "https://www.jasondavies.com/leibniz-spiral/thumb.png",
  "https://www.jasondavies.com/morley-triangle/thumb.png",
  "https://www.jasondavies.com/plants/thumb.png",
  "https://www.jasondavies.com/poincare-disc/thumb.png",
  "https://www.jasondavies.com/pythagoras-proof/thumb.png",
  "https://www.jasondavies.com/random-polygon-ellipse/thumb.png",
  "https://www.jasondavies.com/som/thumb.png",
  "https://www.jasondavies.com/tuebingen/thumb.png",
  "https://www.jasondavies.com/fibonacci/thumb.png",
  "https://www.jasondavies.com/flip/thumb.png",
  "https://www.jasondavies.com/american-forces-in-afghanistan-and-iraq/thumb.png"
].map(url => ({
  src: url,
  href: url.replace('/thumb.png', '').replace('.small.jpg', ''),
  alt: url.split('/').slice(-2)[0].replace('-', ' ').replace('thumb.png', '').replace('.small.jpg', '')
}));



export default function Home() {
  // You could move this to a separate data file
 

  return (
    <div className="max-w-7xl mx-auto px-5">
      <header className="flex justify-between items-center py-8">
        <h1 className="text-5xl font-bold">Adnan Wahab</h1>
      </header>

      <div className="space-y-1 mb-8">
        <Link href="https://twitter.com/dynabot" className="block hover:underline">
          @dynabot
        </Link>
        <Link href="mailto:adnan.f.wahab@gmail.com" className="block hover:underline">
          adnan.f.wahab@gmail.com
        </Link>
        <Link href="https://github.com/adnanwahab" className="block hover:underline">
          github.com/adnanwahab
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
