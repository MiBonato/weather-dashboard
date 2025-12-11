import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import L from 'leaflet';

// Fix import icônes
import 'leaflet/dist/leaflet.css';
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix URL icônes Leaflet
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
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
  defaultCenter = { lat: 38.8226, lng: -38.2324 },
  defaultZoom = 2,
  onConfirm,
}) => {
  const [selectedPosition, setSelectedPosition] = useState(null);
  const [label, setLabel] = useState('');

  const handleMapClick = ({ lat, lng }) => {
    setSelectedPosition({ lat, lng });

    // Si aucun label n'est encore saisi, on pré-remplit avec Lat/Lon
    if (!label.trim()) {
      setLabel(`Lat ${lat.toFixed(3)}, Lon ${lng.toFixed(3)}`);
    }
  };

  const handleLabelChange = (e) => {
    setLabel(e.target.value);
  };

  const handleConfirm = () => {
    if (!selectedPosition) return;

    const payload = {
      latitude: selectedPosition.lat,
      longitude: selectedPosition.lng,
      label:
        label && label.trim().length > 0
          ? label
          : `Lat ${selectedPosition.lat.toFixed(3)}, Lon ${selectedPosition.lng.toFixed(3)}`,
    };

    onConfirm(payload);
  };

  return (
    <div
      className="mapLocationPicker"
      onClick={(e) => e.stopPropagation()} // Empêche la fermeture de la modale
    >
      <MapContainer
        center={[defaultCenter.lat, defaultCenter.lng]}
        zoom={defaultZoom}
        style={{ height: '400px', width: '100%' }}
      >
        <TileLayer
          attribution="© OpenStreetMap contributors"
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
              Coordonnées : {selectedPosition.lat.toFixed(4)} - {selectedPosition.lng.toFixed(4)}
            </p>

            <div className="mapLocationForm flex s-row">
              <div className="inputField mapLocationInput w-66">
                <input
                  id="localisationMap"
                  type="text"
                  value={label}
                  onChange={handleLabelChange}
                  placeholder="Entrez un nom"
                />
                <label htmlFor="localisationMap">Nom de la localisation</label>
              </div>

              <div className="mapLocationBtn w-33 flex s-col jc-end">
                <button type="button" onClick={handleConfirm}>
                  Ajouter
                </button>
              </div>
            </div>
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
