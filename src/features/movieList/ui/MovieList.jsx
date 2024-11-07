import React, { useEffect, useState } from 'react';
import { MovieCard } from '../../../entities/MovieCard';
import { fetchMovies } from '../../../shared/api/tmdbApi';
import { Pagination } from '../../../widgets/Pagination';
import styles from './MovieList.module.scss';

const MovieList = () => {
	const [currentPage, setCurrentPage] = useState(() => {
		const savedPage = sessionStorage.getItem('movieCurrentPage');
		return savedPage ? Number(savedPage) : 1;
	});
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const getMovies = async () => {
			setLoading(true);
			const moviesData = await fetchMovies(currentPage);
			setMovies(moviesData);
			setLoading(false);
		};

		getMovies();
	}, [currentPage]);

	const handlePageChange = newPage => {
		setCurrentPage(newPage);
		sessionStorage.setItem('movieCurrentPage', newPage);
	};

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
				<div className={styles.pagination}>
					<Pagination
						currentPage={currentPage}
						onPageChange={handlePageChange}
					/>
				</div>
			)}
		</div>
	);
};

export default MovieList;
