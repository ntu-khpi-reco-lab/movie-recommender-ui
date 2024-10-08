import styles from './RegisterForm.module.scss';
import passwordIcon from '/public/icons/password-icon.svg';
import userIcon from '/public/icons/user-man-icon.svg';

const RegisterForm = () => {
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
			<div className={styles.passwordInput}>
				<img src={passwordIcon} alt='userIcon' height={17} />
				<input placeholder='Confirm your password' type='password' />
			</div>
			<button>Register</button>
		</form>
	);
};

export { RegisterForm };
