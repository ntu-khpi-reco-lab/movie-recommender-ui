import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import popcornLogo from '/src/assets/icons/popcorn-bag.svg';

const Header = () => {
	const headerLinks = [
		{ title: 'Favorites', path: '/favorites' },
		{ title: 'Lorem', path: '/' },
		{ title: 'Ipsum', path: '/' },
		{ title: 'Dolor', path: '/' },
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
				<Link className={styles.user} to='/user-profile'>
					<img src='/src/assets/icons/userProfile.png' alt='user' height={40} />
				</Link>
			</nav>
		</header>
	);
};

export { Header };
