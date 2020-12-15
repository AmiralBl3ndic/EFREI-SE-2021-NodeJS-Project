import type { AppProps /*, AppContext */ } from 'next/app';
import '../style/welcome.css';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Windmill } from '@windmill/react-ui';
import store from 'store/app.store';
import { StoreProvider } from 'easy-peasy';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Windmill>
			<StoreProvider store={store}>
				<Component {...pageProps} />
			</StoreProvider>
		</Windmill>
	);
}

export default MyApp;
