import { useState } from 'react';
import styles from './SearchBar.module.scss';

const SearchBar = ({ onSearch }) => {
	const [query, setQuery] = useState('');

	const handleChange = event => {
		const newQuery = event.target.value;
		setQuery(newQuery);

		onSearch(newQuery);
	};

	return (
		<div className={styles.searchBarContainer}>
			<input
				className={styles.searchBar}
				type='text'
				placeholder='Search for a movie...'
				value={query}
				onChange={handleChange}
			/>
		</div>
	);
};

export { SearchBar };
