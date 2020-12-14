import DisplayDocumentCards from '../components/DisplayDocumentCards';
import { NextPage } from 'next';
import React from 'react';
import MarkDownComponent from 'components/MarkDownComponent';

const Home: NextPage = () => {
	return (
		<div className="row vh-100">
			<div
				className="col-12 col-md-2 d-flex flex-column bg-primary"
				role="navigation"
			>
				<DisplayDocumentCards />
			</div>
			<div className="col-12 col-md-8 d-flex flex-column bg-secondary border">
				<MarkDownComponent />
			</div>
			<div className="col-12 col-md-2 d-flex flex-column bg-success border">
				les options
			</div>
		</div>
	);
};

export default Home;
