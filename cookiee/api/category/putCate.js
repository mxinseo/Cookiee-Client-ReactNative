export const putCate = async (deviceID, categoryId, categoryData) => {
  try {
    const response = await fetch(
      `https://cookiee.site/api/v1/categories/${deviceID}/${categoryId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      }
    );

    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export default putCate;
