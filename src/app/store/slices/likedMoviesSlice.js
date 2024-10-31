import { createSlice } from '@reduxjs/toolkit';

const likedMoviesSlice = createSlice({
	name: 'likedMovies',
	initialState: [],
	reducers: {
		toggleMovie: (state, action) => {
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

export const { toggleMovie, clearMovies } = likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
