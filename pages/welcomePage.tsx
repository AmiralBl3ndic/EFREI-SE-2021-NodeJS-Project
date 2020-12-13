import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import WelcomeMessage from 'components/WelcomeMessage';
import { NextPage } from 'next';
import React from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

const WelcomePage: NextPage = () => {
	return (
		<div className="h-screen overflow-y-scroll overflow-x-hidden">
			<div className="d-flex justify-content-around h-100">
				<div className="row h-100">
					<div className="col-12 col-md-6 d-flex flex-column justify-content-center">
						<WelcomeMessage />
					</div>
					<div className="col-12 col-md-6 d-flex flex-column justify-content-center mt-10">
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
					</div>
				</div>
			</div>
		</div>
	);
};

export default WelcomePage;
