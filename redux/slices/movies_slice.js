import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIdOfGenre } from "../../utils/genre_helper";
import axios from "axios";

const headers = {
  "Content-Type": "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3N2ViYTAwYzY2NGNlODFiNjdiYzAxODVlZDQzMmQ4MyIsInN1YiI6IjY0YjQ5NjQ1NjI5YjJjMDBiMGJlODg4YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.9NkIYwi8C5CdLQOM6jUw332aE9_bkBxe79mlevIeSQc",
};
const initialState = {
  nowPlayingMovies: [],
  upcomingMovies: [],
  popularMovies: [],
  topratedMovies: [],
  similarMovies: [],

  filteredMovies: [],

  favoriteMovies: [],

  loading: false,
  error: null,
};

export const getNowPlayingMovies = createAsyncThunk(
  "movies/getNowPlayingMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/now_playing",
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getPopularMovies = createAsyncThunk(
  "movies/getPopularMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getUpcomingMovies = createAsyncThunk(
  "movies/getUpcomingMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/upcoming",
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getTopratedMovies = createAsyncThunk(
  "movies/getTopratedMovies",
  async () => {
    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/top_rated",
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

export const getSimilarMovies = createAsyncThunk(
  "movies/getSimilarMovies",
  async (movieID) => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieID}/similar`,
        { headers }
      );
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch movies.");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    searchMovies: (state, action) => {
      const query = action.payload.toLowerCase();

      const allMovies = [
        ...state.nowPlayingMovies,
        ...state.upcomingMovies,
        ...state.popularMovies,
        ...state.topratedMovies,
      ];

      state.filteredMovies = allMovies.filter((movie, index) => {
        return movie.title.toLowerCase().includes(query);
      });
      const seenIds = {};
      state.filteredMovies = state.filteredMovies.filter((movie) => {
        if (!seenIds[movie.id]) {
          seenIds[movie.id] = true;
          return true;
        }
        return false;
      });
    },

    clearSearchResults: (state) => {
      state.filteredMovies = state.movies;
    },

    toggleFavorite: (state, action) => {
      const movieF = action.payload;
      const index = state.favoriteMovies.findIndex(
        (movie) => movie.id === movieF.id
      );
      if (index !== -1) {
        state.favoriteMovies.splice(index, 1);
      } else {
        state.favoriteMovies.push(action.payload);
      }
    },
  },
  extraReducers(builder) {
    builder
      //#region Now Playing
      .addCase(getNowPlayingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNowPlayingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.nowPlayingMovies = action.payload.results;
      })
      .addCase(getNowPlayingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //#endregion
      //#region Upcoming Movies
      .addCase(getUpcomingMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUpcomingMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.upcomingMovies = action.payload.results;
      })
      .addCase(getUpcomingMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //#endregion
      //#region Popular Movies
      .addCase(getPopularMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getPopularMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.popularMovies = action.payload.results;
      })
      .addCase(getPopularMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //#endregion
      //#region Top Rated Movies
      .addCase(getTopratedMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getTopratedMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.topratedMovies = action.payload.results;
      })
      .addCase(getTopratedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      //#endregion
      //#region Similar Movies
      .addCase(getSimilarMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getSimilarMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.similarMovies = action.payload.results;
      })
      .addCase(getSimilarMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
    //#endregion
  },
});

export const {
  searchMovies,
  filterByGenre,
  toggleFavorite,
  clearSearchResults,
  checkIfLiked,
} = movieSlice.actions;
export default movieSlice.reducer;
