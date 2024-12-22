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
    <div style={{ width: '100vw', height: '100vh' }}>
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