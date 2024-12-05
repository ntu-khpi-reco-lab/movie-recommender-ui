import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { loginUser } from '../../../../../app/store/slices/userSlice.js';
import eyeSlashIcon from '../../../../../assets/icons/eye-slash.svg';
import styles from './AuthForm.module.scss';
import eyeIcon from '/src/assets/icons/eye.svg';
import passwordIcon from '/src/assets/icons/password-icon.svg';
import userIcon from '/src/assets/icons/user-man-icon.svg';

const AuthForm = ({ title }) => {
	const [formData, setFormData] = useState({
		username: '',
		password: '',
		confirmPassword: '',
	});
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
		useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(null);
	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async e => {
		e.preventDefault();
		setIsLoading(true);

		try {
			if (title === 'Sign in') {
				await dispatch(
					loginUser({
						username: formData.username,
						password: formData.password,
					})
				).unwrap();
			}
			setRedirect('/');
		} catch (error) {
			alert(`${title} failed: ${error.message}`);
		} finally {
			setIsLoading(false);
		}
	};

	if (redirect) {
		return <Navigate to={redirect} />;
	}

	return (
		<form onSubmit={handleSubmit} className={styles.formContainer}>
			<div className={styles.usernameInput}>
				<img src={userIcon} alt='userIcon' height={16} />
				<input
					name='username'
					placeholder='Username'
					type='text'
					value={formData.username}
					onChange={handleChange}
					required
				/>
			</div>
			<div className={styles.passwordInput}>
				<img
					className={styles.passwordIcon}
					src={passwordIcon}
					alt='passwordIcon'
					height={16}
				/>
				<input
					name='password'
					placeholder='Enter your password'
					type={isPasswordVisible ? 'text' : 'password'}
					value={formData.password}
					onChange={handleChange}
					required
				/>
				<img
					height={16}
					src={isPasswordVisible ? eyeIcon : eyeSlashIcon}
					alt='toggle password visibility'
					className={styles.toggleIcon}
					onClick={() => setIsPasswordVisible(prev => !prev)}
				/>
			</div>
			{title === 'Register' && (
				<div className={styles.passwordInput}>
					<img src={passwordIcon} alt='confirmPasswordIcon' height={16} />
					<input
						name='confirmPassword'
						placeholder='Confirm your password'
						type={isConfirmPasswordVisible ? 'text' : 'password'}
						value={formData.confirmPassword}
						onChange={handleChange}
						required
					/>
					<img
						height={16}
						src={isConfirmPasswordVisible ? eyeIcon : eyeSlashIcon}
						alt='toggle confirm password visibility'
						className={styles.toggleIcon}
						onClick={() => setIsConfirmPasswordVisible(prev => !prev)}
					/>
				</div>
			)}

			<button type='submit' disabled={isLoading}>
				{isLoading ? 'Loading...' : title}
			</button>
		</form>
	);
};

export { AuthForm };
