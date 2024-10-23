import { configureStore } from '@reduxjs/toolkit';
import likedMoviesReducer from './slices/likedMoviesSlice'; // Импортируем новый редюсер
import userReducer from './slices/userSlice';

export const store = configureStore({
	reducer: {
		user: userReducer,
		likedMovies: likedMoviesReducer, // Добавляем его в reducer
	},
});
