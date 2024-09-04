import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useCallback } from "react";

import { useGlobalSearchParams, useRouter, useFocusEffect } from "expo-router";

import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-reanimated-carousel";

import getCate from "../../../api/category/getCate";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const UpdateEventFormScreen = () => {
  const router = useRouter();
  const { year, month, date, deviceID, eventId } = useGlobalSearchParams();

  const width = Dimensions.get("window").width;

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  useFocusEffect(
    useCallback(() => {
      async function get() {
        try {
          const result = await getCate(deviceID);
          if (result != null) {
            if (result != null) {
              let cateNum = 0;
              let presentCates = [];

              for (cateNum = 0; cateNum < result.length; cateNum++) {
                const presentCate = {
                  label: result[cateNum].categoryName,
                  value: result[cateNum].categoryId,
                  color: result[cateNum].categoryColor,
                };

                const exists = items.some(
                  (item) => item.value === presentCate.value
                );
                if (!exists) {
                  presentCates.push(presentCate);
                }
              }

              setItems([...presentCates, ...items]);
            }
          } else {
          }
        } catch (error) {}
      }

      get();
    }, [deviceID])
  );

  const [timeField, setTimeField] = useState({
    startTime: 0,
    startMin: 0,
    endTime: 0,
    endMin: 0,
  });

  const formData = new FormData();
  const [imageUrl, setImageUrl] = useState([]);
  const [imageDataArray, setImageDataArray] = useState([]);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    if (!status?.granted) {
      const permission = await requestPermission();
      if (!permission.granted) {
        return null;
      }
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        quality: 1,
        allowsMultipleSelection: true,
      });

      if (result.canceled) {
        return null;
      }

      if (result.assets != null && result.assets.length > 0) {
        const selectedImageUris = result.assets;

        const uploadedImageURIs = selectedImageUris.map((asset) => asset.uri);
        setImageUrl((prevImageUrls) => [
          ...prevImageUrls,
          ...uploadedImageURIs,
        ]);

        const uploadedImageData = selectedImageUris.map((asset) => ({
          name: asset.fileName,
          type: "image/png",
          size: asset.fileSize,
          uri: asset.uri,
        }));
        setImageDataArray((prevImageDataArray) => [
          ...prevImageDataArray,
          ...uploadedImageData,
        ]);
      }
    } catch (error) {}
  };

  const [newEvent, setNewEvent] = useState({
    imgUrl: [],
    cate: "",
    time: "",
    place: "",
    what: "",
    people: "",
  });

  const handleInputChange = (value, name) => {
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);

    formData.append("eventWhat", newEvent.what);
    formData.append("eventWhere", newEvent.place);
    formData.append("withWho", newEvent.people);
    formData.append("eventYear", year);
    formData.append("eventMonth", month);
    formData.append("eventDate", date);

    formData.append(
      "startTime",
      timeField.startTime + ":" + timeField.startMin
    );
    formData.append("endTime", timeField.endTime + ":" + timeField.endMin);

    imageDataArray.forEach((imageData, index) => {
      formData.append(`images`, imageData);
    });

    selected.map((category, index) => {
      formData.append(`categoryIds`, category);
    });

    fetch(`http://13.125.102.163/api/v1/events/${deviceID}/${eventId}`, {
      method: "PUT",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        setIsSubmitting(false);
        router.back();
      })
      .catch((err) => {});
  };

  if (isSubmitting == false) {
    return (
      <SafeAreaView style={styles.Container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <KeyboardAvoidingView
            keyboardVerticalOffset={200}
            behavior={"padding"}
            style={{ flex: 1 }}
          >
            <View style={styles.formHeader}>
              <TouchableOpacity
                style={styles.headerBtn}
                title="이벤트 추가하가"
                onPress={handleSubmit}
              >
                <Text style={styles.headerBtnText}>완료</Text>
              </TouchableOpacity>
            </View>
            <View
              style={{
                alignSelf: "center",
                justifyContent: "center",
                width: "100%",
                height: "50%",
                position: "relative",
              }}
            >
              {imageUrl && imageUrl.length === 0 ? (
                <View
                  style={{
                    flex: 1,
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                  }}
                >
                  <TouchableOpacity
                    onPress={uploadImage}
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      backgroundColor: "#EBEBEB",
                      width: "70%",
                      height: "80%",
                      borderRadius: 10,
                    }}
                  >
                    <Text>No Image</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Carousel
                  loop
                  mode="parallax"
                  width={width}
                  autoPlay={false}
                  data={imageUrl}
                  scrollAnimationDuration={500}
                  style={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                  }}
                  renderItem={({ item, index }) => (
                    <View
                      style={{
                        flex: 1,
                        padding: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        height: "100%",
                      }}
                    >
                      <Image
                        source={{ uri: item }}
                        style={{
                          width: "100%",
                          height: "100%",
                          resizeMode: "contain",
                        }}
                      />
                    </View>
                  )}
                />
              )}
            </View>
            <View style={styles.formTitleContainer}>
              <Text style={styles.formTitleText}>🍪 사진 정보 작성</Text>
            </View>
            <View style={styles.formContainer}>
              <View style={styles.InputContainer}>
                <Text style={styles.InputTitle}>시작 시간</Text>

                <View style={styles.timeInputContainer}>
                  <TextInput
                    id="startTime"
                    style={styles.timeInputBox}
                    onChangeText={(text) =>
                      setTimeField((prevState) => {
                        return { ...prevState, startTime: text };
                      })
                    }
                  />
                  <Text>시</Text>
                  <TextInput
                    id="startMin"
                    style={styles.timeInputBox}
                    onChangeText={(text) =>
                      setTimeField((prevState) => {
                        return { ...prevState, startMin: text };
                      })
                    }
                  />
                  <Text>분</Text>
                </View>
              </View>
              <View style={styles.InputContainer}>
                <Text style={styles.InputTitle}>종료 시간</Text>
                <View style={styles.timeInputContainer}>
                  <TextInput
                    id="endTime"
                    style={styles.timeInputBox}
                    onChangeText={(text) =>
                      setTimeField((prevState) => {
                        return { ...prevState, endTime: text };
                      })
                    }
                  />
                  <Text>시</Text>
                  <TextInput
                    id="endMin"
                    style={styles.timeInputBox}
                    onChangeText={(text) =>
                      setTimeField((prevState) => {
                        return { ...prevState, endMin: text };
                      })
                    }
                  />
                  <Text>분</Text>
                </View>
              </View>
              <View style={styles.InputContainer}>
                <Text style={styles.InputTitle}>장소</Text>
                <TextInput
                  id="place"
                  style={styles.InputBox}
                  placeholder="  장소"
                  value={newEvent.place}
                  onChangeText={(text) => handleInputChange(text, "place")}
                  autoCorrect={false}
                />
              </View>
              <View style={styles.InputContainer}>
                <Text style={styles.InputTitle}>내용</Text>
                <TextInput
                  id="content"
                  style={styles.InputBox}
                  placeholder="  내용"
                  value={newEvent.what}
                  onChangeText={(text) => handleInputChange(text, "what")}
                />
              </View>
              <View style={styles.InputContainer}>
                <Text style={styles.InputTitle}>함께한 사람</Text>
                <TextInput
                  id="people"
                  style={styles.InputBox}
                  placeholder="  사람"
                  value={newEvent.people}
                  onChangeText={(text) => handleInputChange(text, "people")}
                />
              </View>
              <View style={styles.InputContainer}>
                <Text style={styles.InputTitle}>카테고리</Text>
                <View style={styles.dropdownContainer}>
                  <MultiSelect
                    dropdownPosition="top"
                    style={styles.dropdown}
                    placeholderStyle={styles.placeholderStyle}
                    inputSearchStyle={styles.inputSearchStyle}
                    data={items}
                    labelField="label"
                    valueField="value"
                    placeholder="카테고리 추가하기"
                    value={selected}
                    onChange={(item) => {
                      setSelected(item);
                    }}
                    renderSelectedItem={(item, unSelect) => (
                      <TouchableOpacity
                        onPress={() => unSelect && unSelect(item)}
                      >
                        <View
                          style={{
                            ...styles.selectedStyle,
                            backgroundColor: `${item.color}`,
                          }}
                        >
                          <Text style={styles.textSelectedStyle}>
                            #{item.label}
                          </Text>
                          <AntDesign color="black" name="delete" size={13} />
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                </View>
              </View>
            </View>
          </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
      </SafeAreaView>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
};

export default UpdateEventFormScreen;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: "#FFF",
  },
  formContainer: {
    alignContent: "center",
    justifyContent: "center",
  },
  formTitleContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
  },
  formTitleText: {
    display: "flex",
    alignItems: "center",
    fontSize: 23,
    fontWeight: "600",
    marginLeft: 13,
    marginRight: 10,
    marginBottom: 10,
  },
  InputContainer: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginVertical: 9,
    marginHorizontal: 24,
    width: "85%",
    height: "auto",
  },
  InputTitle: {
    width: "auto",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
    width: 100,
  },
  InputBox: {
    borderRadius: 5,
    width: "70%",
    height: 25,
    margin: "auto",
    backgroundColor: "#EBEBEB",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    justifyContent: "center",
  },
  inputBtn: {
    backgroundColor: "white",
    width: 120,
    borderRadius: 5,
    margin: 5,
  },
  formHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "flex-end",
  },
  headerBtn: {
    backgroundColor: "#D9D9D9",
    marginTop: 20,
    marginRight: 20,
    padding: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },
  headerBtnText: {
    fontSize: 16,
    fontWeight: "400",
  },

  imageInputBtn: {
    display: "flex",
    alignSelf: "center",
    width: "auto",
    height: 40,
    position: "relative",
  },
  buttonText: {
    color: "black",
    marginLeft: 0,
  },

  dropdownContainer: {
    width: "70%",
    height: 25,
  },
  dropdown: {
    borderRadius: 5,
    width: "100%",
    height: 25,
    backgroundColor: "#EBEBEB",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    justifyContent: "center",
  },
  placeholderStyle: {
    fontSize: 14,
    marginLeft: 5,
    color: "#aba9a9",
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  selectedStyle: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    height: 25,
    width: "auto",
    margin: 2,
    padding: 3,
    paddingHorizontal: 7,
  },
  textSelectedStyle: {
    marginRight: 5,
    fontSize: 15,
  },

  timeInputBox: {
    borderRadius: 5,
    width: "15%",
    height: 23,
    backgroundColor: "#EBEBEB",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    justifyContent: "center",
    marginHorizontal: 5,
  },
  timeInputContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    width: "70%",
    height: "auto",
  },
});
