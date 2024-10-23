import FavouriteList from '../../../features/favouriteList/ui/FavouriteList';
import { Header } from '../../../widgets/Header/ui/Header';

const Favourites = () => {
	return (
		<div className='_wrapper'>
			<Header />
			<main>
				<div className='_container'>
					<FavouriteList />
				</div>
			</main>
		</div>
	);
};

export { Favourites };
