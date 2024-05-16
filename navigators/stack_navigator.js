import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "../pages/home";
import { routes } from "../utils/routes";
import MovieDetails from "../pages/movie_details";
import { colors } from "../constants/colors";

const Stack = createNativeStackNavigator();
const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name={routes.home}
        component={Home}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name={routes.movieDetails}
        component={MovieDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default StackNavigator;
