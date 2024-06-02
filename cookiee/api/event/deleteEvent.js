export const deleteEvent = async (deviceId, eventId) => {
  try {
    const res = await fetch(
      `https://cookiee.site/api/v1/events/${deviceId}/${eventId}`,
      {
        method: "DELETE",
      }
    );

    if (res.status == 200) {
      console.log("이벤트 삭제 통신 성공. LOG의 'ok'가 true인지 확인하세요.");
      console.log(JSON.stringify(res));
      return res.ok;
    }
  } catch (err) {
    console.log("이벤트 삭제 통신 실패");
    console.log(JSON.stringify(err.response));
  }
};
