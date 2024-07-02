export const deleteThumb = async (deviceID, thumbnailId) => {
  try {
    const res = await fetch(
      `https://cookiee.site/api/v1/thumbnails/${deviceID}/${thumbnailId}`,
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
