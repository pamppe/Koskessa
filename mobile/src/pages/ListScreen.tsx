import { FlatList, Pressable, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigation/types";
import { getSpots } from "../data/spots";

type Nav = NativeStackNavigationProp<RootStackParamList, "List">;

export default function ListScreen() {
  const navigation = useNavigation<Nav>();
  const spots = getSpots();

  return (
    <View style={{ flex: 1, padding: 16 }}>
      <FlatList
        data={spots}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("Detail", { id: item.id })}
            style={{
              padding: 14,
              borderRadius: 12,
              borderWidth: 1,
              borderColor: "#ddd",
              backgroundColor: "#fff"
            }}
          >
            <Text style={{ fontSize: 18, fontWeight: "700" }}>{item.name}</Text>
            <Text style={{ marginTop: 2, opacity: 0.7 }}>{item.municipality}</Text>
            <Text style={{ marginTop: 8 }}>{item.teaser}</Text>
            {typeof item.priceFromEur === "number" && (
              <Text style={{ marginTop: 10, fontWeight: "600" }}>
                Alk. {item.priceFromEur} €
              </Text>
            )}
          </Pressable>
        )}
      />
    </View>
  );
}
