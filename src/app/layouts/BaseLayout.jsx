import { Route, Routes } from 'react-router-dom';
import { Favourites } from '../../pages/FavouritesPage';
import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { MovieDetailsPage } from '../../pages/MovieDetailsPage/ui/MovieDetailsPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { UserLocationPage } from '../../pages/UserLocationPage';
import { UserProfilePage } from '../../pages/UserProfilePage';

function BaseLayout() {
	return (
		<Routes>

			<Route path='/' element={<HomePage />} />
			<Route path='/login' element={<LoginPage />} />
			<Route path='/register' element={<RegisterPage />} />
			<Route path='/favourites' element={<Favourites />} />
			
			<Route path='/movie/:movieId' element={<MovieDetailsPage />} />

		
			
			
			
			<Route exact path='/userprofile' Component={UserProfilePage} />
			<Route exact path='/userlocation' Component={UserLocationPage} />

		</Routes>
	);
}

export default BaseLayout;
