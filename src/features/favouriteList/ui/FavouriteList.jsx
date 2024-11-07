import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from '../../../entities/MovieCard';
import { Pagination } from '../../../widgets/Pagination';
import styles from './FavouriteList.module.scss';

const FavouriteList = () => {
	const favourites = useSelector(state => state.likedMovies);
	const [currentPage, setCurrentPage] = useState(1);
	const moviesPerPage = 20;
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
			{currentMovies.map(movie => (
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
