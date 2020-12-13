import React from 'react';

const DocumentCard = () => {
	return (
		<div className="col-xl-3 col-sm-6 col-12">
			<div className="card">
				<div className="card-content">
					<div className="card-body">
						<div className="media d-flex">
							<div className="align-self-center">
								<i className="icon-pencil primary font-large-2 float-left"></i>
							</div>
							<div className="media-body text-right">
								<h3>Note #1</h3>
								<span>Some notes from FM class</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentCard;
