import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../../../widgets/Header/ui/Header';
import styles from './MovieDetailsPage.module.scss';
import fallbackImage from '/src/assets/icons/fallback-image.svg';

const MovieDetailsPage = () => {
	const { movieId } = useParams();
	const [movie, setMovie] = useState(null);

	useEffect(() => {
		const fetchMovieDetails = async () => {
			try {
				const response = await axios.get(
					`https://api.themoviedb.org/3/movie/${movieId}?api_key=167760e3cebe9b21fd382390481c05d5&language=en-US`
				);
				setMovie(response.data);
			} catch (error) {
				console.error('Error fetching movie details:', error);
			}
		};
		fetchMovieDetails();
	}, [movieId]);

	if (!movie) {
		return <div>Loading...</div>;
	}

	return (
		<div className='_wrapper'>
			<Header />
			<div className={styles.movieDetailsWrapper}>
				<main className={styles.movieDetailsContainer}>
					<div className={styles.movieDetails}>
						<h1>{movie.title}</h1>
						<div className={styles.movieImageContainer}>
							<img
								className={styles.movieImage}
								src={
									`https://image.tmdb.org/t/p/w500${movie.poster_path}` ||
									fallbackImage
								}
								alt={movie.title}
							/>
						</div>
						<div className={styles.movieInfo}>
							<p>
								<strong>Release Date:</strong> {movie.release_date}
							</p>
							<p>
								<strong>Overview:</strong>{' '}
								{movie.overview || 'No description available.'}
							</p>
							<p>
								<strong>Rating:</strong> {movie.vote_average}
							</p>
						</div>
					</div>
				</main>
			</div>
		</div>
	);
};

export { MovieDetailsPage };
