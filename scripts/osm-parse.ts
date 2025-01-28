const bz2FilePath = "/home/adnan/Downloads/planet-241230.osm.bz2";
// parsePlanet.js
import fs from "fs";
import Unbzip2 from "unbzip2-stream";
import sax from "sax";

// Path to your Planet.osm.bz2 file
// Initialize the BZ2 decompressor
const bz2Stream = fs.createReadStream(bz2FilePath).pipe(Unbzip2());

// Initialize the SAX parser
const parser = sax.createStream(true, {});

// Handle XML parsing events
parser.on("opentag", (node) => {
  if (node.name === "node") {
    const nodeId = node.attributes.id;
    const lat = node.attributes.lat;
    const lon = node.attributes.lon;
    // Implement your processing logic here
    // For demonstration, we'll log the node ID
    console.log(`Node ID: ${nodeId}, Lat: ${lat}, Lon: ${lon}`);
  } else if (node.name === "way") {
    const wayId = node.attributes.id;
    // Implement your processing logic here
    console.log(`Way ID: ${wayId}`);
  }
  // Handle other OSM elements as needed
});

parser.on("error", (e) => {
  console.error("Parsing error:", e);
  // Handle errors appropriately
});

parser.on("end", () => {
  console.log("Finished parsing Planet.osm");
});

// Pipe the decompressed stream to the parser
bz2Stream.pipe(parser);
