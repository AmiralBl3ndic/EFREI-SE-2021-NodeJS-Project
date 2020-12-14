import { NextPage } from 'next';
import React from 'react';
import WelcomePage from './welcomePage';
import Home from './home';
import DisplayDocumentCards from 'components/DisplayDocumentCards';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';
import { useRouter } from 'next/router';
import { useStoreState } from 'easy-peasy';
import ApplicationStore from 'store/appstore.model';
import LoginForm from 'components/LoginForm';
import RegisterForm from 'components/RegisterForm';
import WelcomeMessage from 'components/WelcomeMessage';

const Index: NextPage = () => {
	const router = useRouter();
	const currentUser = useStoreState<ApplicationStore>(
		(state) => state.currentUser,
	);

	React.useEffect(() => {
		if (router && currentUser) {
			router.push('#');
		}
	}, [router, currentUser]);

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

export default Index;
