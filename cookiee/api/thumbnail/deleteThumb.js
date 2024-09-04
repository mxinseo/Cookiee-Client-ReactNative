export const deleteThumb = async (deviceID, thumbnailId) => {
  try {
    const res = await fetch(
      `http://13.125.102.163/api/v1/thumbnails/${deviceID}/${thumbnailId}`,
      {
        method: "DELETE",
      }
    );

    if (res.status == 200) {
      return res.ok;
    }
  } catch (err) {
    return null;
  }
};
