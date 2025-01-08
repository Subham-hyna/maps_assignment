import React from 'react';
import MapComponent from './MapComponent.js';
import coordinates from './coordinates.js';


export default function App() {
  return <MapComponent coordinates={coordinates} />;
}
