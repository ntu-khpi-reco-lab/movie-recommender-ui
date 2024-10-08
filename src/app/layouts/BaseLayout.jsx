import { Route, Routes } from 'react-router-dom';
import { HomePage } from '../../pages/HomePage/ui/HomePage';
import { LoginPage } from '../../pages/LoginPage';
import { RegisterPage } from '../../pages/RegisterPage';

function BaseLayout() {
	return (
		<Routes>
			<Route exact path='/' Component={HomePage} />
			<Route exact path='/login' Component={LoginPage} />
			<Route exact path='/register' Component={RegisterPage} />
		</Routes>
	);
}

export default BaseLayout;
