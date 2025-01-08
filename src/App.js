import React from 'react';
import coordinates from './coordinates.js';
import MapComponent from './MapComponent.js';


export default function App() {
  return <MapComponent initialCoordinates={coordinates} />;
}
