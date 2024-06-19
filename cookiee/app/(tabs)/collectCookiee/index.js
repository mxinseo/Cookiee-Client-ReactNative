import React, { useState, useEffect } from "react";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter, useLocalSearchParams } from "expo-router";

import getCate from "../../../api/category/getCate";

const collectCookiee = () => {
  const router = useRouter();
  const { deviceID } = useLocalSearchParams();
  const [data, setData] = useState([]);

  useEffect(() => {
    let completed = false; // 첫 번째 1회 실행을 위한 flag

    async function get() {
      try {
        const result = await getCate(deviceID);
        if (!completed) {
          setData(result);
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      }
    }

    get();
    return () => {
      completed = true;
    };
  }, [deviceID]); // deviceID가 변경될 때 마다 실행

  // const handlePressCate = (categoryName) => {
  //   router.push({
  //     pathname: `showCookiee/${categoryName}`,
  //     params: { categoryId: category.categoryId },
  //   });
  // };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => router.back()}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>🍪 쿠키 모아보기</Text>
      </View>
      <View style={styles.categoryList}>
        {data == null ? (
          <Text>카테고리가 없습니다.</Text>
        ) : (
          data.map((category, index) => (
            <View key={index}>
              <TouchableOpacity
                onPress={() =>
                  router.push({
                    pathname: `showCookiee/${category.categoryName}`,
                    params: {
                      categoryId: category.categoryId,
                      deviceID: deviceID,
                    },
                  })
                }
              >
                <View style={styles.categoryItem}>
                  <View
                    style={[
                      styles.colorBox,
                      { backgroundColor: category.categoryColor },
                    ]}
                  />
                  <Text style={styles.categoryText}>
                    {category.categoryName}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          ))
        )}
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
});

export default collectCookiee;
