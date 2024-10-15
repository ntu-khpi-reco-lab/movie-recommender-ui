import React, { useEffect, useState } from 'react';
import MovieCard from '../../../entities/movie/ui/MovieCard';
import { fetchMovies } from '../../../shared/api/tmdbApi';
import './MovieList.scss';

const MovieList = () => {
	const [movies, setMovies] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const moviesData = await fetchMovies();
			setMovies(moviesData);
		};

		getMovies();
	}, []);

	return (
		<div className='movie-list'>
			{movies.map(movie => (
				<MovieCard
					key={movie.id}
					movie={{
						title: movie.title,
						genre: movie.genre_ids.length > 0 ? movie.genre_ids[0] : 'Unknown',
						poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
					}}
				/>
			))}
		</div>
	);
};

export default MovieList;
