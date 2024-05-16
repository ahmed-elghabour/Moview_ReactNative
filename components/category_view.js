import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MovieCard from "./movie_card";
import { colors } from "../constants/colors";
import { IconButton } from "react-native-paper";

const CategoryView = ({ movies, categoryName }) => {
  const renderMovieItem = ({ item }) => (
    <MovieCard
      title={item.title}
      overview={item.overview}
      id={item.id}
      image={item.backdrop_path}
      poster={item.poster_path}
      rate={item.vote_average}
      date={item.release_date}
      genre={item.genre_ids[0]}
      key={item.id.toString()}
    />
  );
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.categoryName}>{categoryName}</Text>
        <IconButton
          icon="apps"
          iconColor={colors.secondary}
          size={25}
          style={{ position: "absolute", right: 0 }}
          onPress={() => console.log("Pressed")}
        />
      </View>
      <FlatList
        data={movies}
        horizontal
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 250,
  },
  categoryName: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    color: colors.secondary,
  },
});

export default CategoryView;
