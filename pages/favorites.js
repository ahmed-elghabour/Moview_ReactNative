import React from "react";
import { View, Text, FlatList, Image } from "react-native";
import { useSelector } from "react-redux";

const FavoriteMoviesPage = () => {
  const favoriteMovies = useSelector((state) => state.movies.favoriteMovies);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      {/* <Text style={{ fontSize: 20, fontWeight: "bold", margin: 10 }}>
        Favorite Movies
      </Text> */}
      <FlatList
        data={favoriteMovies}
        keyExtractor={(item) => item.title.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginVertical: 5,
            }}
          >
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster}` }}
              style={{ width: 50, height: 75, marginRight: 10 }}
            />
            <Text>{item.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default FavoriteMoviesPage;
