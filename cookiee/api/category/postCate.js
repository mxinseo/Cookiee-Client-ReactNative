export const postCate = async (deviceID, categoryData) => {
  try {
    const response = await fetch(
      `https://cookiee.site/api/v1/categories/${deviceID}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
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

export default postCate;
