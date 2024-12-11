import * as THREE from "three";

class MockJoltPhysics {
  addScene(scene: any) {
    // Mock implementation - just store the scene if needed
    console.log("Mock physics: Scene added");
  }

  setMeshPosition(mesh: any, position: any, index: number) {
    // Update the instance matrix for the given mesh
    const matrix = new THREE.Matrix4();
    matrix.setPosition(position.x, position.y, position.z);
    mesh.setMatrixAt(index, matrix);
    mesh.instanceMatrix.needsUpdate = true;
  }
}

export default async function JoltPhysics() {
  console.log("Initializing mock physics engine");
  return new MockJoltPhysics();
} 