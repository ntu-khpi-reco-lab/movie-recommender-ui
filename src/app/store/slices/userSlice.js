import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
	email: null,
	username: null,
	token: null,
	id: null,
	status: 'idle',
	error: null,
};

export const registerUser = createAsyncThunk(
	'user/registerUser',
	async (
		{ email, password, username, firstName, lastName },
		{ rejectWithValue }
	) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/users/register',
				{
					username,
					password,
					email,
					firstName,
					lastName,
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Registration failed');
		}
	}
);

export const loginUser = createAsyncThunk(
	'user/loginUser',
	async ({ username, password }, { rejectWithValue }) => {
		try {
			const response = await axios.post(
				'http://localhost:8080/api/v1/users/login',
				{
					username,
					password,
				}
			);
			return response.data; // { email, username, id, token }
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Login failed');
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async ({ username, email, password, token }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				'http://localhost:8080/user/update',
				{ username, email, password },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Update failed');
		}
	}
);
export const deleteUser = createAsyncThunk(
	'user/deleteUser',
	async ({ token }, { rejectWithValue }) => {
		try {
			const response = await axios.delete(
				`http://localhost:8080/api/v1/users`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Delete failed');
		}
	}
);

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser(state, action) {
			state.email = action.payload.email;
			state.username = action.payload.username;
			state.token = action.payload.token;
			state.id = action.payload.id;
		},
		removeUser(state) {
			state.email = null;
			state.username = null;
			state.token = null;
			state.id = null;
		},
		updateUserState(state, action) {
			const { username, email, password } = action.payload;
			if (username) state.username = username;
			if (email) state.email = email;
			if (password) state.password = password;
		},
	},
	extraReducers: builder => {
		builder

			.addCase(registerUser.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.email = action.payload.email;
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.id = action.payload.id;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(loginUser.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.email = action.payload.email;
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.id = action.payload.id;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})

			.addCase(updateUser.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.email = action.payload.email;
				state.username = action.payload.username;
				state.token = action.payload.token;
				state.id = action.payload.id;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(deleteUser.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(deleteUser.fulfilled, state => {
				state.status = 'succeeded';
				state.email = null;
				state.username = null;
				state.token = null;
				state.id = null;
			})
			.addCase(deleteUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			});
	},
});

export const { setUser, removeUser, updateUserState } = userSlice.actions;
export default userSlice.reducer;
