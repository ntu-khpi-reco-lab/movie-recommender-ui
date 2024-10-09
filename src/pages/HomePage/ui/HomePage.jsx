import { Navigate } from 'react-router-dom';
import { useAuth } from '/src/shared/hooks/use-auth';

const HomePage = () => {
	const { isAuth } = useAuth();

	return isAuth ? (
		<>
			<h1>Homepage</h1>
		</>
	) : (
		<Navigate to='/login' />
	);
};

export { HomePage };
