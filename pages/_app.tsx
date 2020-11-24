import type { AppProps /*, AppContext */ } from 'next/app';
import '../style/welcome.css';
import 'tailwindcss/tailwind.css';
import React from 'react';
import { Windmill } from '@windmill/react-ui';

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<Windmill>
			<Component {...pageProps} />
		</Windmill>
	);
}

export default MyApp;
