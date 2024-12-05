import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUser,
	fetchUserData,
	removeUser,
	updateUser,
} from '../../../app/store/slices/userSlice.js';
import emailIcon from '../../../assets/icons/email.svg';
import eyeSlashIcon from '../../../assets/icons/eye-slash.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import passwordIcon from '../../../assets/icons/password-icon.svg';
import userIcon from '../../../assets/icons/user-man-icon.svg';
import { Header } from '../../../widgets/Header';
import styles from './UserProfilePage.module.scss';

const UserProfilePage = () => {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);

	const [showPassword, setShowPassword] = useState(false);
	const [username, setUsername] = useState(user.username || '');
	const [email, setEmail] = useState(user.email || '');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		const fetchUser = async () => {
			if (user.token) {
				await dispatch(fetchUserData(user.token));
				setIsLoading(false);
			} else {
				setIsLoading(false);
			}
		};

		fetchUser();
	}, [dispatch, user.token]);

	const handleUpdateProfile = async event => {
		event.preventDefault();

		if (password && password !== confirmPassword) {
			alert('Passwords do not match!');
			return;
		}

		setIsLoading(true);

		try {
			const token = user.token;
			if (token) {
				const updatedFields = {};

				if (username !== user.username) updatedFields.username = username;
				if (email !== user.email && email !== '') updatedFields.email = email;
				if (password) updatedFields.password = password;

				if (Object.keys(updatedFields).length > 0) {
					await dispatch(updateUser({ ...updatedFields, token }));

					localStorage.setItem(
						'user',
						JSON.stringify({ ...user, ...updatedFields })
					);

					alert('Profile updated successfully!');
				} else {
					alert('No changes detected.');
				}
			} else {
				alert('Token not found. Please log in again.');
			}
		} catch (error) {
			console.error('Error updating profile:', error);
			alert('Failed to update profile.');
		} finally {
			setIsLoading(false);
		}
	};

	const handleLogout = () => {
		dispatch(removeUser());
		localStorage.removeItem('token');
		localStorage.removeItem('user');
		window.location.href = '/login';
	};

	const togglePasswordVisibility = field => {
		if (field === 'password') setShowPassword(prev => !prev);
		if (field === 'confirmPassword') setShowConfirmPassword(prev => !prev);
	};

	const handleDeleteProfile = async () => {
		if (window.confirm('Are you sure you want to delete your profile?')) {
			setIsLoading(true);

			try {
				await dispatch(deleteUser({ id: user.id, token: user.token }));
				alert('Profile deleted successfully!');
				dispatch(removeUser());
				localStorage.removeItem('token');
				localStorage.removeItem('user');
				window.location.href = '/login';
			} catch (error) {
				console.error('Error deleting profile:', error);
				alert('Failed to delete profile.');
			} finally {
				setIsLoading(false);
			}
		}
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<>
			<Header />
			<div className={styles.wrapper}>
				<div className={styles.header}>
					<h2>User Profile</h2>
				</div>
				<div className={styles.container}>
					<div className={styles.profileInfo}>
						<h3>Personal Information</h3>
						<div className={styles.infoItem}>
							<strong>First Name:</strong> {user.firstName || 'N/A'}
						</div>
						<div className={styles.infoItem}>
							<strong>Last Name:</strong> {user.lastName || 'N/A'}
						</div>
						<div className={styles.infoItem}>
							<strong>Username:</strong> {user.username || 'N/A'}
						</div>
						<div className={styles.infoItem}>
							<strong>Email:</strong> {user.email || 'N/A'}
						</div>
						<button
							onClick={handleDeleteProfile}
							className={styles.deleteButton}
							disabled={isLoading}
						>
							{isLoading ? 'Deleting...' : 'Delete Profile'}
						</button>
					</div>

					<div className={styles.divider}></div>

					<div className={styles.profileUpdate}>
						<form
							onSubmit={handleUpdateProfile}
							className={styles.formContainer}
						>
							<h3>Update Profile</h3>
							<div className={styles.usernameInput}>
								<img src={userIcon} alt='userIcon' height={16} />
								<input
									placeholder='Update your username'
									type='text'
									value={username}
									onChange={e => setUsername(e.target.value)}
								/>
							</div>

							<div className={styles.emailInput}>
								<img src={emailIcon} alt='emailIcon' height={16} />
								<input
									placeholder='Update your email'
									type='email'
									value={email}
									onChange={e => setEmail(e.target.value)}
								/>
							</div>

							<h3>Password</h3>
							<div className={styles.passwordInput}>
								<img src={passwordIcon} alt='passwordIcon' height={16} />
								<input
									placeholder='New password'
									type={showPassword ? 'text' : 'password'}
									value={password}
									onChange={e => setPassword(e.target.value)}
								/>
								<img
									height={16}
									src={showPassword ? eyeIcon : eyeSlashIcon}
									alt='togglePassword'
									className={styles.toggleIcon}
									onClick={() => togglePasswordVisibility('password')}
								/>
							</div>

							<div className={styles.passwordInput}>
								<img src={passwordIcon} alt='passwordIcon' height={16} />
								<input
									type={showConfirmPassword ? 'text' : 'password'}
									placeholder='Confirm new password'
									value={confirmPassword}
									onChange={e => setConfirmPassword(e.target.value)}
								/>
								<img
									height={16}
									src={showConfirmPassword ? eyeIcon : eyeSlashIcon}
									alt='toggleConfirmPassword'
									className={styles.toggleIcon}
									onClick={() => togglePasswordVisibility('confirmPassword')}
								/>
							</div>

							<button type='submit' disabled={isLoading}>
								{isLoading ? 'Updating...' : 'Save Changes'}
							</button>
						</form>
					</div>
				</div>
				<button onClick={handleLogout} className={styles.logoutButton}>
					Logout
				</button>
			</div>
		</>
	);
};

export { UserProfilePage };
