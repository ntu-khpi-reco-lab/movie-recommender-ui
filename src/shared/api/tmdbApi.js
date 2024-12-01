import axios from 'axios';

const API_KEY = '167760e3cebe9b21fd382390481c05d5';
const BASE_URL = 'https://api.themoviedb.org/3';

const fetchMovies = async (page = 1) => {
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

const fetchGenres = async () => {
	try {
		const response = await axios.get(`${BASE_URL}/genre/movie/list`, {
			params: {
				api_key: API_KEY,
				language: 'en-US',
			},
		});
		return response.data.genres;
	} catch (error) {
		console.error('Error fetching genres:', error);
		throw error;
	}
};

const fetchMoviesByGenre = async genreId => {
	try {
		const response = await axios.get(`${BASE_URL}/discover/movie`, {
			params: {
				api_key: API_KEY,
				language: 'en-US',
				with_genres: genreId,
				page: 1,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('Error fetching movies by genre:', error);
		return [];
	}
};

const fetchMoviesByTitle = async query => {
	try {
		const response = await axios.get(`${BASE_URL}/search/movie`, {
			params: {
				api_key: API_KEY,
				query,
				language: 'en-US',
				page: 1,
			},
		});
		return response.data.results;
	} catch (error) {
		console.error('Error searching movies:', error);
		return [];
	}
};

export { fetchGenres, fetchMovies, fetchMoviesByGenre, fetchMoviesByTitle };
