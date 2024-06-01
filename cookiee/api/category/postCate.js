import axios from "axios";

export const postCate = async (userId, categoryData) => {
  try {
    const response = await axios.post(
      `https://cookiee.site/category/${userId}`,
      categoryData,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMiIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MDk1MTM4NzcsImV4cCI6MTcxMjEwNTg3N30.ZHC6ZPw6WsTfMR7at4FLkLAjNDU0vOMgfWL1lI3DsOs",
        },
      }
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
