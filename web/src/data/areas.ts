import geo from "../assets/data/spot-areas.json";

export const areas = geo as GeoJSON.FeatureCollection;

export const getAreaForSpot = (spotId: string): GeoJSON.FeatureCollection => {
  const features = areas.features.filter(
    (f) => (f.properties as any)?.spotId === spotId
  );
  return { type: "FeatureCollection", features };
};
