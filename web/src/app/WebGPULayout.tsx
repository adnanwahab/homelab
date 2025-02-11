'use client'; // so we can use the WebGPUProvider (a client context)

import React from 'react';
import { WebGPUProvider } from './context/WebGPUContext';

export default function WebGPULayout({ children }: { children: React.ReactNode }) {
  return (
    <WebGPUProvider>
      {children}
    </WebGPUProvider>
  );
}
