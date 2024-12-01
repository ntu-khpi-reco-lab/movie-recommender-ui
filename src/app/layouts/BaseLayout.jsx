import { Route, Routes } from 'react-router-dom';
import { Favourites } from '../../pages/FavouritesPage';
import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';
import { UserLocationPage } from '../../pages/UserLocationPage';
import { UserProfilePage } from '../../pages/UserProfilePage';

function BaseLayout() {
	return (
		<Routes>
			<Route exact path='/' Component={HomePage} />
			<Route exact path='/login' Component={LoginPage} />
			<Route exact path='/register' Component={RegisterPage} />
			<Route exact path='/favourites' Component={Favourites} />
			<Route exact path='/user-profile' Component={UserProfilePage} />
			<Route exact path='/userlocation' Component={UserLocationPage} />
		</Routes>
	);
}

export default BaseLayout;
