import DisplayDocumentCards from '../components/DisplayDocumentCards';
import { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
	return (
		<div className="row vh-100">
			<div
				className="col-12 col-md-3 d-flex flex-column bg-primary"
				role="navigation"
			>
				<DisplayDocumentCards />
			</div>
			<div className="col-12 col-md-6 d-flex flex-column bg-secondary border">
				le pdf tu coco
			</div>
			<div className="col-12 col-md-3 d-flex flex-column bg-success border">
				les options
			</div>
		</div>
	);
};

export default Home;
