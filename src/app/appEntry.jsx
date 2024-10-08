import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout.jsx';
import './styles/index.scss';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BrowserRouter>
			<BaseLayout />
		</BrowserRouter>
	</StrictMode>
);
