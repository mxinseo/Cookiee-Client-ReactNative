import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useGlobalSearchParams } from "expo-router";
import ColorPicker from "react-native-wheel-color-picker";
import tinycolor from "tinycolor2";

import { putCate } from "../../../api/category/putCate";

const CategoryEdit = () => {
  const router = useRouter();
  const { categoryId, categoryName, deviceID } = useGlobalSearchParams();

  const [newCategoryName, setNewCategoryName] = useState(categoryName);
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");

  const handleColorChange = (colorHsvOrRgb) => {
    const colorHex = tinycolor(colorHsvOrRgb).toHexString();
    setSelectedColor(colorHex);
  };

  const handleComplete = async () => {
    try {
      const categoryData = {
        categoryName: newCategoryName,
        categoryColor: selectedColor,
      };

      const result = await putCate(deviceID, categoryId, categoryData);

      if (result.isSuccess) {
        router.back();
      } else {
        Alert.alert("Error", "이미 존재하는 이름 또는 색상입니다.");
      }
    } catch (error) {
      Alert.alert("Error", "다시 한 번 시도해 주세요.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          keyboardVerticalOffset={50}
          behavior={"padding"}
          style={{ flex: 1 }}
        >
          <View style={styles.titleHeader}>
            <TouchableOpacity
              style={styles.menuIcon}
              onPress={() => router.back()}
            >
              <AntDesign name="arrowleft" size={30} color="#594E4E" />
            </TouchableOpacity>
            <Text style={styles.title}>🍪 카테고리 수정</Text>
          </View>

          <View style={styles.centeredContainer}>
            <View style={styles.editContainer}>
              <View style={styles.selectedColor}>
                <ColorPicker
                  color={selectedColor}
                  sliderSize={20}
                  onColorChange={handleColorChange}
                />
              </View>

              <TextInput
                id="categoryName"
                autoCorrect={false}
                style={styles.textInput}
                placeholder="카테고리를 입력하세요"
                placeholderTextColor="grey"
                value={newCategoryName}
                onChangeText={(text) => setNewCategoryName(text)}
              />
              <TouchableOpacity
                style={styles.completeButton}
                onPress={handleComplete}
              >
                <Text style={styles.buttonStyle}>완료</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
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
    fontSize: 25,
    fontWeight: "bold",
    color: "#594E4E",
  },
  menuIcon: {
    marginLeft: 30,
    width: "100%",
  },
  editContainer: {
    backgroundColor: "#F1F1F1",
    width: 600,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedColor: {
    width: 200,
    height: 300,
    borderWidth: 0,
    borderRadius: 15,
  },
  textInput: {
    width: "50%",
    height: 50,
    backgroundColor: "#FFFFFF",
    color: "grey",
    marginTop: 30,
    marginBottom: 10,
    fontSize: 20,
    padding: 15,
    borderRadius: 10,
  },

  completeButton: {
    marginVertical: 10,
    width: "auto",
    height: "auto",
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  buttonStyle: {
    fontSize: 18,
  },
});

export default CategoryEdit;
