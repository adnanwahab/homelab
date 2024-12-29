import fs from "fs";
import * as THREE from "three";
import { GLTFExporter } from "three/examples/jsm/exporters/GLTFExporter";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const DATA_FOLDER = "./data";
const OUTPUT_BUCKET = "your-output-bucket";

// AWS S3 client setup
const s3Client = new S3Client({
  region: "your-region",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

function createThreeJsVisualization(imagePath: string): THREE.Scene {
  const scene = new THREE.Scene();
  
  // Load image texture
  const texture = new THREE.TextureLoader().load(imagePath);
  
  // Create a plane geometry with the image
  const geometry = new THREE.PlaneGeometry(1, 1);
  const material = new THREE.MeshBasicMaterial({ 
    map: texture,
    side: THREE.DoubleSide 
  });
  const plane = new THREE.Mesh(geometry, material);
  scene.add(plane);

  // Add ambient light
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  return scene;
}

async function exportSceneToGLTF(scene: THREE.Scene): Promise<ArrayBuffer> {
  const exporter = new GLTFExporter();
  return new Promise((resolve, reject) => {
    exporter.parse(
      scene,
      (gltf) => resolve(gltf as ArrayBuffer),
      (error) => reject(error),
      { binary: true }
    );
  });
}

async function processImages() {
  const files = fs.readdirSync(DATA_FOLDER);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );

  for (const imageFile of imageFiles) {
    const imagePath = `${DATA_FOLDER}/${imageFile}`;
    
    // Create Three.js visualization
    const scene = createThreeJsVisualization(imagePath);
    
    // Export to GLTF
    const gltfBuffer = await exportSceneToGLTF(scene);
    
    // Upload to S3
    const outputKey = `visualizations/${imageFile.replace(/\.[^/.]+$/, ".glb")}`;
    
    await s3Client.send(new PutObjectCommand({
      Bucket: OUTPUT_BUCKET,
      Key: outputKey,
      Body: Buffer.from(gltfBuffer),
      ContentType: "model/gltf-binary"
    }));

    console.log(`Processed and uploaded: ${imageFile}`);
  }
}

// Run the processor
processImages().catch(console.error);

