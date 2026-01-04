import { useEffect, useMemo, useRef } from "react";
import { View, Text } from "react-native";
import MapView, { Marker, Polygon, Polyline } from "react-native-maps";
import { useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { RootStackParamList } from "../navigation/types";
import { getSpot } from "../data/spots";
import { getAreas } from "../data/areas";
import {
  collectAllCoords,
  centerOfCoords,
  getFeaturesForSpot,
  featureToCoordinates
} from "../data/geo";

type MapRoute = RouteProp<RootStackParamList, "Map">;

export default function MapScreen() {
  const route = useRoute<MapRoute>();
  const spot = getSpot(route.params.id);

  const mapRef = useRef<MapView>(null);

  const fc = getAreas();

  const features = useMemo(() => {
    return getFeaturesForSpot(fc as any, route.params.id);
  }, [fc, route.params.id]);

  const allCoords = useMemo(() => collectAllCoords(features as any), [features]);
  const geoCenter = useMemo(() => centerOfCoords(allCoords), [allCoords]);

  // Fallback center: spots.json (jos ei geodataa)
  const fallbackCenter = spot
    ? { latitude: spot.lat, longitude: spot.lng }
    : { latitude: 60.1699, longitude: 24.9384 }; // Helsinki fallback

  const center = geoCenter ?? fallbackCenter;

  useEffect(() => {
    if (!mapRef.current) return;

    if (allCoords.length >= 2) {
      mapRef.current.fitToCoordinates(allCoords, {
        edgePadding: { top: 60, right: 60, bottom: 60, left: 60 },
        animated: true
      });
    } else {
      mapRef.current.animateToRegion(
        {
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        },
        300
      );
    }
  }, [allCoords, center]);

  if (!spot) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Kohdetta ei löytynyt.</Text>
      </View>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: center.latitude,
          longitude: center.longitude,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
        }}
      >
        <Marker coordinate={center} title={spot.name} />

        {features.map((f, idx) => {
          const g = f.geometry;
          if (!g) return null;

          if (g.type === "Polygon") {
            const coords = featureToCoordinates(f as any);
            if (coords.length < 3) return null;
            return (
              <Polygon
                key={`poly-${idx}`}
                coordinates={coords}
                strokeWidth={2}
                fillColor="rgba(0, 128, 255, 0.18)"
                strokeColor="rgba(0, 128, 255, 0.9)"
              />
            );
          }

          if (g.type === "LineString") {
            const coords = featureToCoordinates(f as any);
            if (coords.length < 2) return null;
            return (
              <Polyline
                key={`line-${idx}`}
                coordinates={coords}
                strokeWidth={4}
                strokeColor="rgba(255, 80, 0, 0.95)"
              />
            );
          }

          return null;
        })}
      </MapView>
    </View>
  );
}
