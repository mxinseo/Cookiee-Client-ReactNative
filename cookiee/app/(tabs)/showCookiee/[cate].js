import React, { useState, useEffect, useCallback } from "react";
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
import {
  useRouter,
  useGlobalSearchParams,
  useLocalSearchParams,
} from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { collectCate } from "../../../api/category/collectCate";

const ShowCookiee = () => {
  const { cate } = useGlobalSearchParams();
  const { deviceID } = useLocalSearchParams();
  const route = useRouter();

  const [eventImages, setEventImages] = useState([]);
  const [categoryId, setCategoryId] = useState(null);

  useFocusEffect(
    useCallback(() => {
      if (route.params?.categoryId) {
        setCategoryId(route.params.categoryId);
      }
    }, [route.params])
  );

  useEffect(() => {
    if (categoryId !== null) {
      handleComplete();
    }
  }, [categoryId]);

  const handleComplete = async () => {
    try {
      if (!categoryId) {
        console.error("categoryId is not set");
        return;
      }

      const result = await collectCate(deviceID, categoryId);
      console.log(result);

      if (result && result.eventImageList) {
        setEventImages(result.eventImageList);
      }
    } catch (error) {
      console.error("Error fetching category data:", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => route.back()}>
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
    aspectRatio: 1,
    margin: 2,
    width: "32%",
  },
});

export default ShowCookiee;
