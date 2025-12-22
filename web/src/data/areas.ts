import geo from "../assets/data/spot-areas.json";

type AreaProps = { spotId: string; name?: string };
type AreaFC = GeoJSON.FeatureCollection<GeoJSON.Geometry, AreaProps>;

export const areas = geo as AreaFC;

export const getAreaForSpot = (spotId: string): AreaFC => {
  const features = areas.features.filter((f) => f.properties?.spotId === spotId);
  return { type: "FeatureCollection", features };
};

// Palauttaa [lat, lng] marker/center käyttöön
export const getFocusLatLngForSpot = (spotId: string): [number, number] | null => {
  const fc = getAreaForSpot(spotId);
  if (!fc.features.length) return null;

  const geom = fc.features[0].geometry;
  if (!geom) return null;

  // GeoJSON = [lng, lat]
  const toLatLng = (c: number[]) => [c[1], c[0]] as [number, number];

  if (geom.type === "Point") {
    return toLatLng(geom.coordinates as any);
  }

  if (geom.type === "LineString") {
    const coords = geom.coordinates as unknown as number[][];
    const mid = coords[Math.floor(coords.length / 2)];
    return toLatLng(mid);
  }

  if (geom.type === "Polygon") {
    const ring = (geom.coordinates as unknown as number[][][])[0];
    // yksinkertainen keskipiste bboxista
    let minLng = Infinity, maxLng = -Infinity, minLat = Infinity, maxLat = -Infinity;
    for (const [lng, lat] of ring) {
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
    }
    return [(minLat + maxLat) / 2, (minLng + maxLng) / 2];
  }

  return null;
};
