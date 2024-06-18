import React, { useState, useEffect } from "react";
import { router } from "expo-router";
import { View, StyleSheet, TouchableOpacity, Text, Alert } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useNavigation,
  useFocusEffect,
  useRoute,
} from "@react-navigation/native";

import getCate from "../../../api/category/getCate";
import deleteCate from "../../../api/category/deleteCate";

const CategoryFix = () => {
  const navigation = useNavigation();
  const route = useRoute();

  const goBack = () => {
    navigation.goBack();
  };

  const { deviceID } = useLocalSearchParams();

  const [data, setData] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      async function fetchData() {
        try {
          const result = await getCate(deviceID);
          setData(result);
        } catch (error) {
          console.log(error);
        }
      }

      fetchData();

      return () => {};
    }, [deviceID])
  );

  const handleDelete = async (categoryId, categoryName) => {
    Alert.alert(
      "카테고리 삭제",
      `${categoryName} 카테고리를 삭제하시겠습니까?`,
      [
        {
          text: "확인",
          onPress: async () => {
            try {
              await deleteCate(deviceID, categoryId);
              setData(
                data.filter((category) => category.categoryId !== categoryId)
              );
            } catch (error) {
              console.log("카테고리 삭제 중 오류 발생:", error);
            }
          },
        },
        {
          text: "취소",
          style: "cancel",
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={goBack}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>🍪 카테고리 수정</Text>
      </View>
      <View style={styles.categoryList}>
        {data.map((category, index) => (
          <View key={index} style={styles.categoryItem}>
            <View
              style={[
                styles.colorBox,
                { backgroundColor: category.categoryColor },
              ]}
            />
            <Text style={styles.categoryText}>{category.categoryName}</Text>
            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.categoryFixBtn}
                onPress={() => {
                  router.push({
                    pathname: "categoryEdit",
                    params: {
                      categoryId: category.categoryId,
                      categoryName: category.categoryName,
                      categoryColor: category.categoryColor,
                    },
                  });
                }}
              >
                <AntDesign name="edit" size={30} color="#594E4E" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.categoryDeleteBtn}
                onPress={() =>
                  handleDelete(category.categoryId, category.categoryName)
                }
              >
                <AntDesign name="delete" size={30} color="#594E4E" />
              </TouchableOpacity>
            </View>
          </View>
        ))}
        <TouchableOpacity
          style={styles.categoryItem}
          onPress={() => router.push("categoryAdd")}
        >
          <View
            style={[
              styles.colorBox,
              {
                backgroundColor: "#D9D9D9",
                justifyContent: "center",
                alignItems: "center",
              },
            ]}
          >
            <AntDesign name="plus" size={9} color="#FFF" />
          </View>
          <Text style={styles.categoryText}>추가하기</Text>
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
  categoryList: {
    margin: 30,
  },
  categoryItem: {
    flexDirection: "row",
    marginVertical: 14,
  },
  colorBox: {
    width: 25,
    height: 25,
    borderRadius: 5,
    marginRight: 10,
  },
  categoryText: {
    fontSize: 25,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flex: 1,
  },
  categoryFixBtn: {
    marginRight: 12,
  },
  categoryDeleteBtn: {},
});

export default CategoryFix;