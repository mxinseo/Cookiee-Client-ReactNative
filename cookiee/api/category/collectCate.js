export const collectCate = async (deviceID, categoryId) => {
  console.log(deviceID + categoryId);
  try {
    const response = await fetch(
      `https://cookiee.site/api/v1/categories/collection/${deviceID}/${categoryId}`,
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
    console.error("Error updating category data:", error);
    return null;
  }
};

export default collectCate;
