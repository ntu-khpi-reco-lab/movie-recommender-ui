import { configureStore } from '@reduxjs/toolkit';
import genreReducer from './slices/genreSlice';
import likedMoviesReducer from './slices/likedMoviesSlice';
import locationReducer from './slices/locationSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		genre: genreReducer,
		likedMovies: likedMoviesReducer,
		location: locationReducer,
	},
});
