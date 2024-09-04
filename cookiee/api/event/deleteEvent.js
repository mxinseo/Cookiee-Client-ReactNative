export const deleteEvent = async (deviceId, eventId) => {
  try {
    const res = await fetch(
      `http://13.125.102.163/api/v1/events/${deviceId}/${eventId}`,
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
