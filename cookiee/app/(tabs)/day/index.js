import React from "react";
import { Redirect } from "expo-router";

const BottomModal = () => {
  return (
    <Redirect
      href={{
        pathname: "/[date]",
        params: {
          deviceID: deviceID,
        },
      }}
    />
  );
};

export default BottomModal;
