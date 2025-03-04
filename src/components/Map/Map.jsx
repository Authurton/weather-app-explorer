import React, { useContext } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { ThemeContext } from '../../contexts/ThemeContext';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import './Map.css';

// Fix for Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map events
function MapEventHandler({ onLocationSelect }) {
  useMapEvents({
    click: (e) => {
      onLocationSelect(e.latlng);
    },
  });
  return null;
}

const Map = ({ center, zoom, selectedLocation, onLocationSelect }) => {
  console.log("Map component rendered");
  const { isDarkMode } = useContext(ThemeContext);
  console.log("Map center:", center, "Zoom level:", zoom);
  
  // Choose map tile layer based on theme
  const tileLayerUrl = isDarkMode
    ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
    : 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  
  const tileLayerAttribution = isDarkMode
    ? '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
    : '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    

  return (
    <div className="map-container">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        scrollWheelZoom={true}
        className="map"
      >
        <TileLayer
          attribution={tileLayerAttribution}
          url={tileLayerUrl}
        />
        <MapEventHandler onLocationSelect={onLocationSelect} />
        
        {selectedLocation && (
          <Marker position={[selectedLocation.lat, selectedLocation.lng]} />
        )}
      </MapContainer>
    </div>
  );
};

export default Map;