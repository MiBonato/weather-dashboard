// src/components/MapLocationPicker.jsx
import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// (Optionnel) Fix des icônes par défaut de Leaflet dans certains bundlers
import 'leaflet/dist/leaflet.css';
import iconUrl from 'leaflet/dist/images/marker-icon.png';
import iconRetinaUrl from 'leaflet/dist/images/marker-icon-2x.png';
import shadowUrl from 'leaflet/dist/images/marker-shadow.png';

L.Icon.Default.mergeOptions({
  iconRetinaUrl,
  iconUrl,
  shadowUrl,
});

const ClickHandler = ({ onClick }) => {
  useMapEvents({
    click(e) {
      const { lat, lng } = e.latlng;
      onClick({ lat, lng });
    },
  });
  return null;
};

export const MapLocationPicker = ({
  defaultCenter = { lat: 48.8566, lng: 2.3522 }, // Paris par défaut
  defaultZoom = 5,
  onConfirm,
}) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [label, setLabel] = useState('');

  const handleMapClick = ({ lat, lng }) => {
    setSelectedPosition({ lat, lng });
    // si aucun label saisi, on génère un label simple
    if (!label) {
      setLabel(`Lat ${lat.toFixed(3)}, Lon ${lng.toFixed(3)}`);
    }
  };

  const handleConfirm = () => {
    if (!selectedPosition) return;

    const payload = {
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
      label: label || `Lat ${selectedPosition.lat.toFixed(3)}, Lon ${selectedPosition.lng.toFixed(3)}`,
    };

    onConfirm(payload);
  };

  return (
    <div className="mapLocationPicker">
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={defaultZoom}
        style={{ height: '300px', width: '100%' }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ClickHandler onClick={handleMapClick} />
        {selectedPosition && (
          <Marker position={[selectedPosition.lat, selectedPosition.lng]} />
        )}
      </MapContainer>

      <div className="mapLocationControls">
        {selectedPosition ? (
          <>
            <p className="mapLocationCoords">
              Position sélectionnée :  
              <strong> {selectedPosition.lat.toFixed(4)} / {selectedPosition.lng.toFixed(4)}</strong>
            </p>
            <div className="inputField">
              <label>Nom de la localisation (optionnel)</label>
              <input
                type="text"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="Ex : Bord de mer, Randonnée, etc."
              />
            </div>
            <button type="button" onClick={handleConfirm}>
              Valider cette localisation
            </button>
          </>
        ) : (
          <p className="mapLocationHint">
            Cliquez sur la carte pour choisir un emplacement.
          </p>
        )}
      </div>
    </div>
  );
};
