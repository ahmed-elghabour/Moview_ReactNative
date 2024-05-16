// import React, { useState, useEffect } from "react";
// import { StyleSheet, View, TextInput, FlatList, Text } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { clearSearchResults, searchMovies } from "../redux/slices/movies_slice";
// import MovieCard from "../components/movie_card";

// const Search = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const dispatch = useDispatch();
//   const movies = useSelector((state) => state.movies.filteredMovies);

//   const handleSearch = (text) => {
//     setSearchTerm(text);
//     if (text.length > 0) {
//       dispatch(searchMovies(text));
//     } else {
//       dispatch(clearSearchResults(""));
//     }
//   };

//   useEffect(() => {
//     dispatch(clearSearchResults(""));
//   }, [dispatch]);

//   const renderItem = ({ item }) => (
//     <MovieCard
//       title={item.title}
//       overview={item.overview}
//       id={item.id}
//       image={item.backdrop_path}
//       poster={item.poster_path}
//       rate={item.vote_average}
//       date={item.release_date}
//       genre={item.genre_ids[0]}
//       key={item.id.toString()}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       <TextInput
//         style={styles.searchInput}
//         placeholder="Search Movies"
//         value={searchTerm}
//         onChangeText={handleSearch}
//       />
//       <FlatList
//         data={movies}
//         renderItem={renderItem}
//         keyExtractor={(item) => item.id.toString()}
//         ListEmptyComponent={() => (
//           <Text style={styles.emptyList}>No results found.</Text>
//         )}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 16,
//   },
//   searchInput: {
//     fontSize: 18,
//     padding: 8,
//     borderRadius: 5,
//     backgroundColor: "#f0f0f0",
//     marginBottom: 16,
//   },
//   movieItem: {
//     borderBottomWidth: 1,
//     borderBottomColor: "#ccc",
//     paddingBottom: 8,
//     marginBottom: 8,
//   },
//   movieTitle: {
//     fontSize: 16,
//   },
//   emptyList: {
//     textAlign: "center",
//     marginTop: 16,
//   },
// });

// export default Search;
import React, { useState, useEffect } from "react";
import { StyleSheet, View, TextInput, FlatList, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clearSearchResults, searchMovies } from "../redux/slices/movies_slice";
import MovieCard from "../components/movie_card";
import { colors } from "../constants/colors";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.movies.filteredMovies);
  console.log(movies);

  const handleSearch = (text) => {
    setSearchTerm(text);
    if (text.length > 0) {
      dispatch(searchMovies(text));
    } else {
      dispatch(clearSearchResults(""));
    }
  };

  useEffect(() => {
    dispatch(clearSearchResults(""));
  }, [dispatch]);

  const renderItem = ({ item }) => (
    <View>
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
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search Movies"
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <FlatList
        data={movies}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
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
    padding: 16,
    backgroundColor: colors.primary,
  },
  searchInput: {
    fontSize: 18,
    padding: 8,
    borderRadius: 5,
    backgroundColor: colors.secondary,
    marginBottom: 16,
  },
  columnWrapper: {
    justifyContent: "space-around",
    flex: 1,
  },
  emptyList: {
    textAlign: "center",
    marginTop: 16,
  },
});

export default Search;
