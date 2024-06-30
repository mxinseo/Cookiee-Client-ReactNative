export const collectCate = async (deviceID, categoryId) => {
  console.log(deviceID + categoryId);
  try {
    const response = await fetch(
      `https://cookiee.site/api/v1/categories/collection/1334001D-FDC6-49B0-A7AC-0B8C16CCD3A7/77`,
      {
        method: "GET",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();

    console.log(data);
    return data.result;
  } catch (error) {
    console.error("Error updating category data:", error);
    return null;
  }
};

export default collectCate;
