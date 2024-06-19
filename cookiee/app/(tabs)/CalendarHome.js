import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState, useCallback } from "react";
import { useNavigation } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import {
  router,
  useRouter,
  useLocalSearchParams,
  useFocusEffect,
} from "expo-router";

import { getThumb } from "../../api/thumbnail/getThumb";

export default function CalendarHome({navigation}) {
  const router = useRouter();
  const { deviceID } = useLocalSearchParams();

  const DATE = new Date();
  const YEAR = DATE.getFullYear();
  const MONTH = DATE.getMonth() + 1;
  const DAY = DATE.getDate();
  const today = { year: YEAR, month: MONTH, date: DAY };

  const [month, setMonth] = useState(MONTH);
  const [year, setYear] = useState(YEAR);
  const [date, setDate] = useState(DAY);

  const moveToNextMonth = (month) => {
    if (month === 12) {
      setYear((previousYear) => previousYear + 1);
      setMonth(1);
    } else {
      setMonth((previousMonth) => previousMonth + 1);
    }
  };

  const moveToPreviousMonth = (month) => {
    if (month === 1) {
      setYear((previousYear) => previousYear - 1);
      setMonth(12);
    } else {
      setMonth((previousMonth) => previousMonth - 1);
    }
  };

  const moveToSpecificYearAndMonth = (year, month) => {
    setYear(year);
    setMonth(month);
  };

  return (
    <SafeAreaView style={S.calendarContainer}>
      <View style={S.titleHeader}>
        <TouchableOpacity
          style={S.menuIcon}
          onPress={() => router.push("sidebar")}
        >
          <Ionicons name="menu" size={40} color="#594E4E" />
        </TouchableOpacity>
        <Text style={S.title}>Cookiee</Text>
      </View>

      <Header
        month={month}
        year={year}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
      <Body
        month={month}
        year={year}
        today={today}
        date={date}
        deviceID={deviceID}
        moveToNextMonth={moveToNextMonth}
        moveToPreviousMonth={moveToPreviousMonth}
        moveToSpecificYearAndMonth={moveToSpecificYearAndMonth}
      />
    </SafeAreaView>
  );
}

