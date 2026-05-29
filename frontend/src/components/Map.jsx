import { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Leaflet's default icon path issues with Vite bundling
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerIconRetina from 'leaflet/dist/images/marker-icon-2x.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: markerIcon,
  iconRetinaUrl: markerIconRetina,
  shadowUrl: markerShadow,
});

export default function Map({ 
  center = [20.5937, 78.9629], // Default: Center of India
  zoom = 5, 
  markers = [], 
  onMapClick = null, 
  isEditable = false 
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markersGroupRef = useRef(null);
  const clickMarkerRef = useRef(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Map
    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: true
    }).setView(center, zoom);

    mapRef.current = map;

    // Add Premium looking map tiles (CartoDB Positron style is cleaner for dashboards)
    L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 20
    }).addTo(map);

    // Create a LayerGroup to manage markers easily
    markersGroupRef.current = L.layerGroup().addTo(map);

    // Handle Click if editable
    if (isEditable && onMapClick) {
      map.on('click', (e) => {
        const { lat, lng } = e.latlng;
        
        // Remove previous click marker
        if (clickMarkerRef.current) {
          clickMarkerRef.current.remove();
        }

        // Add a new click marker
        clickMarkerRef.current = L.marker([lat, lng], {
          icon: L.icon({
            iconUrl: markerIcon,
            iconRetinaUrl: markerIconRetina,
            shadowUrl: markerShadow,
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41]
          })
        })
        .addTo(map)
        .bindPopup('<b>Selected Location</b><br>Coordinates captured!')
        .openPopup();

        onMapClick(lat, lng);
      });
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, [isEditable, onMapClick]);

  // Sync Markers when props change
  useEffect(() => {
    const map = mapRef.current;
    const markersGroup = markersGroupRef.current;
    
    if (!map || !markersGroup) return;

    // Clear old markers
    markersGroup.clearLayers();
    if (clickMarkerRef.current) {
      clickMarkerRef.current.remove();
      clickMarkerRef.current = null;
    }

    if (markers.length === 0) return;

    const bounds = [];

    markers.forEach(m => {
      if (!m.lat || !m.lng) return;

      const marker = L.marker([m.lat, m.lng]).addTo(markersGroup);
      
      if (m.popupContent) {
        // Create custom styled popup for premium look
        const popupOption = {
          className: 'custom-map-popup',
          maxWidth: 280
        };
        marker.bindPopup(m.popupContent, popupOption);
      }

      bounds.push([m.lat, m.lng]);
    });

    // Auto-fit view to bounds if we have markers
    if (bounds.length > 0) {
      if (bounds.length === 1) {
        map.setView(bounds[0], 12);
      } else {
        map.fitBounds(bounds, { padding: [50, 50], maxZoom: 12 });
      }
    }
  }, [markers]);

  return (
    <div className="relative w-full h-full min-h-[350px] overflow-hidden rounded-3xl border border-gray-100 shadow-lg">
      <div ref={mapContainerRef} className="w-full h-full" style={{ minHeight: '350px' }} />
      {isEditable && (
        <div className="absolute bottom-4 left-4 z-[1000] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm text-[11px] font-bold text-primary pointer-events-none uppercase tracking-wider">
          📍 Click on the map to drop pin
        </div>
      )}
    </div>
  );
}
