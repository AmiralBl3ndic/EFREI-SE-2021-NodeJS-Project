import React from 'react';
import Tab from 'react-bootstrap/esm/Tab';
import Tabs from 'react-bootstrap/esm/Tabs';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const TabLogin = () => {
	return (
		<Tabs
			defaultActiveKey="profile"
			id="uncontrolled-tab-example"
			className="justify-content-center"
		>
			<Tab eventKey="home" title="Sign in">
				<RegisterForm />
			</Tab>
			<Tab eventKey="profile" title="Sign up">
				<LoginForm />
			</Tab>
		</Tabs>
	);
};

export default TabLogin;
