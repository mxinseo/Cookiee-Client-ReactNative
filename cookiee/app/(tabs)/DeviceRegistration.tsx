import { StyleSheet, Image, View, Text, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";

import DeviceInfo from "react-native-device-info";

export default function DeviceRegistration() {
  const router = useRouter();
  const [deviceID, setDeviceID] = useState(String);

  const getDeviceUUID = async () => {
    const uniqueID = await DeviceInfo.getUniqueId();
    setDeviceID(uniqueID);
  };

  useEffect(() => {
    if (deviceID) {
      console.log("deviceID : " + deviceID);
      router.push({
        pathname: "CalendarHome",
        params: {
          deviceID: deviceID,
        },
      });
    }
  }, [deviceID]);

  return (
    <View style={styles.container}>
      <View style={styles.introContainer}>
        <Image
          style={styles.image}
          source={require("../../assets/images/cookie.png")}
        />
        <Text style={styles.title_text}>Cookiee</Text>
        <Text style={styles.content_text}>오늘 하루를 사진으로 기록해</Text>
        <Text style={{ ...styles.content_text, paddingBottom: 5 }}>
          나만의 쿠키를 만들어보아요
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={getDeviceUUID}>
          <Text style={styles.buttonText}>get Device Id</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  introContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: 90,
    height: 90,
  },
  title_text: {
    color: "#594E4E",
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 13,
  },
  content_text: {
    color: "#594E4E",
    fontSize: 20,
  },

  buttonContainer: {
    display: "flex",
    alignItems: "center",
    marginTop: 50,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4285F4",
    width: 300,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    fontSize: 19,
    fontWeight: "500",
    marginLeft: 6,
  },
});
