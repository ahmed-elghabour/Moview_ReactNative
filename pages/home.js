import React, { useEffect } from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { colors } from "../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  getNowPlayingMovies,
  getPopularMovies,
  getTopratedMovies,
  getUpcomingMovies,
} from "../redux/slices/movies_slice";
import NowPlayingCategory from "../components/nowPlaying_category";
import CategoryView from "../components/category_view";

export default function Home({ navigation }) {
  const dispatch = useDispatch();
  const { nowPlayingMovies, upcomingMovies, popularMovies, topratedMovies } =
    useSelector((state) => state.movies);

  useEffect(() => {
    dispatch(getNowPlayingMovies());
    dispatch(getPopularMovies());
    dispatch(getUpcomingMovies());
    dispatch(getTopratedMovies());
  }, []);

  return (
    <ScrollView style={styles.screen}>
      <NowPlayingCategory movies={nowPlayingMovies} />
      <View style={{ flex: 3 }}>
        <CategoryView
          movies={upcomingMovies}
          categoryName={"Upcoming"}
        ></CategoryView>
        <CategoryView
          movies={popularMovies}
          categoryName={"Popular"}
        ></CategoryView>
        <CategoryView
          movies={topratedMovies}
          categoryName={"Top Rated"}
        ></CategoryView>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.primary,
  },
});
