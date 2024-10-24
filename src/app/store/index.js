import { configureStore } from '@reduxjs/toolkit';
import likedMoviesReducer from './slices/likedMoviesSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		likedMovies: likedMoviesReducer,
	},
});
