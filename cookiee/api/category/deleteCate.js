export const deleteCate = async (deviceID, categoryId) => {
  try {
    const response = await fetch(
      `https://cookiee.site/api/v1/categories/${deviceID}/${categoryId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("Error deleting category:", errorData);
      throw new Error("Failed to delete category");
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(categoryId);
    console.error("Error deleting category:", error);
    throw error;
  }
};

export default deleteCate;
