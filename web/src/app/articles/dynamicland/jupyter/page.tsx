import React from 'react';
import ModeSelector from '../ModeSelector'

export default function Jupyter() {
  return (
    <>
      <div>Jupyter</div>
      <iframe src="https://jupyter.hashirama.blog"></iframe>
      <ModeSelector />
    </>
  );
}

