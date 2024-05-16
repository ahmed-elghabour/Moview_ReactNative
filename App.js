import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Home from "./pages/home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MovieDetails from "./pages/movie_details";
import { NavigationContainer } from "@react-navigation/native";
import { routes } from "./utils/routes";
import { Provider } from "react-redux";
import store from "./redux/store";
import BottomTabs from "./navigators/bottomNavigator";
// import StackNavigator from "./navigators/stack_navigator";
// import HomeScreen from "./pages/home";

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <BottomTabs></BottomTabs>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
