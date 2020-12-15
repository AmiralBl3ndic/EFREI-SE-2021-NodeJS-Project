import type { AppProps } from 'next/app';
import '../style/home.css';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { Windmill } from '@windmill/react-ui';
import { StoreProvider } from 'easy-peasy';
import Head from 'next/head';
import store from 'store/app.store';
import { ToastContainer } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.min.css';

const MyApp = ({ Component, pageProps }: AppProps) => {
	return (
		<>
			<Head>
				<title>Ad Versionem</title>
				<link rel="icon" href="/ad-versionem-favicon.png" />
			</Head>

			<Windmill>
				<StoreProvider store={store}>
					<Component {...pageProps} />
				</StoreProvider>
			</Windmill>

			<ToastContainer autoClose={4000} />
		</>
	);
};

export default MyApp;
