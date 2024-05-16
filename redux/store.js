import { configureStore } from "@reduxjs/toolkit";
import moviesSlice from "./slices/movies_slice";

export const store = configureStore({
  reducer: {
    movies: moviesSlice,
  },
});

export default store;
