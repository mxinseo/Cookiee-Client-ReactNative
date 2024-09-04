export const collectCate = async (deviceID, categoryId) => {
  try {
    const response = await fetch(
      `http://13.125.102.163/api/v1/categories/collection/${deviceID}/${categoryId}`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    return null;
  }
};

export default collectCate;
