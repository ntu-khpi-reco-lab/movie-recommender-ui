import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchGenres as fetchGenresAPI } from '../../../shared/api/tmdbApi'; //

export const fetchGenres = createAsyncThunk(
	'genre/fetchGenres',
	async (_, { rejectWithValue }) => {
		try {
			const genres = await fetchGenresAPI();
			return genres;
		} catch (error) {
			return rejectWithValue('Error fetching genres');
		}
	}
);

const initialState = {
	genres: [],
	loading: false,
	error: null,
};

const genreSlice = createSlice({
	name: 'genre',
	initialState,
	reducers: {},
	extraReducers: builder => {
		builder
			.addCase(fetchGenres.pending, state => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchGenres.fulfilled, (state, action) => {
				state.loading = false;
				state.genres = action.payload;
			})
			.addCase(fetchGenres.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default genreSlice.reducer;
