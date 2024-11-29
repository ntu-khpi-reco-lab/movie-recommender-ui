import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { saveLocation } from '../../../app/store/slices/locationSlice';
import styles from './RegisterPage.module.scss';
import passwordIcon from '/src/assets/icons/password-icon.svg';
import userIcon from '/src/assets/icons/user-man-icon.svg';

const RegisterPage = () => {
	const [isLoading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(null);
	const dispatch = useDispatch();

	const handleRegistration = async event => {
		event.preventDefault();
		setIsLoading(true);

		try {
			const isRegistered = true;

			if (isRegistered) {
				navigator.geolocation.getCurrentPosition(
					position => {
						const locationData = {
							latitude: position.coords.latitude,
							longitude: position.coords.longitude,
						};
						dispatch(saveLocation(locationData));
						setRedirect('/');
					},
					() => {
						setRedirect('/userlocation');
					}
				);
			} else {
				alert('Registration failed!');
			}
		} catch (error) {
			console.error('Error during registration:', error);
		} finally {
			setIsLoading(false);
		}
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Register</h2>
					<Link to='/login'>Sign in</Link>
				</div>
				<form onSubmit={handleRegistration} className={styles.formContainer}>
					<div className={styles.usernameInput}>
						<img src={userIcon} alt='userIcon' height={16} />
						<input placeholder='Email or username' type='text' />
					</div>
					<div className={styles.passwordInput}>
						<img src={passwordIcon} alt='userIcon' height={17} />
						<input placeholder='Enter your password' type='password' />
					</div>
					<div className={styles.passwordInput}>
						<img src={passwordIcon} alt='userIcon' height={17} />
						<input placeholder='Enter your password' type='password' />
					</div>
					<button type='submit' disabled={isLoading}>
						{isLoading ? 'Loading...' : 'Register'}
					</button>
				</form>
				<div className={styles.footer}>
					<div className={styles.checkboxContainer}>
						<input type='checkbox' id='rememberMe' value={'false'} />
						<label htmlFor='rememberMe'>Remember me</label>
					</div>
				</div>
			</div>
		</div>
	);
};

export { RegisterPage };
