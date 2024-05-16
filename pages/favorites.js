import React from "react";
import { View, Text, FlatList, Image, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import MovieCard from "../components/movie_card";
import { colors } from "../constants/colors";

const FavoriteMoviesPage = () => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.index}
        renderItem={(item) => <MovieCard {...item.item} />}
        ListEmptyComponent={() => (
          <Text style={styles.emptyList}>No results found.</Text>
        )}
        numColumns={2}
        columnWrapperStyle={styles.columnWrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
    padding: 16,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginTop: 10,
  },
  emptyList: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },
});

export default FavoriteMoviesPage;
