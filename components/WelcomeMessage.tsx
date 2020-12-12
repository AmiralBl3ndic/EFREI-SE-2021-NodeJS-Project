import React from 'react';
import Container from 'react-bootstrap/Container';

const WelcomeMessage = () => {
	return (
		<Container className="h-75 align-content-center">
			<div className="d-flex flex-column justify-content-between">
				<div className="p-2">
					<h2 className="text-center">
						Welcome to <b>NameOfTheProject</b> !
					</h2>
				</div>
				<div className="p-2">
					<p className="text-center">
						NameOfTheProject is the easiest way to take note safely
					</p>
					<p className="text-center">
						With our unique versionning system, We offer our users the
						possibility to keep track of their notes and documents ! As well as
						the possibility to revert to older versions of the document.
					</p>
				</div>
				<div className="p-2">
					<h1 className="text-center">Try it for free !</h1>
				</div>
			</div>
		</Container>
	);
};

export default WelcomeMessage;
