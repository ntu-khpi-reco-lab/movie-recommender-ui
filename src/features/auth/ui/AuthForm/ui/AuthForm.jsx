import styles from './AuthForm.module.scss';
import passwordIcon from '/src/assets/icons/password-icon.svg';
import userIcon from '/src/assets/icons/user-man-icon.svg';

const AuthForm = ({ title }) => {
	return (
		<form className={styles.formContainer}>
			<div className={styles.usernameInput}>
				<img src={userIcon} alt='userIcon' height={16} />
				<input placeholder='Email or username' type='text' />
			</div>
			<div className={styles.passwordInput}>
				<img src={passwordIcon} alt='userIcon' height={17} />
				<input placeholder='Enter your password' type='password' />
			</div>
			{title === 'Register' && (
				<div className={styles.passwordInput}>
					<img src={passwordIcon} alt='userIcon' height={17} />
					<input placeholder='Confirm your password' type='password' />
				</div>
			)}

			<button>{title}</button>
		</form>
	);
};

export { AuthForm };
