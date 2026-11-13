import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: "#eef2f8" },
        headerShadowVisible: false,
        headerTintColor: "#203a61",
        contentStyle: { backgroundColor: "#eef2f8" },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Parcel Tracker" }} />
      <Stack.Screen
        name="parcels/[parcelId]"
        options={{ title: "Parcel details" }}
      />
    </Stack>
  );
}
