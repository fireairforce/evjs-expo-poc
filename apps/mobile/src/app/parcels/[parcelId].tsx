import {
  demoParcelId,
  fetchParcel,
  type Parcel,
  parseParcelId,
  summarizeParcel,
} from "@evjs-expo-poc/shared";
import { Link, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, Pressable, Text, View } from "react-native";
import { Screen, styles } from "../../ui";

type Result =
  | { kind: "loading" }
  | { kind: "ready"; parcel: Parcel }
  | { kind: "error"; message: string };

// Expo inlines this public variable at bundle time.
declare const process: { env: { EXPO_PUBLIC_API_URL?: string } };

const apiUrl =
  process.env.EXPO_PUBLIC_API_URL ||
  (Platform.OS === "android" ? "http://10.0.2.2:3100" : "http://localhost:3100");

export function generateStaticParams() {
  return [{ parcelId: demoParcelId }];
}

export default function ParcelRoute() {
  const { parcelId } = useLocalSearchParams<{ parcelId: string }>();
  const id = parseParcelId(parcelId);
  return id ? (
    <ParcelScreen key={id} id={id} />
  ) : (
    <Screen>
      <Text accessibilityRole="header" style={styles.heading}>
        Invalid tracking number
      </Text>
      <Link href="/" style={styles.link}>Back to tracker</Link>
    </Screen>
  );
}

function ParcelScreen({ id }: { id: string }) {
  const [attempt, setAttempt] = useState(0);
  const [result, setResult] = useState<Result>({ kind: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetchParcel(apiUrl, id, controller.signal).then(
      (parcel) => {
        if (!controller.signal.aborted) setResult({ kind: "ready", parcel });
      },
      (error: unknown) => {
        if (!controller.signal.aborted) {
          setResult({
            kind: "error",
            message: error instanceof Error ? error.message : "Request failed.",
          });
        }
      },
    );
    return () => controller.abort();
  }, [id, attempt]);

  return (
    <Screen>
      <Text style={styles.eyebrow}>TRACKING NUMBER · {id}</Text>
      {result.kind === "loading" ? (
        <View style={styles.card} accessibilityLiveRegion="polite">
          <ActivityIndicator accessibilityLabel="Loading parcel" />
          <Text style={styles.body}>Checking parcel status…</Text>
        </View>
      ) : result.kind === "error" ? (
        <>
          <Text accessibilityRole="header" style={styles.heading}>
            Could not load this parcel
          </Text>
          <Text style={styles.body} accessibilityLiveRegion="polite">
            {result.message}
          </Text>
          <Pressable
            accessibilityRole="button"
            style={styles.button}
            onPress={() => {
              setResult({ kind: "loading" });
              setAttempt((value) => value + 1);
            }}
          >
            <Text style={styles.buttonLabel}>Try again</Text>
          </Pressable>
        </>
      ) : (
        <ParcelCard parcel={result.parcel} />
      )}
      <Link href="/" style={styles.link}>Back to tracker</Link>
    </Screen>
  );
}

function ParcelCard({ parcel }: { parcel: Parcel }) {
  const summary = summarizeParcel(parcel);
  return (
    <>
      <Text accessibilityRole="header" style={styles.heading}>{parcel.title}</Text>
      <View style={styles.card}>
        <Text style={[styles.pill, styles[summary.tone]]}>{summary.title}</Text>
        <Text style={styles.body}>{summary.detail}</Text>
        <View style={styles.divider} />
        <Text style={styles.label}>DESTINATION</Text>
        <Text style={styles.value}>{parcel.destination}</Text>
        <Text style={styles.label}>LAST UPDATE</Text>
        <Text style={styles.value}>{parcel.updatedAt}</Text>
      </View>
    </>
  );
}
