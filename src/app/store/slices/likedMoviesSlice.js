import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const removeFavoriteOnServer = createAsyncThunk(
	'likedMovies/removeFavoriteOnServer',
	async (movieId, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`http://localhost:8080/api/v1/favorites/${movieId}`,
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to remove favorite movie'
			);
		}
	}
);

export const addFavoriteOnServer = createAsyncThunk(
	'likedMovies/addFavoriteOnServer',
	async (movieId, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/favorites',
				{ movieIds: [movieId] },
				{
					headers: {
						Authorization: `Bearer ${localStorage.getItem('token')}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to add favorite movie'
			);
		}
	}
);

const likedMoviesSlice = createSlice({
	name: 'likedMovies',
	initialState: JSON.parse(localStorage.getItem('likedMovies')) || [],
	reducers: {
		addMovieToFavorites: (state, action) => {
			state.push(action.payload.id);
			localStorage.setItem('likedMovies', JSON.stringify(state));
		},
		removeMovieFromFavorites: (state, action) => {
			const updatedState = state.filter(id => id !== action.payload.id);
			localStorage.setItem('likedMovies', JSON.stringify(updatedState));
			return updatedState;
		},
		clearMovies: state => {
			localStorage.removeItem('likedMovies');
			return [];
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addFavoriteOnServer.fulfilled, (state, action) => {
				state.push(action.payload.movieId);
				localStorage.setItem('likedMovies', JSON.stringify(state));
			})
			.addCase(removeFavoriteOnServer.fulfilled, (state, action) => {
				const updatedState = state.filter(id => id !== action.payload.movieId);
				localStorage.setItem('likedMovies', JSON.stringify(updatedState));
				return updatedState;
			});
	},
});

export const { addMovieToFavorites, removeMovieFromFavorites, clearMovies } =
	likedMoviesSlice.actions;
export default likedMoviesSlice.reducer;
