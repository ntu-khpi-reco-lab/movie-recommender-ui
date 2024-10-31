import React, { useEffect, useState } from 'react';
import { fetchMovies } from '../../../shared/api/tmdbApi';
import { MovieCard } from '../../../entities/MovieCard';
import styles from './MovieList.module.scss';

const MovieList = () => {
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		const getMovies = async () => {
			setLoading(true);
			const moviesData = await fetchMovies(currentPage);
			console.log('Fetched Movies Data:', moviesData);
			setMovies(moviesData);
			setLoading(false);
		};

		getMovies();
	}, [currentPage]);

	const handleNextPage = () => {
		setCurrentPage(prevPage => prevPage + 1);
	};

	const handlePreviousPage = () => {
		setCurrentPage(prevPage => Math.max(prevPage - 1, 1));
	};

	if (loading) {
		return <div className={styles.loadingMessage}>Loading movies...</div>;
	}

	return (
		<div className={styles.movieList}>
			{movies.length > 0 ? (
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
			) : (
				<div>No movies found.</div>
			)}
			<div>
				<button onClick={handlePreviousPage} disabled={currentPage === 1}>
					Previous
				</button>
				<button onClick={handleNextPage}>Next</button>
			</div>
		</div>
	);
};

export default MovieList;
