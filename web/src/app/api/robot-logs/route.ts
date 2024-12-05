import fs from 'fs';
interface RoombaTurtleData {
    timestamp: string;
    battery: number;
    speed: number;
    temperature: number;
    navigationAccuracy: number;
    obstacleDetections: number;
  }

const generateMockRoombaTurtleData = (count = 50): RoombaTurtleData[] => {
    const data: RoombaTurtleData[] = [];
    const now = new Date();
  
    for (let i = 0; i < count; i++) {
      const timestamp = new Date(now.getTime() - (count - i) * 5 * 60000); // 5-minute intervals
      data.push({
        timestamp: timestamp.toLocaleTimeString(),
        battery: 100 - Math.floor(Math.random() * 20),
        speed: 0.5 + Math.random(), // m/s
        temperature: 22 + Math.random() * 5, // Celsius
        navigationAccuracy: 95 - Math.floor(Math.random() * 10),
        obstacleDetections: Math.floor(Math.random() * 3)
      });
    }
  
    return data;
  };

export async function GET() {
    const data = generateMockRoombaTurtleData();
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
} 