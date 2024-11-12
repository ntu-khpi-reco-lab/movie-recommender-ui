import { useDispatch, useSelector } from 'react-redux';
import { toggleMovie } from '../../../app/store/slices/likedMoviesSlice';
import styles from './MovieCard.module.scss';
import fallbackImage from '/src/assets/icons/fallback-image.svg';
import heartEmpty from '/src/assets/icons/heart-empty.svg';
import heartFilled from '/src/assets/icons/heart-filled.svg';

const MovieCard = ({ movie }) => {
	const dispatch = useDispatch();
	const favourites = useSelector(state => state.likedMovies);
	const isFavourite = favourites.some(fav => fav.id === movie.id);

	const toggleFavourite = () => {
		dispatch(toggleMovie(movie));
	};

	return (
		<div className={styles.movieCard}>
			<img src={movie.poster || fallbackImage} alt={movie.title} />
			<h2>{movie.title}</h2>
			<button className={styles.likeButton} onClick={toggleFavourite}>
				<img src={isFavourite ? heartFilled : heartEmpty} alt='Like' />
			</button>
		</div>
	);
};

export { MovieCard };
