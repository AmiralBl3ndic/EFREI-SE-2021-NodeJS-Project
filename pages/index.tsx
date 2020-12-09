import { Alert } from '@windmill/react-ui';
import RegisterForm from 'components/RegisterForm';
import Welcome from 'components/Welcome';
import { NextPage } from 'next';
import React from 'react';
import LoginForm from '../components/LoginForm';

const Index: NextPage = () => {
	return (
		<>
			<div className="position-fixed w-100 h-100 left-0 right-0">
				<Welcome />
				<RegisterForm />
				<LoginForm />
			</div>
		</>
	);
};

export default Index;
