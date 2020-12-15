import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';

const AppPage: NextPage = () => {
	return (
		<>
			<Head>
				<title>App | Ad Versionem</title>
			</Head>

			<aside role="navigation">notes navigator</aside>

			<main>note editor</main>

			<aside>revisions explorer</aside>
		</>
	);
};

export default AppPage;
