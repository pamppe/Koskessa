import areas from "./spot-areas.json";

export const getAreas = () => {
  return areas as GeoJSON.FeatureCollection;
};
