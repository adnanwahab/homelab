'use client';

import DeckGL from '@deck.gl/react';
import { LineLayer } from '@deck.gl/layers';
import { Map } from 'react-map-gl';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 
`pk.eyJ1IjoiYXdhaGFiIiwiYSI6ImNrdjc3NW11aTJncmIzMXExcXRiNDNxZWYifQ.tqFU7uVd6mbhHtjYsjtvlg`
import cities from './cities.json';

// const cities = {
//   "cities": [
//     {
//       "name": "New York",
//       "latitude": 40.7128,
//       "longitude": -74.0060
//     },
//     {
//       "name": "San Francisco",
//       "latitude": 37.7749,
//       "longitude": -122.4194
//     },
//     {
//       "name": "Los Angeles",
//       "latitude": 34.0522,
//       "longitude": -118.2437
//     },
//     {
//       "name": "Chicago",
//       "latitude": 41.8781,
//       "longitude": -87.6298
//     },
//     {
//       "name": "Houston",
//       "latitude": 29.7604,
//       "longitude": -95.3698
//     }
//   ],
//   "note": "These coordinates are approximate and can vary slightly by source. They are widely recognized central coordinates to represent each city's general location."
// }


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

// Add interface for City type
interface City {
  name: string;
  latitude: number;
  longitude: number;
}

export default function Home() {
  const [viewState, setViewState] = useState(INITIAL_VIEW_STATE);
  const [selectedCity, setSelectedCity] = useState<City | null>(null);

  const handleCityHover = (city: City | null) => {
    setSelectedCity(city);
    if (city) {
      setViewState({
        ...viewState,
        longitude: city.longitude,
        latitude: city.latitude,
        zoom: 10,
        transitionDuration: 1000
      });
    }
  };

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
          {cities.cities.map((city) => (
            <li 
              key={city.name}
              onMouseEnter={() => handleCityHover(city)}
              onMouseLeave={() => handleCityHover(null)}
              className='text-blue-300'
              style={{
                cursor: 'pointer',
                color: selectedCity?.name === city.name ? '#ff0000' : '#333',
                padding: '5px 0'
              }}
            >
              {city.name}
              {selectedCity?.name === city.name && (
                <div style={{ fontSize: '0.8em', color: '#666' }}>
                  Lat: {city.latitude}, Long: {city.longitude}
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
      <DeckGL
        initialViewState={INITIAL_VIEW_STATE}
        viewState={viewState}
        onViewStateChange={({viewState}) => setViewState(viewState)}
        controller={true}
        layers={[
          new LineLayer({
            id: 'line-layer',
            data: selectedCity ? [{
              sourcePosition: [selectedCity.longitude, selectedCity.latitude],
              targetPosition: [selectedCity.longitude, selectedCity.latitude + 0.1]
            }] : [],
            getWidth: 5,
            getSourcePosition: d => d.sourcePosition,
            getTargetPosition: d => d.targetPosition,
            getColor: [255, 0, 0]
          })
        ]}
      >
        <Map
          mapboxAccessToken={MAPBOX_TOKEN}
          mapStyle="mapbox://styles/mapbox/dark-v9"
        />
      </DeckGL>
    </div>
  );
}