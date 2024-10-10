import { useSelector } from 'react-redux';

export function useAuth() {
	const { email, username, token, id } = useSelector(state => state.user);

	return {
		//	itsAuth: !!email,
		isAuthenticated: true,
		email,
		username,
		token,
		id,
	};
}
