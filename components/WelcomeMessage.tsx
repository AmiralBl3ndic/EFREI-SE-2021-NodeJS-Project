import React from 'react';

const WelcomeMessage = () => {
	return (
		<div className="align-content-center">
			<div className="p-2">
				<h2 className="text-center">
					Welcome to <b>Ad Versionem</b> !
				</h2>
			</div>
			<div className="p-2">
				<p className="text-center">
					Ad Versionem is the easiest way to take note safely
				</p>
				<p className="text-center">
					With our unique versionning system, We offer our users the possibility
					to keep track of their notes and documents ! As well as the
					possibility to revert to older versions of the document.
				</p>
			</div>
			<div className="p-2">
				<h1 className="text-center">Try it for free !</h1>
			</div>
		</div>
	);
};

export default WelcomeMessage;
