export type LatLng = { latitude: number; longitude: number };

type AnyFeature = GeoJSON.Feature<GeoJSON.Geometry, any>;
type AnyFC = GeoJSON.FeatureCollection<GeoJSON.Geometry, any>;

const toLatLng = ([lng, lat]: number[]): LatLng => ({ latitude: lat, longitude: lng });

export function getFeaturesForSpot(fc: AnyFC, spotId: string): AnyFeature[] {
  return (fc.features || []).filter((f) => f?.properties?.spotId === spotId);
}

export function featureToCoordinates(feature: AnyFeature): LatLng[] {
  const g = feature.geometry;
  if (!g) return [];

  if (g.type === "LineString") {
    return (g.coordinates as number[][]).map(toLatLng);
  }

  if (g.type === "Polygon") {
    // RN Maps Polygon tarvitsee yhden "ringin" koordinaatteja
    const ring = (g.coordinates as number[][][])[0] ?? [];
    return ring.map(toLatLng);
  }

  if (g.type === "Point") {
    return [toLatLng(g.coordinates as any)];
  }

  return [];
}

// Yhdistelee useista featureistä kaikki koordinaatit fit-to varten
export function collectAllCoords(features: AnyFeature[]): LatLng[] {
  return features.flatMap(featureToCoordinates);
}

// Keskipiste koordinaateista (riittää markerille MVP:ssä)
export function centerOfCoords(coords: LatLng[]): LatLng | null {
  if (!coords.length) return null;
  let minLat = Infinity, maxLat = -Infinity, minLng = Infinity, maxLng = -Infinity;
  for (const c of coords) {
    minLat = Math.min(minLat, c.latitude);
    maxLat = Math.max(maxLat, c.latitude);
    minLng = Math.min(minLng, c.longitude);
    maxLng = Math.max(maxLng, c.longitude);
  }
  return { latitude: (minLat + maxLat) / 2, longitude: (minLng + maxLng) / 2 };
}
