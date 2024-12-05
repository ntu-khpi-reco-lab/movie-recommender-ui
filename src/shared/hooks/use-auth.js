import { useSelector } from 'react-redux';

export function useAuth() {
	const { email, username, token, id } = useSelector(state => state.user);

	return {
		isAuthenticated: !!token,
		email,
		username,
		token,
		id,
	};
}
