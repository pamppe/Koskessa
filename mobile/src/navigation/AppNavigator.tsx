import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ListScreen from "../pages/ListScreen";
import DetailScreen from "../pages/DetailScreen";
import MapScreen from "../pages/MapScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="Detail" component={DetailScreen} />
      <Stack.Screen name="Map" component={MapScreen} />
    </Stack.Navigator>
  );
}
