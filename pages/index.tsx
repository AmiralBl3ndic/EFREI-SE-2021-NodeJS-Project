import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import TabLogin from 'components/TabLogin';
import Welcome from 'components/Welcome';
import WelcomeMessage from 'components/WelcomeMessage';
import { NextPage } from 'next';
import React from 'react';
import { Tabs, Tab, Container, Col, Row } from 'react-bootstrap';

const Index: NextPage = () => {
	return (
		<>
			<Row>
				<Col>
					<WelcomeMessage />
				</Col>
				<Col>
					<Container>
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
