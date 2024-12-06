import axios from 'axios';
import { useEffect, useState } from 'react';
import { MovieCard } from '../../../entities/MovieCard';
import { Pagination } from '../../../widgets/Pagination';
import styles from './FavouriteList.module.scss';

const FavouriteList = () => {
	const [favourites, setFavourites] = useState([]);
	const [error, setError] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const moviesPerPage = 20;

	const token = localStorage.getItem('token');

	useEffect(() => {
		const fetchFavouriteMovieIds = async () => {
			try {
				const response = await axios.get(
					'http://localhost:8080/api/v1/favorites',
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				const movieIds = response.data;
				if (movieIds.length) {
					const movieDetailsPromises = movieIds.map(id =>
						axios.get(
							`https://api.themoviedb.org/3/movie/${id}?api_key=167760e3cebe9b21fd382390481c05d5`
						)
					);
					const movieDetailsResponses = await Promise.all(movieDetailsPromises);
					setFavourites(movieDetailsResponses.map(res => res.data));
				}
			} catch (error) {
				setError('Error fetching favourite movie IDs');
				console.error('Error fetching favourite movie IDs:', error);
			}
		};

		fetchFavouriteMovieIds();
	}, [token]);

	const indexOfLastMovie = currentPage * moviesPerPage;
	const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
	const currentMovies = favourites.slice(indexOfFirstMovie, indexOfLastMovie);
	const totalPages = Math.ceil(favourites.length / moviesPerPage);

	const handlePageChange = newPage => {
		if (newPage >= 1 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	if (favourites.length === 0) {
		return (
			<div className={styles.noFavourites}>There are no favourite films 🙄</div>
		);
	}

	return (
		<div className={styles.movieList}>
			{favourites.map(movie => (
				<MovieCard key={movie.id} movie={movie} />
			))}

			{totalPages > 1 && (
				<div className={styles.pagination}>
					<Pagination
						currentPage={currentPage}
						onPageChange={handlePageChange}
						totalPages={totalPages}
					/>
				</div>
			)}
		</div>
	);
};

export default FavouriteList;
