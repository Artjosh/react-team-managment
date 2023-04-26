import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Icon } from 'leaflet';

function Mapa(props) {

  const redIcon = new Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  const { lat, lng, zoom } = props;
  const [key, setKey] = useState(0);

  useEffect(() => {
    setKey(key => key + 1);
  }, [lat, lng, zoom]);

  
  return (
    <MapContainer key={key} center={[lat, lng]} zoom={zoom} style={{ height: '100%', width: '100%' }}>
      <TileLayer
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
    </MapContainer>
  );
}

export default Mapa;
