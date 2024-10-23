import React from 'react';
import { MovieCard } from '../../../entities/MovieCard';

const FavouriteList = () => {
	return (
		<div>
			<MovieCard
				key={movie.id}
				id={movie.id}
				movie={{
					id: movie.id,
					title: movie.title,
					genre: movie.genre_ids.length > 0 ? movie.genre_ids[0] : 'Unknown',
					poster: `https://image.tmdb.org/t/p/w500/${movie.poster_path}`,
				}}
			/>
		</div>
	);
};

export default FavouriteList;
