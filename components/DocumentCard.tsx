import React from 'react';
import { useStoreActions } from 'easy-peasy';
import ApplicationStore from '../store/appstore.model';
import { Note } from '../store/frontend.types';

interface DocumentCardProps {
	note: Note;
}

const DocumentCard: React.FC<DocumentCardProps> = ({ note }) => {
	const setCurrentNote = useStoreActions<ApplicationStore>(
		(actions) => actions.setCurrentNote,
	);

	return (
		<div className="bg-light w-full rounded-2xl my-2 cursor-pointer">
			<div className="card-content">
				<div className="card-body">
					<div className="media d-flex">
						<div className="align-self-center">
							<i className="gg-file-document"></i>
						</div>
						<div className="media-body text-right">
							<h3>Note #{note.id}</h3>
							<span>{note.title}</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DocumentCard;
