import { createSlice } from '@reduxjs/toolkit';

const likedMoviesSlice = createSlice({
	name: 'likedMovies',
	initialState: [],
	reducers: {
		addMovie: (state, action) => {
			const existingMovie = state.find(movie => movie.id === action.payload.id);
			if (!existingMovie) {
				state.push(action.payload);
			} else {
				return state.filter(movie => movie.id !== action.payload.id);
			}
		},
		clearMovies: state => {
			return [];
		},
	},
});

export const { addMovie, clearMovies } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
