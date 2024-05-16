import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { colors } from "../constants/colors";
import { LinearGradient } from "expo-linear-gradient";
import { getNameOfGenre } from "../utils/genre_helper";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import CategoryView from "../components/category_view";
import { toggleFavorite } from "../redux/slices/movies_slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";

const MovieDetails = ({
  route: {
    params: { id, date, title, genre, overview, image, poster, rate },
  },
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const similarMovies = useSelector((state) => state.movies.similarMovies);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  const navigation = useNavigation();

  // const index = favoriteMovies.findIndex((movie) => movie.id === id);

  const dispatch = useDispatch();

  const handleFavoritePress = () => {
    console.log("Favorite pressed");
    const haha = favoriteMovies.filter((movie) => {
      return movie.id === id;
    });
    console.log(haha);
    if (haha) setIsFavorited(true);
    else setIsFavorited(false);

    dispatch(
      toggleFavorite({ id, date, title, genre, overview, image, poster, rate })
    );
  };

  useEffect(() => {
    if (favoriteMovies) {
      const isMovieFavorited = favoriteMovies.some((movie) => movie.id === id);
      setIsFavorited(isMovieFavorited);
    }
  }, [id, favoriteMovies, isFavorited]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.pageImageHeader}>
        <Image
          height={300}
          width={Dimensions.get("window").width}
          style={styles.image}
          blurRadius={5}
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
        />
        <LinearGradient
          colors={["transparent", colors.primary]}
          style={styles.background}
        />

        <View
          style={{
            position: "absolute",
            top: 30,
            width: Dimensions.get("window").width,
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <Ionicons
            name={"arrow-back"}
            color={colors.danger}
            size={35}
            onPress={navigation.goBack}
          />
          <Ionicons
            name={isFavorited ? "heart" : "heart-outline"}
            color={colors.danger}
            size={35}
            onPress={handleFavoritePress}
          />
        </View>
      </View>
      <View
        style={{
          width: "100%",
          position: "absolute",
          top: 120,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
          height={240}
          width={160}
          borderTopLeftRadius={20}
          borderTopRightRadius={20}
        />
      </View>
      {/* Details */}
      <View style={styles.details}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.detailsTextCard}>
          <Text style={styles.detailsText}>
            {date} . <FontAwesome name="star" size={16} color="gold" /> {rate} .{" "}
            {getNameOfGenre(genre)}
          </Text>
        </View>
        <Text style={styles.overview}>{overview}</Text>
      </View>
      <CategoryView categoryName="Similar Movies" movies={similarMovies} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.primary,
  },
  pageImageHeader: {
    height: 300,
    width: Dimensions.get("window").width,
  },
  image: {
    flex: 1,
    resizeMode: "cover",
    height: 300,
  },
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 100,
  },
  details: {
    marginTop: 70,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.light,
    textAlign: "center",
  },
  detailsTextCard: {
    backgroundColor: colors.secondary,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 4,
    borderRadius: 50,
    marginHorizontal: 16,
    marginVertical: 8,
  },
  detailsText: {
    color: colors.descriptionText,
    fontSize: 18,
    textAlign: "center",
  },
  overview: {
    color: colors.light,
    marginHorizontal: 16,
    fontSize: 20,
    textAlign: "center",
  },
});

export default MovieDetails;
