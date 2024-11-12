import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { GenreButtons } from '../../../entities/genre/ui/GenreButtons';
import { SearchBar } from '../../../entities/search/ui/SearchBar';
import MovieList from '../../../features/movieList/ui/MovieList';
import { fetchGenres } from '../../../shared/api/tmdbApi'; // Импорт функции
import { Header } from '../../../widgets/Header/ui/Header';
import { useAuth } from '/src/shared/hooks/use-auth';

import styles from './HomePage.module.scss';

const HomePage = () => {
	const { isAuthenticated } = useAuth();
	const [selectedGenre, setSelectedGenre] = useState(null);
	const [searchQuery, setSearchQuery] = useState('');
	const [genres, setGenres] = useState([]);

	const handleGenreChange = genre => {
		setSelectedGenre(genre);
	};

	const handleSearch = query => {
		setSearchQuery(query);
	};

	useEffect(() => {
		const getGenres = async () => {
			const genresData = await fetchGenres();
			setGenres(genresData);
		};
		getGenres();
	}, []);

	return isAuthenticated ? (
		<div className='_wrapper'>
			<Header />
			<main>
				<div className='_container'>
					<SearchBar onSearch={handleSearch} />
					<div className={styles.moviesContainer}>
						<aside>
							<h3>Genres</h3>
							<GenreButtons
								genres={genres}
								selectedGenre={selectedGenre}
								onGenreChange={handleGenreChange}
							/>
						</aside>
						<MovieList
							selectedGenre={selectedGenre}
							searchQuery={searchQuery}
						/>
					</div>
				</div>
			</main>
		</div>
	) : (
		<Navigate to='/login' />
	);
};

export { HomePage };
