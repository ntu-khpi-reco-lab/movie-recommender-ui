import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const initialState = {
	email: null,
	username: null,
	token: localStorage.getItem('token') || null,
	id: null,
	firstName: null,
	lastName: null,
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
			return response.data; // { token }
		} catch (error) {
			return rejectWithValue(error.response?.data || 'Login failed');
		}
	}
);

export const fetchUserData = createAsyncThunk(
	'user/fetchUserData',
	async (token, { rejectWithValue }) => {
		try {
			const decodedToken = jwtDecode(token);
			const userId = decodedToken.id;

			const response = await axios.get(
				'http://localhost:8080/api/v1/users/profile',
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
					params: {
						userId: userId,
					},
				}
			);
			console.log(response.data);

			return response.data;
		} catch (error) {
			return rejectWithValue(
				error.response?.data || 'Failed to fetch user data'
			);
		}
	}
);

export const updateUser = createAsyncThunk(
	'user/updateUser',
	async ({ username, email, password, token }, { rejectWithValue }) => {
		try {
			const response = await axios.put(
				'http://localhost:8080/api/v1/users/profile',
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
				'http://localhost:8080/api/v1/users/profile',
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
			state.token = action.payload.token;
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
				console.log('Login successful, response data:', action.payload);
				if (action.payload) {
					state.status = 'succeeded';
					state.token = action.payload;
					state.email = action.payload.email || null;
					state.username = action.payload.username || null;
					state.id = action.payload.id || null;

					localStorage.setItem('token', action.payload);
					localStorage.setItem('user', JSON.stringify(action.payload));
				} else {
					console.error('Token is undefined or missing in the response');
				}
			})

			.addCase(loginUser.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(fetchUserData.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(fetchUserData.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const { id, username, email, firstName, lastName } = action.payload;
				state.id = id;
				state.username = username;
				state.email = email;
				state.firstName = firstName;
				state.lastName = lastName;
			})
			.addCase(fetchUserData.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload;
			})
			.addCase(updateUser.pending, state => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.status = 'succeeded';
				const { id, username, email, firstName, lastName } = action.payload;

				state.id = id;
				state.username = username;
				state.email = email;
				state.firstName = firstName;
				state.lastName = lastName;
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
