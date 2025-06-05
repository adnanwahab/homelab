'use client'; // important so React context can be used on the client

import React, { createContext, useReducer } from 'react';

// 1) The initial state shape
const initialWebGPUState = {
  device: null,
};

// 2) A simple reducer
function webgpuReducer(state, action) {
  switch (action.type) {
    case 'SET_DEVICE':
      return { ...state, device: action.payload };
    default:
      return state;
  }
}

// Create the context
export const WebGPUContext = createContext();

// The provider
export function WebGPUProvider({ children }) {
  const [state, dispatch] = useReducer(webgpuReducer, initialWebGPUState);
  return (
    <WebGPUContext.Provider value={{ state, dispatch }}>
      {children}
    </WebGPUContext.Provider>
  );
}
