import { createSlice } from '@reduxjs/toolkit';

const locationSlice = createSlice({
	name: 'location',
	initialState: {
		latitude: null,
		longitude: null,
	},
	reducers: {
		saveLocation: (state, action) => {
			state.latitude = action.payload.latitude;
			state.longitude = action.payload.longitude;
		},
	},
});

export const { saveLocation } = locationSlice.actions;
export default locationSlice.reducer;