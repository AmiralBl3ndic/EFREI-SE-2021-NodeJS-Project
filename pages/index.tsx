import LoginForm from 'components/LoginForm';
import NavBar from 'components/NavBar';
import RegisterForm from 'components/RegisterForm';
import WelcomeMessage from 'components/WelcomeMessage';
import { NextPage } from 'next';
import React from 'react';
import { Tabs, Tab, Container, Col, Row } from 'react-bootstrap';

const Index: NextPage = () => {
	return (
		<>
			<NavBar />
			<Row>
				<Col>
					<WelcomeMessage />
				</Col>
				<Col>
					<Container className="w-75">
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
					</Container>
				</Col>
			</Row>
		</>
	);
};

export default Index;
