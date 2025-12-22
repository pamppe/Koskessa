import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, GeoJSON, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getSpot } from "../data/spots";
import { getAreaForSpot, getFocusLatLngForSpot } from "../data/areas";
import PageContainer from "../components/PageContainer";

import L from "leaflet";
import type { LatLngExpression } from "leaflet";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

// Leaflet marker icon fix
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow
});

function FitToGeoJson({ fc }: { fc: GeoJSON.FeatureCollection }) {
  const map = useMap();

  useEffect(() => {
    if (!fc.features.length) return;
    const layer = L.geoJSON(fc as any);
    const bounds = layer.getBounds();
    if (bounds.isValid()) map.fitBounds(bounds, { padding: [20, 20] });
  }, [fc, map]);

  return null;
}

export default function MapPage() {
  const { id } = useParams();
  const spot = id ? getSpot(id) : undefined;
  if (!spot) return <div style={{ padding: 16 }}>Kohdetta ei löytynyt.</div>;

  const fc = getAreaForSpot(spot.id);

  // ensisijaisesti GeoJSONista (jotta marker osuu line/polygon kanssa samaan)
  const focus = getFocusLatLngForSpot(spot.id);
  const center: LatLngExpression = focus ?? [spot.lat, spot.lng];

  return (
    <PageContainer>
      <Link to={`/spot/${spot.id}`}>← Takaisin kohteeseen</Link>
      <h1 style={{ marginTop: 12 }}>{spot.name} – kartta</h1>

      <div style={{ height: 520, borderRadius: 16, overflow: "hidden", border: "1px solid #ddd" }}>
        <MapContainer center={center} zoom={13} style={{ height: "100%", width: "100%" }}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker position={center} />

          {fc.features.length > 0 && (
            <>
              <FitToGeoJson fc={fc} />
              <GeoJSON data={fc} />
            </>
          )}
        </MapContainer>
      </div>
    </PageContainer>
  );
}
