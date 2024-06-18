import React from "react";
import { Redirect } from "expo-router";

const showCookieeIndex = () => {
  return <Redirect href={"/[cate]"} />;
};

export default showCookieeIndex;