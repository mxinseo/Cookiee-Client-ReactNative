import axios from "axios";

export const getEventList = async (userId, year, month, date) => {
  try {
    userId = 34;
    const response = await axios.get(
      `https://cookiee.site/event/view/${userId}`,
      {
        params: { eventYear: year, eventMonth: month, eventDate: date },
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTA2MDg0MzQsImV4cCI6MTcxMzIwMDQzNH0.6-gn5ii_qhFOE5RDSGHphwu7QcvWxbQziZ6Oe-uB5pM",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result; // 업데이트된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error getEventList:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};
