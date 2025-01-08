import React, { useState, useEffect }  from 'react'
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';

const mapContainerStyle = { width: "100vw", height: "100vh" };
const center = { lat: 39.8283, lng: -98.5795 }; // Geographic center of the USA

// USA bounds
const usaBounds = {
    north: 49.3457868, // Northernmost latitude
    south: 24.396308,  // Southernmost latitude
    west: -125.0,      // Westernmost longitude
    east: -66.93457    // Easternmost longitude
  };
  
  // Helper function to check if a coordinate is within USA bounds
  const isWithinUSA = ({ latitude, longitude }) => {
    return (
      latitude <= usaBounds.north &&
      latitude >= usaBounds.south &&
      longitude >= usaBounds.west &&
      longitude <= usaBounds.east
    );
  };

  function MapComponent({ initialCoordinates }) {
    const [filteredCoordinates, setFilteredCoordinates] = useState([]);
    const [userAddedCoordinates, setUserAddedCoordinates] = useState([]);
    const [selected, setSelected] = useState(null);
    const [newCoord, setNewCoord] = useState({ latitude: '', longitude: '' });
  
    useEffect(() => {
      // Filter coordinates to include only those within the USA
      const usaCoordinates = initialCoordinates.filter(isWithinUSA);
      setFilteredCoordinates(usaCoordinates);
    }, [initialCoordinates]);
  
    const handleMarkerClick = async (lat, lng) => {
      // Reverse geocoding to fetch city and state
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=AIzaSyDLePgyuF75qFDA2iu8I0KdlNECMg7ocgA`
      );
      const data = await response.json();
      const location = data.results[0]?.address_components;
      const city = location.find((comp) => comp.types.includes('locality'))?.long_name || 'Unknown';
      const state = location.find((comp) => comp.types.includes('administrative_area_level_1'))?.long_name || 'Unknown';
  
      setSelected({ lat, lng, city, state });
    };
  
    const handleInputChange = (e) => {
      const { name, value } = e.target;
      setNewCoord((prev) => ({ ...prev, [name]: value }));
    };
  
    const handleAddMarker = () => {
      const latitude = parseFloat(newCoord.latitude);
      const longitude = parseFloat(newCoord.longitude);
      if (isNaN(latitude) || isNaN(longitude)) {
        alert("Please enter valid numeric values for latitude and longitude.");
        return;
      }
  
      if (!isWithinUSA({ latitude, longitude })) {
        alert("The coordinates must be within the USA.");
        return;
      }
  
      setUserAddedCoordinates([...userAddedCoordinates, { latitude, longitude }]);
      setNewCoord({ latitude: '', longitude: '' });
    };
  
    return (
      <>
        <div style={{ padding: '10px', background: '#f4f4f4', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <input
            type="text"
            name="latitude"
            value={newCoord.latitude}
            placeholder="Enter latitude"
            onChange={handleInputChange}
            style={{ padding: '5px', width: '100px' }}
          />
          <input
            type="text"
            name="longitude"
            value={newCoord.longitude}
            placeholder="Enter longitude"
            onChange={handleInputChange}
            style={{ padding: '5px', width: '100px' }}
          />
          <button onClick={handleAddMarker} style={{ padding: '5px 10px' }}>Add Marker</button>
        </div>
        <LoadScript googleMapsApiKey="AIzaSyDLePgyuF75qFDA2iu8I0KdlNECMg7ocgA">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={4}>
            {/* Default markers */}
            {filteredCoordinates.map((coord, index) => (
              <Marker
                key={index}
                position={{ lat: coord.latitude, lng: coord.longitude }}
                onClick={() => handleMarkerClick(coord.latitude, coord.longitude)}
              />
            ))}
  
            {/* User-added markers with a unique icon */}
            {userAddedCoordinates.map((coord, index) => (
              <Marker
                key={`user-${index}`}
                position={{ lat: coord.latitude, lng: coord.longitude }}
                icon={{
                  url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png", // Unique icon for user-added markers
                }}
                onClick={() => handleMarkerClick(coord.latitude, coord.longitude)}
              />
            ))}
  
            {selected && (
              <InfoWindow position={{ lat: selected.lat, lng: selected.lng }} onCloseClick={() => setSelected(null)}>
                <div>
                  <p>City: {selected.city}</p>
                  <p>State: {selected.state}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      </>
    );
  }

export default MapComponent