import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../pages/favorites";
import { colors } from "../constants/colors";
import { routes } from "../utils/routes";
import StackNavigator from "./stack_navigator";
import { Entypo, AntDesign } from "@expo/vector-icons";
import Search from "../pages/search";

const Tab = createBottomTabNavigator();

const getTabBarOptions = (name) => {
  return {
    headerShown: false,
    tabBarIcon: ({ focused }) => {
      return focused ? (
        <Entypo name={name} color={colors.light} size={32} />
      ) : (
        <Entypo name={name} color={colors.primary} size={23} />
      );
    },
    tabBarShowLabel: false, // ({ focused }) => (focused ? false : true),

    tabBarLabelStyle: ({ focused }) => {
      focused
        ? { color: colors.white, fontWeight: "bold" }
        : { color: colors.primary };
    },
    tabBarStyle: {
      borderBlockColor: "transparent",
      backgroundColor: colors.secondary,
      padding: 4,
    },
  };
};

export default function BottomTabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.tab}
        component={StackNavigator}
        options={getTabBarOptions("home")}
      />
      <Tab.Screen
        name="Favorites"
        component={Favorites}
        options={[
          getTabBarOptions("heart"),
          // { headerShown: true, backgroundColor: colors.primary },
        ]}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={[
          (headerShown = false),
          (tabBarIcon = ({ focused }) => {
            return focused ? (
              <AntDesign name={"search1"} color={colors.light} size={32} />
            ) : (
              <AntDesign name={"search1"} color={colors.primary} size={23} />
            );
          }),

          // getTabBarOptions("search"),
          // { headerShown: true, backgroundColor: colors.primary },
        ]}
      />
    </Tab.Navigator>
  );
}
