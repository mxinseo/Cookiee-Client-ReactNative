export const deleteCate = async (userId, categoryId) => {
  try {
    const response = await fetch(
      `https://cookiee.site/category/${userId}/${categoryId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMiIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MDk1MTM4NzcsImV4cCI6MTcxMjEwNTg3N30.ZHC6ZPw6WsTfMR7at4FLkLAjNDU0vOMgfWL1lI3DsOs",
        },
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
