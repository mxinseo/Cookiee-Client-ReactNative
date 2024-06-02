import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Dimensions,
  Image,
  ActivityIndicatorComponent,
  ActivityIndicator,
} from "react-native";
import React, { useState, useCallback } from "react";

import { useGlobalSearchParams, useRouter, useFocusEffect } from "expo-router";

import * as ImagePicker from "expo-image-picker";
import Carousel from "react-native-reanimated-carousel";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import getCate from "../../../api/category/getCate";
import { MultiSelect } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";

const AddEventFormScreen = () => {
  const router = useRouter();
  const { year, month, date } = useGlobalSearchParams();

  selectedDate = { year: year, month: month, date: date };

  const width = Dimensions.get("window").width;

  const [items, setItems] = useState([]);
  const [selected, setSelected] = useState([]);

  const [userId, setUserId] = useState(34);

  useFocusEffect(
    useCallback(() => {
      async function get() {
        try {
          const result = await getCate(userId);
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
                  console.log(presentCate);
                  presentCates.push(presentCate);
                }
              }

              setItems([...presentCates, ...items]);
            }
          } else {
            console.error("getCate returned undefined or null result");
          }
        } catch (error) {
          console.log(error);
        }
      }

      get();
    }, [userId])
  );

  const [startTime, setStartTime] = useState(new Date()); // 선택 시작 날짜
  const [endTime, setEndTime] = useState(new Date()); // 선택 종료 날짜

  const [startOrEnd, setStartOrEnd] = useState("start");
  const [visible, setVisible] = useState(false); // 모달 노출 여부

  const onPressStartTime = () => {
    // 시작 시간 클릭 시
    setStartOrEnd("start");
    setVisible(true); // 모달 open
  };

  const onPressEndTime = () => {
    // 종료 시간 클릭 시
    setStartOrEnd("end");
    setVisible(true); // 모달 open
  };

  const onConfirm = (selected) => {
    // 날짜 또는 시간 선택 시
    if (startOrEnd == "start") {
      setStartTime(selected);
    } else {
      setEndTime(selected);
    }

    setVisible(false); // 모달 close
    console.log(startTime.getHours());
    console.log(typeof startTime.getHours());

    handleInputChange(
      startTime.getHours() +
        ":" +
        startTime.getMinutes() +
        " - " +
        endTime.getHours() +
        ":" +
        endTime.getMinutes(),
      "time"
    );
  };

  const onCancel = () => {
    // 취소 시
    setVisible(false); // 모달 close
  };

  /* 이미지 업로드 구현 */
  const formData = new FormData();
  const [imageUrl, setImageUrl] = useState([]);
  const [imageDataArray, setImageDataArray] = useState([]);

  const [status, requestPermission] = ImagePicker.useMediaLibraryPermissions();

  const uploadImage = async () => {
    // 권한 확인 코드: 권한 없으면 물어보고, 승인하지 않으면 함수 종료
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

      // 이미지 업로드 취소한 경우
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
    } catch (error) {
      console.error("Error while picking image:", error);
    }
  };

  const [newEvent, setNewEvent] = useState({
    year: selectedDate.year,
    month: selectedDate.month,
    date: selectedDate.date,
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

    // 입력 필드 초기화
    setNewEvent({
      year: selectedDate.year,
      month: selectedDate.month,
      date: selectedDate.date,
      imgUrl: [],
      cate: "",
      time: "",
      place: "",
      what: "",
      people: "",
    });

    // FormData
    formData.append("eventWhat", newEvent.what);
    formData.append("eventWhere", newEvent.place);
    formData.append("withWho", newEvent.people);
    formData.append("eventYear", selectedDate.year);
    formData.append("eventMonth", selectedDate.month);
    formData.append("eventDate", selectedDate.date);
    formData.append(
      "startTime",
      startTime.getHours() + ":" + startTime.getMinutes()
    );
    formData.append("endTime", endTime.getHours() + ":" + endTime.getMinutes());

    imageDataArray.forEach((imageData, index) => {
      formData.append(`images`, imageData);
    });

    selected.map((category, index) => {
      formData.append(`categoryIds`, category);
    });

    console.log("이벤트 정보 확인");
    // console.log(formData.getAll("images"));
    // console.log(formData.getAll("eventWhat"));
    // console.log(formData.getAll("eventWhere"));
    // console.log(formData.getAll("withWho"));
    // console.log(formData.getAll("eventYear"));
    // console.log(formData.getAll("eventMonth"));
    // console.log(formData.getAll("eventDate"));
    // console.log(formData.getAll("categoryIds"));
    // console.log(formData.getAll("startTime"));
    // console.log(formData.getAll("endTime"));

    console.log("fetch 시도");
    fetch(`https://cookiee.site/event/${userId}`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTA2MDg0MzQsImV4cCI6MTcxMzIwMDQzNH0.6-gn5ii_qhFOE5RDSGHphwu7QcvWxbQziZ6Oe-uB5pM",
      },
    })
      .then((res) => {
        console.log("이벤트 등록 통신 성공. LOG의 'ok'가 true인지 확인하세요.");
        console.log(JSON.stringify(res));
        setIsSubmitting(false);
        router.back();
      })
      .catch((err) => {
        console.log("이벤트 등록 통신 실패");
        console.log(JSON.stringify(err.response));
      });
  };

  if (isSubmitting == false) {
    return (
      <View style={styles.Container}>
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
            // 이미지가 업로드되지 않았을 때
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
            // 이미지가 업로드된 후
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
            <TouchableOpacity
              onPress={onPressStartTime}
              style={styles.InputBox}
            >
              <Text style={styles.buttonText}>
                {"  "}
                {startTime != null
                  ? startTime.getHours() + " : " + startTime.getMinutes()
                  : "시간"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={visible}
              mode={"time"}
              onConfirm={onConfirm}
              onCancel={onCancel}
              date={startTime}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>종료 시간</Text>
            <TouchableOpacity onPress={onPressEndTime} style={styles.InputBox}>
              <Text style={styles.buttonText}>
                {"  "}
                {endTime != null
                  ? endTime.getHours() + " : " + endTime.getMinutes()
                  : "시간"}
              </Text>
            </TouchableOpacity>
            <DateTimePickerModal
              isVisible={visible}
              mode={"time"}
              onConfirm={onConfirm}
              onCancel={onCancel}
              date={endTime}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>장소</Text>
            <TextInput
              style={styles.InputBox}
              placeholder="  장소"
              value={newEvent.place}
              onChangeText={(text) => handleInputChange(text, "place")}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>내용</Text>
            <TextInput
              style={styles.InputBox}
              placeholder="  내용"
              value={newEvent.what}
              onChangeText={(text) => handleInputChange(text, "what")}
            />
          </View>
          <View style={styles.InputContainer}>
            <Text style={styles.InputTitle}>함께한 사람</Text>
            <TextInput
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
                // mode="modal"
                dropdownPosition="top"
                style={styles.dropdown}
                placeholderStyle={styles.placeholderStyle}
                inputSearchStyle={styles.inputSearchStyle}
                data={items}
                labelField="label"
                valueField="value"
                imagef
                placeholder="카테고리 추가하기"
                value={selected}
                onChange={(item) => {
                  setSelected(item);
                  console.log(item);
                }}
                renderSelectedItem={(item, unSelect) => (
                  <TouchableOpacity onPress={() => unSelect && unSelect(item)}>
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
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size={"large"} />
      </View>
    );
  }
};

export default AddEventFormScreen;

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
    fontSize: 23,
    fontWeight: "600",
    marginLeft: 13,
    marginRight: 10,
    marginBottom: 10,
  },
  InputContainer: {
    flexDirection: "row",
    alignContent: "center",
    justifyContent: "space-between",
    marginVertical: 9,
    marginHorizontal: 24,
    width: "auto",
    height: "auto",
  },
  InputTitle: {
    width: "auto",
    alignSelf: "center",
    fontSize: 16,
    fontWeight: "500",
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

  //이미지 추가 버튼
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

  // 드롭다운
  dropdownContainer: {
    width: "70%",
    height: 25,
  },
  dropdown: {
    borderRadius: 5,
    width: "100%",
    height: 25,
    margin: "auto",
    backgroundColor: "#EBEBEB",
    borderColor: "black",
    borderStyle: "solid",
    borderWidth: 0.5,
    justifyContent: "center",
    marginBottom: 5,
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
});
