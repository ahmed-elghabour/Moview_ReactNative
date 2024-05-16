import React from "react";
import { Dimensions, FlatList, Image, StyleSheet, View } from "react-native";
import NowPlayingMovieCard from "./nowPlaying_movie_card";

const NowPlayingCategory = ({ movies }) => {
  const renderMovieItem = ({ item }) => (
    <NowPlayingMovieCard
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
      <FlatList
        data={movies}
        horizontal
        renderItem={renderMovieItem}
        keyExtractor={(item) => item.id.toString()}
        showsHorizontalScrollIndicator={false}
        snapToInterval={Dimensions.get("window").width}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  card: {
    height: Dimensions.get("window").height * 0.5,
    width: Dimensions.get("window").width,
  },
  image: {
    flex: 1,
  },
});

export default NowPlayingCategory;
