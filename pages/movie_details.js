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
import { Entypo, FontAwesome, Ionicons } from "@expo/vector-icons";
import CategoryView from "../components/category_view";
import { getSimilarMovies, toggleFavorite } from "../redux/slices/movies_slice";
import { useDispatch, useSelector } from "react-redux";
import { Icon, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

const MovieDetails = ({
  route: {
    params: { id, date, title, genre, overview, image, poster, rate },
  },
}) => {
  const [isFavorited, setIsFavorited] = useState(false);
  const similarMovies = useSelector((state) => state.movies.similarMovies);
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
  console.log(favoriteMovies);

  const navigation = useNavigation();

  // const index = favoriteMovies.findIndex((movie) => movie.id === id);

  const dispatch = useDispatch();

  const handleFavoritePress = () => {
    console.log("Favorite pressed");
    setIsFavorited(!isFavorited);
    dispatch(
      toggleFavorite({ id, date, title, genre, overview, image, poster, rate })
    );
  };

  useEffect(() => {
    console.log(date);
    const isMovieFavorited = favoriteMovies.some((movie) => movie.id === id);
    setIsFavorited(isMovieFavorited);
  }, [id, favoriteMovies]);

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
            flexDirection: "row", // Set flexDirection to row
            justifyContent: "space-between", // Add space between items
            paddingHorizontal: 16, // Add horizontal padding to create space
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
// import React, { useEffect, useState } from "react";
// import {
//   Dimensions,
//   Image,
//   ScrollView,
//   StyleSheet,
//   Text,
//   View,
// } from "react-native";
// import { colors } from "../constants/colors";
// import { LinearGradient } from "expo-linear-gradient";
// import { getNameOfGenre } from "../utils/genre_helper";
// import { FontAwesome } from "@expo/vector-icons";
// import CategoryView from "../components/category_view";
// import { getSimilarMovies } from "../redux/slices/movies_slice";
// import { useSelector, useDispatch } from "react-redux";
// import { Icon, IconButton } from "react-native-paper";

// const MovieDetails = ({
//   route: {
//     params: { id, date, title, genre, overview, image, poster, rate },
//   },
// }) => {
//   const [isFavorited, setIsFavorited] = useState(false);
//   const similarMovies = useSelector((state) => state.movies.similarMovies);
//   const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     getSimilarMovies(id);
//     // Check for pre-existing favorite status (optional)
//     const isMovieFavorited = favoriteMovies.some((movie) => movie.id === id);
//     setIsFavorited(isMovieFavorited);
//   }, [id, favoriteMovies]);

//   const handleFavoritePress = () => {
//     setIsFavorited(!isFavorited);
//     // Dispatch action to add/remove from favorites (implementation depends on your Redux setup)
//     dispatch(/* action to add/remove from favorites */);
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.pageImageHeader}>
//         <Image
//           height={300}
//           width={Dimensions.get("window").width}
//           style={styles.image}
//           blurRadius={5}
//           source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
//         />
//         <LinearGradient
//           colors={["transparent", colors.primary]}
//           style={styles.background}
//         />

//         <IconButton
//           icon={isFavorited ? "heart" : "heart-outline"}
//           iconColor={colors.danger}
//           size={30}
//           style={{ position: "absolute", right: 10, top: 15 }}
//           onPress={handleFavoritePress}
//         />
//       </View>
//       <View
//         style={{
//           width: "100%",
//           position: "absolute",
//           top: 120,
//           alignItems: "center",
//         }}
//       >
//         <Image
//           source={{ uri: `https://image.tmdb.org/t/p/w500${poster}` }}
//           height={240}
//           width={160}
//           borderTopLeftRadius={20}
//           borderTopRightRadius={20}
//         />
//       </View>
//       {/* Details */}
//       <View style={styles.details}>
//         <Text style={styles.title}>{title}</Text>
//         <View style={styles.detailsTextCard}>
//           <Text style={styles.detailsText}>
//             {date} . <FontAwesome name="star" size={16} color="gold" /> {rate} .{" "}
//             {getNameOfGenre(genre)}
//           </Text>
//         </View>
//         <Text style={styles.overview}>{overview}</Text>
//       </View>
//       <CategoryView categoryName="Similar Movies" movies={similarMovies} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   // ... existing styles ...
// });

// export default MovieDetails;
