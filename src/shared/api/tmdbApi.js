import axios from 'axios';

const API_KEY = '167760e3cebe9b21fd382390481c05d5';
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/movie/popular`, {
			params: {
				api_key: API_KEY,
				language: 'en-US',
				page: 1,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('Error fetching movies:', error);
		return [];
	}
};
