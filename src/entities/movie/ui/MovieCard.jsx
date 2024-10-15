import React from 'react';
import './MovieCard.scss';

const MovieCard = ({ movie }) => {
	return (
		<div className='movie-card'>
			<img src={movie.poster} alt={movie.title} />
			<h2>{movie.title}</h2>
		</div>
	);
};

export default MovieCard;
