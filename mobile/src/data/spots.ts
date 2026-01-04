import spots from "./spots.json";

export type Spot = {
  id: string;
  name: string;
  municipality: string;
  teaser: string;
  priceFromEur?: number;
  lat: number;
  lng: number;
  imageUrl?: string;
};

export const getSpots = (): Spot[] => {
  return spots as Spot[];
};

export const getSpot = (id: string): Spot | undefined => {
  return (spots as Spot[]).find((s) => s.id === id);
};
