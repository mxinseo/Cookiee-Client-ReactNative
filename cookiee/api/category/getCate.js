import axios from "axios";

export const getCate = async (deviceID) => {
  try {
    const response = await axios.get(
      `http://13.125.102.163/api/v1/categories/${deviceID}`
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    return null;
  }
};

export default getCate;
