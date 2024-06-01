export const collectCate = async (userId, categoryId) => {
  try {
    const response = await fetch(
      `https://cookiee.site/collection/${userId}/${categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzNCIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MTA2MDg0MzQsImV4cCI6MTcxMzIwMDQzNH0.6-gn5ii_qhFOE5RDSGHphwu7QcvWxbQziZ6Oe-uB5pM",
        },
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
