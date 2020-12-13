import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import WelcomeMessage from 'components/WelcomeMessage';
import { NextPage } from 'next';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import WelcomePage from './welcomePage';
import Home from './home';

const Index: NextPage = () => {
	return <Home />;
};

export default Index;
