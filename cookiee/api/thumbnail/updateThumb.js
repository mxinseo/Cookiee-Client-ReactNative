export const updateThumb = async (deviceID, thumbId, imageData) => {
  const formData = new FormData();

  const uploadedImageData = {
    name: imageData.fileName,
    type: "image/png",
    size: imageData.fileSize,
    uri: imageData.uri,
  };

  formData.append("thumbnail", uploadedImageData);
  console.log(formData.getAll("thumbnail"));

  try {
    const res = await fetch(
      `https://cookiee.site/api/v1/thumbnails/${deviceID}/${thumbId}`,
      {
        method: "PUT",
        body: formData,
      }
    );

    if (res.status == 200) {
      console.log("썸네일 수정 통신 성공. LOG의 'ok'가 true인지 확인하세요.");
      console.log(JSON.stringify(res));
      return res.ok;
    }
  } catch (err) {
    console.log("썸네일 수정 통신 실패");
    console.log(JSON.stringify(err.response));
  }
};
