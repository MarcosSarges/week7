import React from "react";
import { StatusBar, YellowBox } from "react-native";
import Router from "./router";

export default () => {
  StatusBar.setBackgroundColor("#1d1d8f");

  return <Router />;
};
