import React from "react";
import { Redirect } from "expo-router";

const EventDetailIndex = () => {
  return <Redirect href={"/[eventid]"} />;
};

export default EventDetailIndex;
