import { Link } from 'react-router-dom';

import { RegisterForm } from '../../../features/auth/model/RegisterForm';
import styles from './RegisterPage.module.scss';

const RegisterPage = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.container}>
				<div className={styles.header}>
					<h2>Register</h2>
					<Link to='/login'>Sign in</Link>
				</div>
				<RegisterForm />
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
