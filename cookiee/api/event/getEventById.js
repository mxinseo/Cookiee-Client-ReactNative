import axios from "axios";

export const getEventById = async (deviceID, eventId) => {
  try {
    const response = await axios.get(
      `https://cookiee.site/api/v1/events/${deviceID}/${eventId}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    return null;
  }
};
