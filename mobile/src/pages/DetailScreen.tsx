import { Button, Image, ScrollView, Text, View } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import type { RouteProp } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { getSpot } from "../data/spots";

type DetailRoute = RouteProp<RootStackParamList, "Detail">;
type Nav = NativeStackNavigationProp<RootStackParamList, "Detail">;

export default function DetailScreen() {
  const navigation = useNavigation<Nav>();
  const route = useRoute<DetailRoute>();
  const spot = getSpot(route.params.id);

  if (!spot) {
    return (
      <View style={{ flex: 1, padding: 16 }}>
        <Text>Kohdetta ei löytynyt.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ padding: 16 }}>
      <Text style={{ fontSize: 26, fontWeight: "800" }}>{spot.name}</Text>
      <Text style={{ marginTop: 6, opacity: 0.7 }}>{spot.municipality}</Text>

      {spot.imageUrl ? (
        <Image
          source={{ uri: spot.imageUrl }}
          style={{
            width: "100%",
            height: 220,
            borderRadius: 14,
            marginTop: 14
          }}
        />
      ) : null}

      <Text style={{ marginTop: 14, fontSize: 16, lineHeight: 22 }}>
        {spot.teaser}
      </Text>

      <View style={{ marginTop: 16 }}>
        <Button title="Näytä kartalla" onPress={() => navigation.navigate("Map", { id: spot.id })} />
      </View>
    </ScrollView>
  );
}
