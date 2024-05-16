import React, { memo, useState } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import { routes } from "../utils/routes";
import { getSimilarMovies } from "../redux/slices/movies_slice";

const MovieCard = ({
  id: movieId,
  title,
  image,
  overview,
  poster,
  rate,
  date,
  genre,
}) => {
  const navigation = useNavigation();
  const [isPressed, setIsPressed] = useState(false);
  const dispatch = useDispatch();

  const handleShowMovieDetails = () => {
    dispatch(getSimilarMovies(movieId));
    navigation.navigate(routes.movieDetails, {
      movieId,
      title,
      image,
      overview,
      poster,
      rate,
      date,
      genre,
    });
  };

  return (
    <Pressable
      onPressIn={() => setIsPressed(true)}
      onPressOut={() => setIsPressed(false)}
      onPress={handleShowMovieDetails}
    >
      <View style={[styles.container, { opacity: isPressed ? 0.8 : 1 }]}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
          style={styles.image}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 140,
    flex: 1,
    marginBottom: 20,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#454B66",
    elevation: 5,
    marginLeft: 10,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    width: 140,
    height: 250,
  },
});

export default MovieCard;
