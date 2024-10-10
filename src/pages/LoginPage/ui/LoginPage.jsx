import { Link } from 'react-router-dom';
import { Login } from '../../../features/auth/model/Login';
import styles from './LoginPage.module.scss';

const LoginPage = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Sign in</h2>
					<Link to='/register'>Register</Link>
				</div>

				<Login />
				<div className={styles.footer}>
					<div className={styles.checkboxContainer}>
						<input type='checkbox' id='rememberMe' value={'false'} />
						<label htmlFor='rememberMe'>Remember me</label>
					</div>
					<a href='#'>Lost your password?</a>
				</div>
			</div>
		</div>
	);
};

export { LoginPage };
