import raw from "../assets/data/spots.json";
import type { Spot } from "../types/spot";

export const spots = raw as Spot[];

export const getSpot = (id: string) => {
  return spots.find((s) => s.id === id);
};
