import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import BaseLayout from './layouts/BaseLayout.jsx';
import './styles/index.scss';

createRoot(document.getElementById('root')).render(
	<StrictMode>
		<BaseLayout />
	</StrictMode>
);
