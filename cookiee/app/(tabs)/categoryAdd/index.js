import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  FlatList,
  TextInput,
  ScrollView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import ColorPicker from "react-native-wheel-color-picker";
import tinycolor from "tinycolor2";

import { postCate } from "../../../api/category/postCate";

const CategoryAdd = () => {
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("#FFFFFF");
  const [categoryName, setCategoryName] = useState("");
  const { deviceID } = useLocalSearchParams();

  const handleColorChange = (colorHsvOrRgb) => {
    const colorHex = tinycolor(colorHsvOrRgb).toHexString();
    setSelectedColor(colorHex);
  };

  const handleComplete = async () => {
    try {
      const categoryData = {
        categoryName: categoryName,
        categoryColor: selectedColor,
      };
      console.log(deviceID);

      const result = await postCate(deviceID, categoryData);

      if (result) {
        console.log("Category added successfully:", result);
        router.back();
      } else {
        console.log("Failed to add category");
      }
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={25} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>🍪 카테고리 추가</Text>
      </View>

      <View style={styles.centeredContainer}>
        <View style={styles.editContainer}>
          <View style={styles.selectedColor}>
            <ColorPicker
              color={selectedColor}
              sliderSize={15}
              onColorChange={handleColorChange}
            />
          </View>
          <TextInput
            id="categoryName"
            autoCorrect={false}
            style={styles.textInput}
            placeholder="카테고리를 입력하세요"
            placeholderTextColor="grey"
            value={categoryName}
            onChangeText={(text) => setCategoryName(text)}
          />
          <TouchableOpacity
            style={styles.completeButton}
            onPress={handleComplete}
          >
            <Text style={styles.buttonStyle}>완료</Text>
          </TouchableOpacity>
        </View>
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
    width: 60,
    height: 30,
    backgroundColor: "#FFF6F1E4",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonStyle: {
    fontSize: 20,
  },
});

export default CategoryAdd;
