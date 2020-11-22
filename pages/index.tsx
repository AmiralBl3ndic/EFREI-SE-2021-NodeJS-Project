import { NextPage } from 'next';
import Head from 'next/head';
import React from 'react';
import { Button } from 'react-bootstrap';

const Index: NextPage = () => {
	return (
		<>
			<Head>
				<title>Home page</title>
			</Head>

			<>
				<Button variant="peimary">Primary</Button>{' '}
				<Button variant="secondary">Secondary</Button>{' '}
				<Button variant="success">Success</Button>{' '}
				<Button variant="warning">Warning</Button>{' '}
				<Button variant="danger">Danger</Button> <Button variant="info">Info</Button>{' '}
				<Button variant="light">Light</Button> <Button variant="dark">Dark</Button>{' '}
				<Button variant="link">Link</Button>
			</>

			<h1>Hello world</h1>
			<p>This is a notes taking app</p>
		</>
	);
};

export default Index;
