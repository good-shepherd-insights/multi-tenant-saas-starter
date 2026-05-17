import { Tabs } from "expo-router";

/**
 * Tab navigator for authenticated screens.
 * Add tab screens here as the app grows.
 */
export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTintColor: "#111",
        tabBarActiveTintColor: "#111",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{ title: "Home" }}
      />
    </Tabs>
  );
}