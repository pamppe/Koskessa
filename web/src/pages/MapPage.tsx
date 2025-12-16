import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getSpot } from "../data/spots";
import { getAreaForSpot } from "../data/areas";

// Leaflet marker icon fix
import L from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

export default function MapPage() {
  const { id } = useParams();
  const spot = id ? getSpot(id) : undefined;
  if (!spot) return <div style={{ padding: 16 }}>Kohdetta ei löytynyt.</div>;

  const fc = getAreaForSpot(spot.id);

  return (
    <div style={{ maxWidth: 1000, margin: "0 auto", padding: 16 }}>
      <Link to={`/spot/${spot.id}`}>← Takaisin kohteeseen</Link>
      <h1 style={{ marginTop: 12 }}>{spot.name} – kartta</h1>

      <div style={{ height: 520, borderRadius: 16, overflow: "hidden", border: "1px solid #ddd" }}>
        <MapContainer center={[spot.lat, spot.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[spot.lat, spot.lng]} />
          {fc.features.length > 0 && <GeoJSON data={fc as any} />}
        </MapContainer>
      </div>
    </div>
  );
}
