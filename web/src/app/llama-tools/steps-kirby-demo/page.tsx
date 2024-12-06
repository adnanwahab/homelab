import React from "react";

const Card = ({ children, className = "" }) => (
  <div className={`bg-white rounded-lg shadow-md overflow-hidden ${className}`}>
    {children}
  </div>
);

const VisualizationGrid = () => {
  const images = [
    { id: 1, title: "Flower Map Projection", width: 400, height: 400 },
    { id: 2, title: "Globe Visualization", width: 400, height: 400 },
    { id: 3, title: "Noise Pattern", width: 400, height: 200 },
    { id: 4, title: "Country Outline", width: 400, height: 400 },
    { id: 5, title: "Wave Pattern", width: 400, height: 400 },
    { id: 6, title: "Dot Pattern", width: 400, height: 200 },
    { id: 7, title: "Honeycomb", width: 400, height: 200 },
    { id: 8, title: "Network Graph", width: 400, height: 200 },
    { id: 9, title: "Voronoi Diagram", width: 400, height: 300 },
    { id: 10, title: "Fractal Pattern", width: 400, height: 200 },
    { id: 11, title: "Fraction Visualization", width: 400, height: 200 },
    { id: 12, title: "US Map", width: 400, height: 300 },
    { id: 13, title: "Globe Detail", width: 400, height: 300 },
    { id: 14, title: "Terrain Map", width: 400, height: 300 },
    { id: 15, title: "Geographic Projection", width: 400, height: 300 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Visualizations</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {images.map((image) => (
          <Card key={image.id} className="overflow-hidden">
            <img
              src={`/api/placeholder/${image.width}/${image.height}`}
              alt={image.title}
              className="w-full h-auto object-cover"
            />
            <div className="p-2">
              <p className="text-sm text-gray-600">{image.title}</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default VisualizationGrid;
