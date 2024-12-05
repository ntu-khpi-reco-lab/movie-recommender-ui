// import react from '@vitejs/plugin-react';
// import { defineConfig } from 'vite';

// // https://vitejs.dev/config/
// export default defineConfig({
// 	plugins: [react()],
// });

import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'http://localhost:8080', // Адрес вашего backend-сервера
				changeOrigin: true, // Меняет origin запроса на target
				rewrite: path => path.replace(/^\/api/, ''), // Убирает `/api` из пути
			},
		},
	},
});
