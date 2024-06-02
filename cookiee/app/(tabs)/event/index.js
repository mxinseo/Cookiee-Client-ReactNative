import React from "react";
import { Redirect } from "expo-router";

const EventDetailIndex = () => {
  return (
    <Redirect
      href={{
        pathname: "/[eventid]",
        params: {
          deviceID: deviceID,
        },
      }}
    />
  );
};

export default EventDetailIndex;
