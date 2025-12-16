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
