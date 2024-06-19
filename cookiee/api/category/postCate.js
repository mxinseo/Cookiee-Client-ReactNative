import axios from "axios";

export const postCate = async (deviceID, categoryData) => {
  try {
    const response = await axios.post(
      `https://cookiee.site/api/v1/categories/${deviceID}`,
      categoryData
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error updating category data:", error);
    return null;
  }
};

export default postCate;