function Header(props) {
  return (
    <>
      <View style={S.header}>
        <Pressable
          onPress={props.moveToPreviousMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-back" size={24} color="#594E4E" />
        </Pressable>
        <View style={S.monthBar}>
          <Text style={S.monthBarText}>{props.year}년 </Text>
          <Text style={S.monthBarText}>{props.month}월 </Text>
        </View>
        <Pressable
          onPress={props.moveToNextMonth.bind(this, props.month)}
          style={({ pressed }) => pressed && S.pressed}
        >
          <Ionicons name="chevron-forward" size={24} color="#594E4E" />
        </Pressable>
      </View>
    </>
  );
}

//Year,Monty,date
function Body(props) {
  const [totalDays, setTotalDays] = useState({});
  const [pressedDate, setPressedDate] = useState({
    state: "",
    year: 0,
    month: 0,
    date: 0,
  });
  const { year, month, date, deviceID } = props;

  useEffect(() => {
    getTotalDays(year, month);
  }, [year, month, date]);

  const getTotalDays = (year, month) => {
    const previousMonthLastDate = new Date(year, month - 1, 0).getDate(); //이 전달의 마지막 날짜 체크
    const previousMonthLastDay = new Date(year, month - 1, 0).getDay(); //이 전 달의 마지막 날짜의 요일
    const currentMonthLastDate = new Date(year, month, 0).getDate();
    const currentMonthLastDay = new Date(year, month, 0).getDay();

    const previousDays = Array.from(
      { length: previousMonthLastDay + 1 },
      (v, i) => previousMonthLastDate - previousMonthLastDay + i
    );
    const currentDays = Array.from(
      { length: currentMonthLastDate },
      (v, i) => i + 1
    );
    const nextDays = Array.from(
      { length: 6 - currentMonthLastDay },
      (v, i) => i + 1
    );
    setTotalDays({
      prev: {
        daysList: previousMonthLastDay !== 6 ? previousDays : [],
        year: month === 1 ? year - 1 : year,
        month: month === 1 ? 12 : month - 1,
      },
      curr: { daysList: currentDays, year: year, month: month },
      next: {
        daysList: nextDays,
        year: month === 12 ? year + 1 : year,
        month: month === 12 ? 1 : month + 1,
      },
    });
  };

  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {}, [pressedDate]);

  const handlePressDay = (date) => {
    setPressedDate(date);
    setSelectedDate(date);

    if (date.state === "prev" || date.state === "next") {
      props.moveToSpecificYearAndMonth(date.year, date.month);
    }
    stringifyDate(date);
  };

  const stringifyDate = (date) => {
    if (date.date != null) {
      let data = {
        year: date.year,
        month: date.month,
        date: date.date,
      };
      let daykey = JSON.stringify(data);
      router.push({
        pathname: `day/${daykey}`,
        params: {
          deviceID: deviceID,
        },
      });
    }
  };

  // 썸네일 불러오기
  const [thumbnailUris, setThumbnailUris] = useState();

  useFocusEffect(
    useCallback(() => {
      let completed = false; // 첫 번째 1회 실행을 위한 flag

      async function get() {
        try {
          const result = await getThumb(deviceID);

          if (!completed && result != null) {
            setThumbnailUris(result);
          }
        } catch (error) {
          console.log(error);
        }
      }

      get(); // Call the function immediately

      return () => {
        completed = true;
      };
    }, [])
  );
  const findThumbUriByDay = (selectedDate) => {
    if (thumbnailUris != null) {
      const thumbnail = thumbnailUris.find(
        (thumb) =>
          thumb.eventYear === selectedDate.year &&
          thumb.eventMonth === selectedDate.month &&
          thumb.eventDate === selectedDate.date
      );

      if (thumbnail != null) {
        if (thumbnail.thumbnailUrl != undefined) {
          return thumbnail.thumbnailUrl;
        }
      }
    }
  };

  function isSameObj(obj1, obj2) {
    return JSON.stringify(obj1) === JSON.stringify(obj2);
  }

  return (
    <View style={S.calendarBody}>
      <View style={S.dayOfWeek}>
        {dayOfWeek.map((day, idx) => (
          <View style={S.weekBox} key={idx}>
            <Text style={S.dayOfWeek}>{day}</Text>
          </View>
        ))}
      </View>
      <View style={S.totalDays}>
        {Object.keys(totalDays).map((state) =>
          totalDays[state].daysList.map((day) => {
            const checkPressedDate = {
              state: state,
              year: totalDays[state].year,
              month: totalDays[state].month,
              date: day,
            };
            return (
              <View style={S.box} key={uuidv4()}>
                <ImageBackground
                  source={{ uri: findThumbUriByDay(checkPressedDate) }}
                  imageStyle={{ borderRadius: 5 }}
                  style={{
                    width: "100%",
                    height: "100%",
                    zIndex: "0",
                    position: "relative",
                    alignContent: "center",
                    justifyContent: "center",
                    borderRadius: 50,
                  }}
                  resizeMode="cover"
                >
                  <TouchableOpacity
                    onPress={() => {
                      handlePressDay(checkPressedDate);
                    }}
                    style={
                      (({ pressed }) => {
                        return [
                          pressedDate.date === checkPressedDate.date &&
                          pressedDate.month === checkPressedDate.month &&
                          pressedDate.year === checkPressedDate.year
                            ? S.pressedDate
                            : null,
                          pressed && S.pressed,
                        ];
                      },
                      S.day)
                    }
                  >
                    <Text
                      style={[
                        [
                          isSameObj(
                            { state: "curr", ...props.today },
                            checkPressedDate
                          )
                            ? S.today
                            : state === "prev" || state === "next"
                            ? S.prev
                            : S.curr,
                        ],
                      ]}
                    >
                      {day}
                    </Text>
                  </TouchableOpacity>
                </ImageBackground>
              </View>
            );
          })
        )}
      </View>
    </View>
  );
}

const dayOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const S = StyleSheet.create({
  calendarContainer: {
    flex: 1,
    width: "100%",
    minHeight: "50%",
    borderBottomColor: "black",
    backgroundColor: "#FFFFFF",
  },
  header: {
    paddingTop: 20,
    marginTop: 10,
    marginBottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#F6F1E4",

    borderStyle: "solid",
    borderColor: "#9e988a",
    borderTopWidth: 0.2,
  },
  dayOfWeek: {
    marginHorizontal: 1,
    flexDirection: "row",
    color: "#594E4E",
  },
  totalDays: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  box: {
    width: "14%",
    height: 95,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 1,
    marginHorizontal: 0.5,
    backgroundColor: "white",
    borderRadius: "5%",
    position: "relative",
    zIndex: 1,
  },
  weekBox: {
    width: "14.2%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  prev: {
    color: "gray",
    fontSize: 20,
  },
  next: {
    color: "gray",
    fontSize: 20,
  },
  curr: {
    color: "black",
    fontSize: 20,
  },
  today: {
    color: "#2196f3",
    fontSize: 20,
  },
  pressedDate: {
    width: 40,
    height: 40,
    backgroundColor: "white",
    borderWidth: 1,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.3,
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
  calendarBody: {
    backgroundColor: "#F6F1E4",
    paddingBottom: 10,
    height: "100%",
  },
  monthBar: {
    flexDirection: "row",
  },
  monthBarText: {
    fontSize: 20,
    color: "#594E4E",
  },
  line: {
    marginTop: 20,
    marginBottom: 1,
    backgroundColor: "#D9D9D9",
    height: 0.5,
  },
  day: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "center",
    position: "relative",
    zIndex: 5,
  },
});
