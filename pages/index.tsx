import { Alert } from '@windmill/react-ui';
import { NextPage } from 'next';
import React from 'react';
import LoginForm from '../components/LoginForm';

const Index: NextPage = () => {
	return (
		<>
			<div className="container mx-auto">
				<LoginForm />
			</div>
		</>
	);
};

export default Index;

/*

<div className="grid">
				<div className="welcomeArea">
					<p>
						Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis ad
						optio repellendus ab tenetur ratione ipsam libero illum dicta saepe
						odit nisi eligendi delectus dignissimos placeat dolorem porro,
						voluptatem nostrum.
					</p>
				</div>
				<div className="loginForm">
					<LoginForm />
					<Alert type="warning">Lorem ipsum dolor sit</Alert>
				</div>
			</div>

			*/
