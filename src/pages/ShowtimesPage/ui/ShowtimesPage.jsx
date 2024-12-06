import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Header } from '../../../widgets/Header';
import styles from './ShowtimesPage.module.scss';

const ShowtimesPage = () => {
	const [showtimes, setShowtimes] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const country = 'Ukraine';
	const city = 'Kyiv';

	useEffect(() => {
		const fetchShowtimes = async () => {
			try {
				const response = await axios.get(
					`http://localhost:9003/api/v1/internal/crawl/showtimes?country=${country}&city=${city}`
				);
				setShowtimes(response.data.movies);
			} catch (error) {
				setError('Error while fetching showtimes');
			} finally {
				setLoading(false);
			}
		};

		fetchShowtimes();
	}, [country, city]);
	// if (loading) {
	// 	return <div>Загрузка...</div>;
	// }

	// if (error) {
	// 	return <div>{error}</div>;
	// }

	return (
		<div className={styles.showtimesPage}>
			<Header />
			<div className='_container'>
				<h1>
					Showtimes in {city}, {country}
				</h1>
				{showtimes.length !== 0 ? (
					<p>No available showtimes.</p>
				) : (
					<ul className={styles.movieList}>
						{/* {showtimes.map(movie => (
							<li key={movie.title} className={styles.movieItem}>
								<h2>{movie.title}</h2>
								<ul className={styles.showtimesList}>
									{movie.showtimes.map((time, index) => (
										<li key={index}>{time}</li>
									))}
								</ul>
							</li>
						))} */}
						<li className={styles.movieItem}>
							<h2>Venom</h2>
							<ul className={styles.showtimesList}>
								<li>14:00</li>
							</ul>
						</li>
					</ul>
				)}
			</div>
		</div>
	);
};

export { ShowtimesPage };
