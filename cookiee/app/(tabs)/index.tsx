import { StyleSheet, View } from "react-native";

import CalendarHome from "@/components/CalendarHome";
import Login from "./DeviceRegistration";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* <CalendarHome /> */}
      <Login />
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
