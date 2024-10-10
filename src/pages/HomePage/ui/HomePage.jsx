import { Navigate } from 'react-router-dom';
import { Header } from '../../../widgets/Header/ui/Header';
import { useAuth } from '/src/shared/hooks/use-auth';

const HomePage = () => {
	const { isAuthenticated } = useAuth();

	return isAuthenticated ? (
		<div className='_wrapper'>
			<Header />
			<main>
				<div className='_container'></div>
			</main>
		</div>
	) : (
		<Navigate to='/login' />
	);
};

export { HomePage };
