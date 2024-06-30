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

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating category data:", error);
    return null;
  }
};

export default putCate;
