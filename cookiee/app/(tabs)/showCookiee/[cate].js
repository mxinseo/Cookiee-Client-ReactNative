import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "@react-navigation/native";
import { useGlobalSearchParams } from "expo-router";

import { collectCate } from "../../../api/category/collectCate";

const ShowCookiee = () => {
  const { cate } = useGlobalSearchParams();
  const navigation = useNavigation();
  const route = useRouter();

  const [eventImages, setEventImages] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useEffect(() => {
    if (route.params?.categoryId) {
      setCategoryId(route.params.categoryId);
    }
  }, [route.params]);

  useEffect(() => {
    if (categoryId !== null) {
      handleComplete();
    }
  }, [categoryId]);

  const handleComplete = async () => {
    try {
      const userId = 32;
      console.log(categoryId);

      if (!categoryId) {
        console.error("categoryId is not set");
        return;
      }

      const result = await collectCate(userId, categoryId);
      console.log(result);

      if (result && result.eventImageList) {
        setEventImages(result.eventImageList);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  const goBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={route.back()}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>{cate}</Text>
      </View>
      <FlatList
        data={eventImages}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.firstImageUrl }}
            style={styles.image}
            resizeMode="cover"
          />
        )}
      />
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
    marginBottom: 20,
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
  image: {
    flex: 1,
    aspectRatio: 1, // Ensure images maintain their aspect ratio
    margin: 2,
    width: "32%", // Set a specific width for each image to fit in three columns
  },
});

export default ShowCookiee;
