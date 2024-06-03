import axios from "axios";

export const getCate = async (deviceID) => {
  try {
    const response = await axios.get(
      `https://cookiee.site/api/v1/events/${deviceID}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result; // 업데이트된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error updating category data:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};

export default getCate;
