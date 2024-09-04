import axios from "axios";

export const getEventList = async (deviceID, year, month, date) => {
  try {
    const response = await axios.get(
      `http://13.125.102.163/api/v1/events/${deviceID}`,
      {
        params: { eventYear: year, eventMonth: month, eventDate: date },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    return null;
  }
};
