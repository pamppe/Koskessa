import { createNativeStackNavigator } from "@react-navigation/native-stack";
import type { RootStackParamList } from "./types";
import ListScreen from "../pages/ListScreen";
import DetailScreen from "../pages/DetailScreen";
import MapScreen from "../pages/MapScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} options={{ title: "Koskessa" }} />
      <Stack.Screen name="Detail" component={DetailScreen} options={{ title: "Kohde" }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ title: "Kartta" }} />
    </Stack.Navigator>
  );
}
