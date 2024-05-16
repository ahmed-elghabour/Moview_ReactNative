import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Favorites from "../pages/favorites";
import { colors } from "../constants/colors";
import { routes } from "../utils/routes";
import StackNavigator from "./stack_navigator";
import { Entypo, AntDesign, Ionicons } from "@expo/vector-icons";
import Search from "../pages/search";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

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
    tabBarShowLabel: false,
    tabBarStyle: {
      borderBlockColor: "transparent",
      backgroundColor: colors.secondary,
      padding: 4,
    },
  };
};

export default function BottomTabs() {
  const navigation = useNavigation();
  return (
    <Tab.Navigator>
      <Tab.Screen
        name={routes.tab}
        component={StackNavigator}
        options={getTabBarOptions("home")}
      />
      <Tab.Screen
        name={routes.favorites}
        component={Favorites}
        options={{
          ...getTabBarOptions("heart"),
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.secondary,
            shadowColor: "transparent",
            elevation: 0,
          },
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Ionicons
                name="arrow-back"
                size={24}
                color={colors.primary}
                style={{ marginLeft: 10 }}
              />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <Entypo
              name={"heart"}
              color={focused ? colors.light : colors.primary}
              size={focused ? 32 : 23}
            />
          ),
        }}
      />
      <Tab.Screen
        name={routes.search}
        component={Search}
        options={{
          ...getTabBarOptions("search1"),
          tabBarIcon: ({ focused }) => (
            <AntDesign
              name={"search1"}
              color={focused ? colors.light : colors.primary}
              size={focused ? 32 : 23}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
