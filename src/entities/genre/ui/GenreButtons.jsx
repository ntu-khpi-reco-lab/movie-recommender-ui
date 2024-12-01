import styles from './GenreButtons.module.scss';

const GenreButtons = ({ genres, selectedGenre, onGenreChange }) => {
	return (
		<div className={styles.genreButtons}>
			<button
				className={`${styles.genreButton} ${
					!selectedGenre ? styles.genreButton_active : ''
				}`}
				onClick={() => onGenreChange(null)}
			>
				All
			</button>
			{genres.map(genre => (
				<button
					key={genre.id}
					className={`${styles.genreButton} ${
						selectedGenre === genre.id ? styles.genreButton_active : ''
					}`}
					onClick={() => onGenreChange(genre.id)}
				>
					{genre.name}
				</button>
			))}
		</div>
	);
};

export { GenreButtons };
