import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import BaseLayout from './layouts/BaseLayout.jsx';
import { store } from './store/index.js';
import './styles/index.scss';

const rootElement = document.getElementById('root');
const reactRoot = createRoot(rootElement);

reactRoot.render(
	<StrictMode>
		<BrowserRouter>
			<Provider store={store}>
				<BaseLayout />
			</Provider>
		</BrowserRouter>
	</StrictMode>
);
