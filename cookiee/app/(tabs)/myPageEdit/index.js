import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { getUser } from "../../../api/user/getUser";
import { putUser } from "../../../api/user/putUser";

const myPageEdit = () => {
  const navigation = useNavigation();
  const [nickname, setNickname] = useState("");
  const [intro, setIntro] = useState("");
  const [error, setError] = useState("");
  const [profileImage, setProfileImage] = useState(null);

  const goBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userId = 32;
        const userData = await getUser(userId);

        if (userData) {
          setProfileImage(userData.profileImage);
          setNickname(userData.nickname);
          setIntro(userData.selfDescription);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setError("Failed to fetch user data. Please try again.");
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async () => {
    try {
      const userId = 32;
      setProfileImage("test01"); // 임시로

      const userData = {
        nickname: nickname,
        selfDescription: intro,
        profileImage,
      };

      const result = await putUser(userId, userData);

      if (result) {
        console.log("Profile updated successfully!");
        goBack();
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setError("An unexpected error occurred. Please try again.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>마이페이지 수정</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.headerText}>닉네임</Text>
        <TextInput
          style={styles.textInput}
          placeholder="닉네임을 입력해주세요"
          onChangeText={(text) => setNickname(text)}
          value={nickname}
        />
        <Text style={styles.headerText}>한줄 소개 (50자)</Text>
        <TextInput
          style={styles.textInput}
          placeholder="한줄 소개를 입력해주세요"
          onChangeText={(text) => setIntro(text)}
          value={intro}
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={handleProfileUpdate}
        >
          <Text style={styles.buttonText}>프로필 수정</Text>
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
    width: 340,
    height: 60,
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 25,
  },
  inputContainer: {
    marginTop: 38,
    marginLeft: 32,
    marginRight: 32,
  },
  headerText: {
    fontSize: 25,
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: "#EBEBEB",
    borderRadius: 8,
    padding: 10,
    marginTop: 10,
    fontSize: 23,
    marginBottom: 20,
  },
});

export default myPageEdit;
