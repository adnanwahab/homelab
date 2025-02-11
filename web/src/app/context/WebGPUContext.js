// WebGPUContext.js

import React, { createContext, useReducer } from 'react';

// 1) The shape of our global WebGPU state
const initialWebGPUState = {
  device: null,
  // ... any other fields you want to store, e.g. adapter, queue, etc.
};

// 2) Our reducer function
function webgpuReducer(state, action) {
  switch (action.type) {
    case 'SET_DEVICE':
      return {
        ...state,
        device: action.payload,
      };
    default:
      return state;
  }
}

// 3) Create a Context object
export const WebGPUContext = createContext();

// 4) Build a Provider component
export function WebGPUProvider({ children }) {
  const [state, dispatch] = useReducer(webgpuReducer, initialWebGPUState);

  return (
    <WebGPUContext.Provider value={{ state, dispatch }}>
      {children}
    </WebGPUContext.Provider>
  );
}
