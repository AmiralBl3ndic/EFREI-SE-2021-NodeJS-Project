import { NextPage } from 'next';
import Head from 'next/head';

const Index: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home page</title>
			</Head>

			<h1>Hello world</h1>
			<p>This is a notes taking app</p>
		</>
	);
};

export default Index;
