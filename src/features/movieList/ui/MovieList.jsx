import { useEffect, useState } from 'react';
import { MovieCard } from '../../../entities/MovieCard';
import { fetchMovies, fetchMoviesByGenre } from '../../../shared/api/tmdbApi';
import { Pagination } from '../../../widgets/Pagination';
import styles from './MovieList.module.scss';

const MovieList = ({ selectedGenre, searchQuery }) => {
	const [currentPage, setCurrentPage] = useState(() => {
		const savedPage = sessionStorage.getItem('movieCurrentPage');
		return savedPage ? Number(savedPage) : 1;
	});
	const [movies, setMovies] = useState([]);
	const [loading, setLoading] = useState(true);

	const moviesPerPage = 20;

	useEffect(() => {
		const getMovies = async () => {
			setLoading(true);
			const moviesData = await fetchMovies(currentPage);
			setMovies(moviesData);
			setLoading(false);
		};

		getMovies();
	}, [currentPage]);

	useEffect(() => {
		const getMovies = async () => {
			let moviesData;

			if (selectedGenre && selectedGenre !== 'all') {
				moviesData = await fetchMoviesByGenre(selectedGenre);
			} else {
				moviesData = await fetchMovies();
			}

			if (searchQuery) {
				moviesData = moviesData.filter(movie =>
					movie.title.toLowerCase().includes(searchQuery.toLowerCase())
				);
			}

			setMovies(moviesData);
		};

		getMovies();
	}, [selectedGenre, searchQuery]);

	//! need to refactor: end

	const handlePageChange = newPage => {
		setCurrentPage(newPage);
		sessionStorage.setItem('movieCurrentPage', newPage);
	};

	const showPagination = movies.length >= moviesPerPage;

	return (
		<div className={styles.movieList}>
			{loading ? (
				<div className={styles.loader}>Loading movies...</div>
			) : movies.length === 0 ? (
				<div className={styles.noMovies}>No movies available.</div>
			) : (
				movies.slice(0, moviesPerPage).map(movie => (
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
			{showPagination && (
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

export { MovieList };
