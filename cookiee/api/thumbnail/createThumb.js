export const createThumb = async (deviceID, selectedDate, asset) => {
  const formData = new FormData();

  const uploadedImageData = {
    name: asset.fileName,
    type: "image/png",
    size: asset.fileSize,
    uri: asset.uri,
  };

  formData.append("thumbnail", uploadedImageData);
  formData.append("eventYear", selectedDate.year);
  formData.append("eventMonth", selectedDate.month);
  formData.append("eventDate", selectedDate.date);

  try {
    const res = await fetch(
      `https://cookiee.site/api/v1/thumbnails/${deviceID}`,
      {
        method: "POST",
        body: formData,
      }
    );

    if (res.status == 200) {
      return res.ok;
    }
  } catch (err) {
    return null;
  }
};
