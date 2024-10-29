import React from 'react';
import { useSelector } from 'react-redux';
import { MovieCard } from '../../../entities/MovieCard';
import styles from './FavouriteList.module.scss';

const FavouriteList = () => {
	const favourites = useSelector(state => state.likedMovies);

	if (favourites.length === 0) {
		return (
			<div className={styles.noFavourites}>There are no favourite films 🙄</div>
		);
	}
	return (
		<div className={styles.favouriteList}>
			{favourites.map(movie => (
				<MovieCard key={movie.id} movie={movie} />
			))}
		</div>
	);
};

export default FavouriteList;
