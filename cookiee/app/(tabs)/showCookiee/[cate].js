import React, { useState, useCallback } from "react";
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
import { useRouter, useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";

import { collectCate } from "../../../api/category/collectCate";

const ShowCookiee = () => {
  const route = useRouter();

  const { categoryId, categoryName, deviceID } = useLocalSearchParams();

  const [eventImages, setEventImages] = useState([]);

  useFocusEffect(
    useCallback(() => {
      let isActive = true;

      async function fetchData() {
        try {
          if (!categoryId) {
            return;
          }

          const result = await collectCate(deviceID, categoryId);

          if (result && result.eventImageList) {
            setEventImages(result.eventImageList);
          }
        } catch (error) {}
      }
      fetchData();

      return () => {
        isActive = false;
      };
    }, [deviceID])
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleHeader}>
        <TouchableOpacity style={styles.menuIcon} onPress={() => route.back()}>
          <AntDesign name="arrowleft" size={30} color="#594E4E" />
        </TouchableOpacity>
        <Text style={styles.title}>{categoryName}</Text>
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
    fontSize: 25,
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
