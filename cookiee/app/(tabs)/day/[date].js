import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
  ScrollView,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useLocalSearchParams, useRouter, useFocusEffect } from "expo-router";

import EventBox from "../../components/EventBox";

import { createThumb } from "../../../api/thumbnail/createThumb";
import { getThumb } from "../../../api/thumbnail/getThumb";
import { getEventList } from "../../../api/event/getEventList";
import { updateThumb } from "../../../api/thumbnail/updateThumb";
import { deleteThumb } from "../../../api/thumbnail/deleteThumb";

import { MaterialIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { LinearGradient } from "expo-linear-gradient";

const BottomModalContnet = () => {
  const router = useRouter();
  const [userId, setUserId] = useState(32);

  const { date } = useLocalSearchParams();
  const selectedDate = JSON.parse(date);

  const [selectedThumbnailUrl, setSelectedThumbnailUrl] = useState(null);
  const [thumbnailId, setThumbnailId] = useState();
  const [hasThumb, setHasThumb] = useState(false);

  const [eventList, setEventList] = useState([]);

  const onImageSelected = async (imageData) => {
    var status = false;
    try {
      if (hasThumb === false) {
        console.log("등록 api");
        status = await createThumb(userId, selectedDate, imageData);
        console.log(status);
      } else {
        console.log("수정 api", thumbnailId);
        status = await updateThumb(userId, thumbnailId, imageData);
        console.log(status);
      }
    } catch (error) {
      console.error("Error in onImageSelected:", error);
    }
    if (status == true) {
      setSelectedThumbnailUrl(imageData.uri);
    }
  };

  const deleteThumbnail = () => {
    console.log("삭제 api");
    Alert.alert(
      "표지 사진 삭제하기",
      "정말로 삭제하시겠습니까?",
      [
        {
          text: "삭제",
          onPress: async () => {
            const status = await deleteThumb(userId, thumbnailId);
            if (status == true) {
              setSelectedThumbnailUrl(null);
            }
          },
        },
        {
          text: "취소",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );
  };

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const pickImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
      });

      if (!result.canceled) {
        onImageSelected(result.assets[0]);
      }
    } catch (error) {
      console.error("Error while picking image:", error);
    }
  };

  const alertPickThumb = () =>
    Alert.alert(
      "표지 사진 설정하기",
      "",
      [
        {
          text: "사진 수정하기",
          onPress: () => {
            pickImage();
          },
        },
        {
          text: "사진 삭제하기",
          onPress: () => {
            deleteThumbnail();
          },
        },
        {
          text: "취소",
          onPress: () => {},
        },
      ],
      { cancelable: false }
    );

  async function handelGetThumb() {
    console.log("handelGetThumb 실행");
    try {
      const result = await getThumb(userId);

      // console.log(result);

      if (result != null) {
        const thumbnail = result.find(
          (thumb) =>
            thumb.eventYear === selectedDate.year &&
            thumb.eventMonth === selectedDate.month &&
            thumb.eventDate === selectedDate.date
        );

        if (thumbnail != null) {
          setSelectedThumbnailUrl(thumbnail.thumbnailUrl);
          setThumbnailId(thumbnail.thumbnailId);
          setHasThumb(true);
        } else {
          setSelectedThumbnailUrl(null);
          setHasThumb(false);
        }
      } else {
        console.log("getThumb returned undefined or null result");
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function handelGetEventList() {
    console.log("handelGetEventList 실행");
    try {
      const eventList = await getEventList(
        userId,
        selectedDate.year,
        selectedDate.month,
        selectedDate.date
      );

      if (eventList != null) {
        setEventList(eventList);
        // console.log("eventList: ", await eventList);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useFocusEffect(
    useCallback(() => {
      handelGetEventList();
    }, [])
  );

  useEffect(() => {
    handelGetThumb();
  }, [selectedThumbnailUrl]);

  return (
    <View style={styles.modalContainer}>
      <View style={styles.thumnailContainer}>
        {selectedThumbnailUrl !== null && (
          <ImageBackground
            style={styles.imageBackground}
            source={{ uri: selectedThumbnailUrl }}
            resizeMode="cover"
            defaultSource={require("../../../assets/adaptive-icon.png")}
          ></ImageBackground>
        )}

        <View style={styles.addContainer}>
          <View style={styles.addThumnailBtnContainer}>
            <TouchableOpacity onPress={alertPickThumb}>
              <MaterialIcons
                name="add-photo-alternate"
                size={45}
                color="#594E4E"
              />
            </TouchableOpacity>
          </View>
        </View>
        <LinearGradient
          colors={["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 1)"]}
          style={styles.modalDateContainer}
        >
          <View style={styles.modalDateContainerInner}>
            {selectedDate &&
              selectedDate.year &&
              selectedDate.month &&
              selectedDate.date && (
                <Text style={styles.modalDate}>
                  {selectedDate.year}년 {selectedDate.month}월{" "}
                  {selectedDate.date}일
                </Text>
              )}
          </View>
        </LinearGradient>
      </View>

      {/* 이벤트 리스트가 들어가는 위치 */}
      <View style={styles.scrollView}>
        <ScrollView
          contentContainerStyle={{
            flexGrow: 1,
            height: "auto",
          }}
          showsVerticalScrollIndicator={true}
        >
          {eventList != null
            ? eventList.map((event, index) => {
                return (
                  <View key={index} style={{ width: "100%", height: "auto" }}>
                    <TouchableOpacity
                      onPress={() =>
                        router.push({
                          pathname: `event/${event.eventId}`,
                        })
                      }
                    >
                      <EventBox eventData={event} />
                    </TouchableOpacity>
                  </View>
                );
              })
            : null}

          <View style={styles.AddEventContainer}>
            <TouchableOpacity
              style={styles.AddEventBtnContainer}
              onPress={() => {
                router.push({
                  pathname: "form",
                  params: {
                    year: selectedDate.year,
                    month: selectedDate.month,
                    date: selectedDate.date,
                  },
                });
              }}
            >
              <View style={styles.addPlusBtn}>
                <Text style={{ fontSize: 25 }}>+</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default BottomModalContnet;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  thumnailContainer: {
    display: "flex",
    height: 240,
    backgroundColor: "#D9D9D9",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignContent: "center",
    justifyContent: "center",
  },
  modalDate: {
    fontSize: 30,
    fontWeight: "600",
    color: "#594E4E",
  },
  modalDateContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    paddingLeft: 10,
    paddingTop: 20,
    width: "100%",
  },
  modalDateContainerInner: { marginTop: 15 },
  addContainer: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    width: "100%",
    position: "absolute",
  },
  AddEventContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    alignSelf: "center",
    width: "100%",
    margin: 10,
    marginBottom: 25,
  },
  AddEventBtnContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "center",
    backgroundColor: "#EFEFEF",
    borderRadius: "10px",
    width: "95%",
    height: 32,
    margin: 1,
  },
  addPlusBtn: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    width: "auto",
    height: "auto",
  },
  addThumnailBtnContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    display: "flex",
    height: "100%",
    width: "100%",
    flex: 1,
    position: "relative",
    paddingTop: 7,
  },
  imageBackground: {
    width: "100%",
    height: "100%",
  },
});
