// ParentComponent.tsx
'use client';
import React, { useState, useEffect } from 'react';
import WebGPUPoints from './WebGPUPoints'; // The child

export default function ParentComponent() {
  const [device, setDevice] = useState<GPUDevice | null>(null);

  useEffect(() => {
    let isMounted = true;
    async function initWebGPU() {
      if (!navigator.gpu) {
        console.error('WebGPU not supported.');
        return;
      }
      const adapter = await navigator.gpu.requestAdapter();
      if (!adapter) {
        console.error('Failed to get GPU adapter.');
        return;
      }
      const device = await adapter.requestDevice();
      if (isMounted) {
        setDevice(device);
      }
    }

    initWebGPU();
    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div>
      {/* Pass the device down as a prop to your WebGPUPoints component */}
      <WebGPUPoints device={device} />
    </div>
  );
}
