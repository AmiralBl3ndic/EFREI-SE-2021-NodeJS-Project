import { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
	return (
		<div className="row h-100">
			<div className="col-12 col-md-3 d-flex flex-column justify-content-center border">
				differentes notes
			</div>
			<div className="col-12 col-md-6 d-flex flex-column justify-content-center border">
				le pdf tu coco
			</div>
			<div className="col-12 col-md-3 d-flex flex-column justify-content-center border">
				les options
			</div>
		</div>
	);
};

export default Home;
