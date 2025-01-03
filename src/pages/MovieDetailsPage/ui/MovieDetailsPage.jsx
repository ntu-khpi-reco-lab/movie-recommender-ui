import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { toggleMovie } from '../../../app/store/slices/likedMoviesSlice';

import { MovieCard } from '../../../entities/MovieCard';

import { Header } from '../../../widgets/Header/ui/Header';
import styles from './MovieDetailsPage.module.scss';
import arrowLeft from '/src/assets/icons/arrow_left.svg';
import arrowRight from '/src/assets/icons/arrow_right.svg';
import fallbackImage from '/src/assets/icons/fallback-image.svg';
import heartEmpty from '/src/assets/icons/heart-empty.svg';
import heartFilled from '/src/assets/icons/heart-filled.svg';

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);
	const [recommendedMovies, setRecommendedMovies] = useState([]);
	const [currentSlide, setCurrentSlide] = useState(0);
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const likedMovies = useSelector(state => state.likedMovies);
	const isFavourite = likedMovies.some(movie => movie.id === parseInt(movieId));

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}?api_key=167760e3cebe9b21fd382390481c05d5&language=en-US`
				);
				setMovie(response.data);

				if (response.data.genres.length > 0) {
					const genreId = response.data.genres[0].id;
					const recommendedResponse = await axios.get(
						`https://api.themoviedb.org/3/discover/movie?api_key=167760e3cebe9b21fd382390481c05d5&language=en-US&with_genres=${genreId}`
					);
					const filteredMovies = recommendedResponse.data.results.filter(
						recMovie => recMovie.id !== parseInt(movieId)
					);
					setRecommendedMovies(filteredMovies);
				}
			} catch (error) {
				console.error('Error fetching movie details:', error);
			}
		};
		fetchMovieDetails();
	}, [movieId]);

	const handleLikeClick = () => {
		if (movie) {
			dispatch(toggleMovie(movie));
		}
	};

	const handleCloseClick = () => {
		navigate(-1);
	};

	const handlePreviousSlide = () => {
		setCurrentSlide(prevSlide => Math.max(prevSlide - 1, 0));
	};

	const handleNextSlide = () => {
		setCurrentSlide(prevSlide =>
			Math.min(prevSlide + 1, Math.floor(recommendedMovies.length / 4))
		);
	};

	if (!movie) {
		return <div>Loading...</div>;
	}

	const visibleMovies = recommendedMovies.slice(
		currentSlide * 4,
		(currentSlide + 1) * 4
	);

	return (
		<div className='_wrapper'>
			<Header />
			<main className={styles.movieDetailsPage}>
				<div className={styles.detailsContainer}>
					<div className={styles.imageSection}>
						<img
							src={
								`https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
								fallbackImage
							}
							alt={movie.title}
							className={styles.movieImage}
						/>
						<div className={styles.movieRating}>
							<p>{movie.vote_average.toFixed(1) || 'N/A'}</p>
						</div>
						<button className={styles.likeButton} onClick={handleLikeClick}>
							<img src={isFavourite ? heartFilled : heartEmpty} alt='Like' />
						</button>
					</div>
					<div className={styles.infoSection}>
						<div className={styles.header}>
							<h1>{movie.title || 'Movie Title'}</h1>
							<button className={styles.closeButton} onClick={handleCloseClick}>
								X
							</button>
						</div>
						<ul className={styles.detailsList}>
							<li>
								<strong>Format:</strong>{' '}
								{movie.original_language.toUpperCase() || 'N/A'}
							</li>
							<li>
								<strong>Year:</strong>{' '}
								{new Date(movie.release_date).getFullYear() || 'N/A'}
							</li>
							<li>
								<strong>Genre:</strong>{' '}
								{movie.genres?.map(genre => genre.name).join(', ') || 'N/A'}
							</li>
							<li>
								<strong>Studio:</strong>{' '}
								{movie.production_companies?.[0]?.name || 'N/A'}
							</li>
							<li>
								<strong>Country:</strong>{' '}
								{movie.production_countries?.[0]?.name || 'N/A'}
							</li>
							<li>
								<strong>Duration:</strong> {movie.runtime || 'N/A'} min
							</li>
						</ul>
						<div className={styles.description}>
							<p>{movie.overview || 'No description available.'}</p>
						</div>
					</div>
				</div>

				<div className={styles.recommendationsContainer}>
					<h2 className={styles.recommendationsTitle}>You may also like:</h2>
					<div className={styles.sliderControls}>
						<button
							className={styles.arrowButton}
							onClick={handlePreviousSlide}
							disabled={currentSlide === 0}
						>
							<img src={arrowLeft} alt='Previous' />
						</button>
						<div className={styles.recommendationsSlider}>
							{visibleMovies.map(recMovie => (
								<MovieCard
									key={recMovie.id}
									movie={{
										id: recMovie.id,
										title: recMovie.title,
										poster: `https://image.tmdb.org/t/p/w500/${recMovie.poster_path}`,
									}}
									isFavourite={likedMovies.some(
										liked => liked.id === recMovie.id
									)}
									isSmall={true}
								/>
							))}
						</div>
						<button
							className={styles.arrowButton}
							onClick={handleNextSlide}
							disabled={(currentSlide + 1) * 4 >= recommendedMovies.length}
						>
							<img src={arrowRight} alt='Next' />
						</button>
					</div>
				</div>
			</main>
		</div>
	);
};

export { MovieDetailsPage };
