import { Navigate } from 'react-router-dom';
import MovieList from '../../../features/movieList/ui/MovieList';
import { Header } from '../../../widgets/Header/ui/Header';
import { useAuth } from '/src/shared/hooks/use-auth';

const HomePage = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? (
		<div className='_wrapper'>
			<Header />
			<main>
				<div className='_container'>
					<MovieList />
				</div>
			</main>
		</div>
	) : (
		<Navigate to='/login' />
	);
};

export { HomePage };
