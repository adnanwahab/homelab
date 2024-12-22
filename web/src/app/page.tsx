'use client';

import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 
`pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNrdjc3NW11aTJncmIzMXExcXRiNDNxZWYifQ.tqFU7uVd6mbhHtjYsjtvlg`

//process.env.NEXT_PUBLIC_MAPBOX_TOKEN;

// Initial viewport settings
const INITIAL_VIEW_STATE = {
  longitude: -122.41669,
  latitude: 37.7853,
  zoom: 13,
  pitch: 0,
  bearing: 0
};

// Sample data - replace with your actual data
const DATA = [
  {
    sourcePosition: [-122.41669, 37.7853],
    targetPosition: [-122.41669, 37.8053]
  }
];



export default function Home() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);

  const layers = [
    new LineLayer({
      id: 'line-layer',
      data: DATA,
      getWidth: 5,
      getSourcePosition: d => d.sourcePosition,
      getTargetPosition: d => d.targetPosition,
      getColor: [255, 0, 0]
    })
  ];

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      <div style={{ 
        position: 'absolute', 
        top: 0,
        left: 0,
        zIndex: 1,
        background: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h1>Cities</h1>
        <ul>
          <li>New York</li>
          <li>San Francisco</li>
          <li>Los Angeles</li>
          <li>Chicago</li>
          <li>Houston</li>
        </ul>
      </div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        controller={true}
        layers={layers}
      >
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        />
      </DeckGL>
    </div>
  );
}