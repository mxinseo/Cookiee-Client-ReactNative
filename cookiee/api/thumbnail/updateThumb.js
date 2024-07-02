export const updateThumb = async (deviceID, thumbId, imageData) => {
  const formData = new FormData();

  const uploadedImageData = {
    name: imageData.fileName,
    type: "image/png",
    size: imageData.fileSize,
    uri: imageData.uri,
  };

  formData.append("thumbnail", uploadedImageData);

  try {
    const res = await fetch(
      `https://cookiee.site/api/v1/thumbnails/${deviceID}/${thumbId}`,
      {
        method: "PUT",
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
