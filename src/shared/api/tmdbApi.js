import axios from 'axios';

const API_KEY = '167760e3cebe9b21fd382390481c05d5';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (page = 1) => {
	try {
		const response = await axios.get(`${BASE_URL}/movie/popular`, {
			params: {
				api_key: API_KEY,
				language: 'en-US',
				page: page,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('Error fetching movies:', error);
		return [];
	}
};
