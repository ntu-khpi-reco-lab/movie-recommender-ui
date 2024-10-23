import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../../entities/MovieCard';
import { fetchMovies } from '../../../shared/api/tmdbApi';
import styles from './MovieList.module.scss';

const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const [favourites, setFavourites] = useState([]);

	useEffect(() => {
		const getMovies = async () => {
			const moviesData = await fetchMovies();
			setMovies(moviesData);
		};

		getMovies();
	}, []);

	return (
		<div className={styles.movieList}>
			{movies.map(movie => (
				<MovieCard
					key={movie.id}
					id={movie.id}
					favourites={favourites}
					setFavourites={setFavourites}
					movie={{
						id: movie.id,
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
