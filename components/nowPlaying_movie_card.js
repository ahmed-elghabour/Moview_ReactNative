import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Pressable,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { routes } from "../utils/routes";
import { getSimilarMovies } from "../redux/slices/movies_slice";
import { LinearGradient } from "expo-linear-gradient";
import { colors } from "../constants/colors";

const NowPlayingMovieCard = ({
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
      <View style={[styles.card]}>
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
          style={styles.image}
        />

        <LinearGradient
          colors={["transparent", colors.primary]}
          style={styles.background}
        />
        <View style={styles.categoryText}>
          <Text style={styles.categoryName}>Now Playing</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 3,
  },
  card: {
    height: Dimensions.get("window").height * 0.6,
    width: Dimensions.get("window").width,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
  },
  categoryText: {
    position: "absolute",
    bottom: 0,
  },
  categoryName: {
    position: "absolute",
    bottom: 50,
    width: Dimensions.get("window").width,
    textAlign: "center",
    color: colors.light,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: 20,
  },
  title: {
    position: "absolute",
    bottom: 20,
    width: Dimensions.get("window").width,
    textAlign: "center",
    color: colors.danger,
    fontWeight: "bold",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 25,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 300,
  },
});

export default NowPlayingMovieCard;
