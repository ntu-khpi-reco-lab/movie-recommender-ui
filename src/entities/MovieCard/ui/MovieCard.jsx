import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
	addFavoriteOnServer,
	addMovieToFavorites,
	removeFavoriteOnServer,
	removeMovieFromFavorites,
} from '../../../app/store/slices/likedMoviesSlice';
import styles from './MovieCard.module.scss';
import fallbackImage from '/src/assets/icons/fallback-image.svg';
import heartEmpty from '/src/assets/icons/heart-empty.svg';
import heartFilled from '/src/assets/icons/heart-filled.svg';

const MovieCard = ({ movie }) => {
	const dispatch = useDispatch();
	const favourites = useSelector(state => state.likedMovies);
	const isFavourite = favourites.includes(movie.id);

	const toggleFavourite = () => {
		if (isFavourite) {
			dispatch(removeFavoriteOnServer(movie.id));
			dispatch(removeMovieFromFavorites({ id: movie.id }));
		} else {
			dispatch(addFavoriteOnServer(movie.id));
			dispatch(addMovieToFavorites({ id: movie.id }));
		}
	};

	return (
		<div className={styles.movieCard}>
			<Link to={`/movie/${movie.id}`}>
				<img
					src={
						`https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
						fallbackImage
					}
					alt={movie.title}
					className={styles.movieImage}
				/>
			</Link>
			<h2>{movie.title}</h2>
			<button className={styles.likeButton} onClick={toggleFavourite}>
				<img src={isFavourite ? heartFilled : heartEmpty} alt='Like' />
			</button>
		</div>
	);
};

export { MovieCard };
