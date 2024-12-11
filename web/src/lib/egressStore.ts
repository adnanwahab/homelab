// lib/egressStore.ts

type EgressFile = {
  roomName: string;
  fileUrl: string;
  startedAt: number;
  endedAt: number;
};

const egressFiles: EgressFile[] = [];

export function addEgressFile(file: EgressFile) {
  egressFiles.push(file);
}

export function getEgressFiles() {
  return egressFiles;
}