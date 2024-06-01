import { StyleSheet, SafeAreaView, View } from "react-native";

import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import CalendarHome from "@/components/CalendarHome";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <View style={{ ...styles.titleContainer, justifyContent: "center" }}>
        <ThemedText type="title">Cookiee</ThemedText>
      </View> */}
      <CalendarHome />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  container: {
    flex: 1,
  },
});
