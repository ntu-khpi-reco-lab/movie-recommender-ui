import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';
import { saveLocation } from '../../../app/store/slices/locationSlice';
import { registerUser } from '../../../app/store/slices/userSlice';
import emailIcon from '../../../assets/icons/email.svg';
import eyeSlashIcon from '../../../assets/icons/eye-slash.svg';
import eyeIcon from '../../../assets/icons/eye.svg';
import idCard from '../../../assets/icons/id-card.svg';
import passwordIcon from '../../../assets/icons/password-icon.svg';
import userIcon from '../../../assets/icons/user-man-icon.svg';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
	const [formData, setFormData] = useState({
		email: '',
		username: '',
		password: '',
		confirmPassword: '',
		firstName: '',
		lastName: '',
	});
	const [isLoading, setIsLoading] = useState(false);
	const [redirect, setRedirect] = useState(null);
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const dispatch = useDispatch();

	const handleChange = e => {
		const { name, value } = e.target;
		setFormData(prev => ({ ...prev, [name]: value }));
	};

	const handleRegistration = async e => {
		e.preventDefault();
		setIsLoading(true);

		if (formData.password !== formData.confirmPassword) {
			alert('Passwords do not match!');
			setIsLoading(false);
			return;
		}

		try {
			await dispatch(registerUser(formData)).unwrap();

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
		} catch (error) {
			alert('Registration failed!');
		} finally {
			setIsLoading(false);
		}
	};

	const togglePasswordVisibility = field => {
		if (field === 'password') setShowPassword(prev => !prev);
		if (field === 'confirmPassword') setShowConfirmPassword(prev => !prev);
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
					<div className={styles.emailInput}>
						<img src={emailIcon} alt='emailIcon' height={16} />
						<input
							placeholder='Email'
							type='email'
							name='email'
							value={formData.email}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.usernameInput}>
						<img src={userIcon} alt='userIcon' height={16} />
						<input
							placeholder='Username'
							type='text'
							name='username'
							value={formData.username}
							onChange={handleChange}
						/>
					</div>
					<div className={styles.nameContainer}>
						<div className={styles.firstNameInput}>
							<img src={idCard} alt='idCard' height={18} />
							<input
								placeholder='First Name'
								type='text'
								name='firstName'
								value={formData.firstName}
								onChange={handleChange}
							/>
						</div>
						<div className={styles.lastNameInput}>
							<img src={idCard} alt='idCard' width={18} />
							<input
								placeholder='Last Name'
								type='text'
								name='lastName'
								value={formData.lastName}
								onChange={handleChange}
							/>
						</div>
					</div>

					<div className={styles.passwordInput}>
						<img src={passwordIcon} alt='passwordIcon' height={16} />
						<input
							placeholder='Password'
							type={showPassword ? 'text' : 'password'}
							name='password'
							value={formData.password}
							onChange={handleChange}
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
							placeholder='Confirm Password'
							type={showConfirmPassword ? 'text' : 'password'}
							name='confirmPassword'
							value={formData.confirmPassword}
							onChange={handleChange}
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
						{isLoading ? 'Loading...' : 'Register'}
					</button>
				</form>
			</div>
		</div>
	);
};

export { RegisterPage };
