import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import popcornLogo from '/src/assets/icons/popcorn-bag.svg';

const Header = () => {
	const headerLinks = [
		{ title: 'Showtimes', path: '/' },
		{ title: 'Favourites', path: '/favourites' },
		{ title: 'Recommendations', path: '/' },
		{ title: 'About us', path: '/' },
	];

	return (
		<header className={styles.header}>
			<nav className='_container'>
				<Link className={styles.logo} to='/'>
					<img src={popcornLogo} alt='LogoPopcorn' height={40} />
					PMR
				</Link>
				<ul>
					{headerLinks.map(item => (
						<li key={item.title}>
							<Link to={`${item.path}`}>{item.title}</Link>
						</li>
					))}
				</ul>
				<Link className={styles.user} to='/userprofile'>
					<img src='/src/assets/icons/userProfile.png' alt='user' height={40} />
				</Link>
			</nav>
		</header>
	);
};

export { Header };
