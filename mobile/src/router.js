import React from "react";
import { Image } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
//   createMaterialTopTabNavigator
import Feed from "./pages/Feed";
import New from "./pages/New";
import logo from "./assets/logo.png";

export default createAppContainer(
  createStackNavigator(
    {
      Feed,
      New
    },
    {
      // initialRouteName: "New",
      defaultNavigationOptions: {
        headerTitle: <Image source={logo} style={{ marginHorizontal: 20 }} />,
        headerBackTitle: null,
        headerTintColor: "#000"
      },
      mode: "modal"
    }
  )
  //   createMaterialTopTabNavigator(
  //     {
  //       Feed,
  //       New
  //     },
  //     {
  //       //   lazy: true,
  //       //   swipeEnabled: true
  //       optimizationsEnabled: true
  //     }
  //   )
);
