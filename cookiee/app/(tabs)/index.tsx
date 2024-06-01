import { StyleSheet, SafeAreaView } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  return (
    <SafeAreaView>
      <ThemedView
        style={{ ...styles.titleContainer, justifyContent: "center" }}
      >
        <ThemedText type="title">Cookiee</ThemedText>
      </ThemedView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
});
