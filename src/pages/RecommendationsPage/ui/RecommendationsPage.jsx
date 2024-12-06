import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';

const RecommendationsPage = () => {
	const [recommendations, setRecommendations] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	const getUserIdFromToken = () => {
		const token = localStorage.getItem('token');
		if (token) {
			try {
				const decodedToken = jwtDecode(token);
				return decodedToken.userId;
			} catch (error) {
				console.error('Ошибка при декодировании токена:', error);
				return null;
			}
		}
		return null;
	};

	useEffect(() => {
		const fetchRecommendations = async () => {
			const userId = getUserIdFromToken();

			if (!userId) {
				setError('User not authenticated');
				setLoading(false);
				return;
			}

			const token = localStorage.getItem('token');

			try {
				const response = await axios.get(
					`http://localhost:8080/api/v1/recommend/${userId}`,
					{
						headers: {
							Authorization: `Bearer ${token}`,
						},
					}
				);
				console.log(response.data);
				setRecommendations(response.data);
			} catch (error) {
				setError('Ошибка при загрузке рекомендаций');
				console.error(error);
			} finally {
				setLoading(false);
			}
		};

		fetchRecommendations();
	}, []);

	if (loading) {
		return <div>Загрузка...</div>;
	}

	if (error) {
		return <div>{error}</div>;
	}

	return (
		<div>
			<h1>Рекомендации для вас</h1>
			<ul>
				{recommendations.map(movie => (
					<li key={movie.id}>
						<h2>{movie.title}</h2>
					</li>
				))}
			</ul>
		</div>
	);
};

export { RecommendationsPage };
