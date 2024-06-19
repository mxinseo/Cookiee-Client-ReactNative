import React, { useState } from "react";
import { useRouter, useLocalSearchParams, useFocusEffect } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text, Image } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { getUser } from "../../../api/user/getUser";
import { Linking } from "react-native";

const myPage = () => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const { deviceID } = useLocalSearchParams();

  const fetchUserData = async () => {
    try {
      const data = await getUser(deviceID);
      setUserData(data);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();
    }, [])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>마이페이지</Text>
      </View>

      <View style={styles.profileContainer}>
        {userData?.profileImage && (
          <Image
            source={{ uri: userData.profileImage }}
            style={styles.profileImage}
          />
        )}
        <View style={styles.textContainer}>
          {/* <Text style={styles.profileText}>Email: {userData?.email}</Text> */}
          <Text style={styles.nicknameText}>{userData?.nickname}</Text>
          <Text style={styles.selfDescriptionText}>
            {userData?.selfDescription}
          </Text>
        </View>
      </View>
      <View style={styles.line}></View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => router.push({ pathname: "myPageEdit" })}
        >
          <Text style={styles.buttonText}>프로필 수정</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() =>
            Linking.openURL("https://youtu.be/O2Hv4VpVumg?feature=shared")
          }
        >
          <Text style={styles.buttonText}>사용 가이드</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 30,
  },
  titleHeader: {
    marginVertical: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },
  title: {
    position: "absolute",
    fontSize: 40,
    fontWeight: "bold",
    color: "#594E4E",
  },
  menuIcon: {
    marginLeft: 30,
    width: "100%",
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 40,
  },
  buttonStyle: {
    width: 370,
    height: 80,
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 25,
  },
  profileContainer: {
    alignItems: "center",
    margin: 10,
    marginBottom: 30,
    flexDirection: "row",
  },
  profileImage: {
    width: 200,
    height: 200,
    borderRadius: 18,
  },
  textContainer: {
    marginLeft: 30,
    justifyContent: "center",
  },
  nicknameText: {
    fontSize: 40,
    fontWeight: "bold",
    marginVertical: 8,
  },
  selfDescriptionText: {
    fontSize: 20,
    marginVertical: 8,
  },
  line: {
    borderBottomColor: "#D9D9D9",
    borderBottomWidth: 1,
    width: "100%",
  },
});

export default myPage;
