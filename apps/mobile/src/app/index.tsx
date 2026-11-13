import { demoParcelId, parcelPath } from "@evjs-expo-poc/shared";
import { Link } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { Screen, styles } from "../ui";

export default function HomeScreen() {
  return (
    <Screen>
      <Text style={styles.eyebrow}>PARCEL TRACKER · APP</Text>
      <Text accessibilityRole="header" style={styles.heading}>
        Follow your parcel.
      </Text>
      <Text style={styles.body}>
        A tiny Expo client for a fictional delivery service.
      </Text>
      <View style={styles.card}>
        <Text style={styles.label}>DEMO TRACKING NUMBER</Text>
        <Text style={styles.value}>{demoParcelId}</Text>
        <Link href={parcelPath(demoParcelId)} asChild>
          <Pressable accessibilityRole="link" style={styles.button}>
            <Text style={styles.buttonLabel}>Track demo parcel</Text>
          </Pressable>
        </Link>
      </View>
    </Screen>
  );
}
