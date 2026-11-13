import type { PropsWithChildren } from "react";
import { ScrollView, StyleSheet, View } from "react-native";

export function Screen({ children }: PropsWithChildren) {
  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.screen}>{children}</View>
    </ScrollView>
  );
}

export const styles = StyleSheet.create({
  scroll: { paddingHorizontal: 22, paddingTop: 36, paddingBottom: 50 },
  screen: { alignSelf: "center", width: "100%", maxWidth: 480, gap: 16 },
  eyebrow: { color: "#526582", fontWeight: "700", fontSize: 12, letterSpacing: 2 },
  heading: { color: "#172947", fontWeight: "800", fontSize: 36, letterSpacing: -1 },
  body: { color: "#425775", fontSize: 16, lineHeight: 24 },
  card: {
    backgroundColor: "#ffffff",
    borderColor: "#d6dfed",
    borderWidth: 1,
    borderRadius: 20,
    padding: 22,
    marginTop: 8,
    gap: 13,
  },
  button: {
    alignSelf: "flex-start",
    backgroundColor: "#204c99",
    borderRadius: 12,
    paddingHorizontal: 18,
    paddingVertical: 13,
    marginTop: 4,
  },
  buttonLabel: { color: "#fff", fontWeight: "700", fontSize: 16 },
  label: { color: "#526582", fontSize: 12, fontWeight: "700", letterSpacing: 1.3 },
  value: { color: "#172947", fontSize: 16, marginTop: -6 },
  divider: { borderBottomColor: "#d6dfed", borderBottomWidth: 1, marginVertical: 3 },
  pill: {
    alignSelf: "flex-start",
    fontSize: 14,
    fontWeight: "700",
    borderRadius: 10,
    overflow: "hidden",
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  neutral: { color: "#4a5a71", backgroundColor: "#e8edf4" },
  active: { color: "#1c4893", backgroundColor: "#dbe8ff" },
  success: { color: "#126149", backgroundColor: "#d8f3e9" },
  link: { alignSelf: "flex-start", color: "#204c99", fontWeight: "700", marginTop: 6 },
});
