import React from 'react';

interface DocumentCardProps {
	id: number;
	title: string;
}

const DocumentCard: React.SFC<DocumentCardProps> = ({ id, title }) => {
	return (
		<div className="col-xl-3 col-sm-6 col-12">
			<div className="card my-card">
				<div className="card-content">
					<div className="card-body">
						<div className="media d-flex">
							<div className="align-self-center">
								<i className="gg-file-document"></i>
							</div>
							<div className="media-body text-right">
								<h3>Note #{id}</h3>
								<span>{title}</span>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentCard;
