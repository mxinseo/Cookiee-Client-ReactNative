import axios from "axios";

export const getUser = async (userId) => {
  try {
    const response = await axios.get(`https://cookiee.site/users/${userId}`, {
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMiIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MDk1MTM4NzcsImV4cCI6MTcxMjEwNTg3N30.ZHC6ZPw6WsTfMR7at4FLkLAjNDU0vOMgfWL1lI3DsOs",
      },
    });

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result;
  } catch (error) {
    console.error("Error getUser data:", error);
    return null;
  }
};

export default getUser;
