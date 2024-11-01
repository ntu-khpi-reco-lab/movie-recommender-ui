import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../../entities/MovieCard';
import { fetchMovies } from '../../../shared/api/tmdbApi';
import { Pagination } from '../../../widgets/Pagination';
import styles from './MovieList.module.scss';

const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const getMovies = async () => {
			setLoading(true);
			const moviesData = await fetchMovies(currentPage);
			setMovies(moviesData);
			setLoading(false);
		};

		getMovies();
	}, [currentPage]);

	return (
		<div className={styles.movieList}>
			{loading ? (
				<div className={styles.loader}>Loading movies...</div>
			) : movies.length === 0 ? (
				<div className={styles.noMovies}>No movies available.</div>
			) : (
				movies.map(movie => (
					<MovieCard
						key={movie.id}
						movie={{
							id: movie.id,
							title: movie.title,
							genre:
								movie.genre_ids.length > 0 ? movie.genre_ids[0] : 'Unknown',
							poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
						}}
					/>
				))
			)}
			{movies.length > 0 && (
				<Pagination currentPage={currentPage} onPageChange={setCurrentPage} />
			)}
		</div>
	);
};

export default MovieList;
