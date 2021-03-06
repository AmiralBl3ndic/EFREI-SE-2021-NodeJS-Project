import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { useStoreActions } from 'easy-peasy';

import ApplicationStore from 'store/appstore.model';

const AddNote: React.FC = () => {
	const [title, setTitle] = React.useState('');
	const [show, setShow] = React.useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const sendAddNote = useStoreActions<ApplicationStore>(
		(actions) => actions.uploadNewNote,
	);

	const AddNoteAction = () => {
		const obj = {
			title: title,
		};

		sendAddNote(obj);
		handleClose();
	};

	const CancelNoteAction = () => {
		handleClose();
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-outline-success btn-lg btn-block"
				onClick={handleShow}
			>
				Create new note
			</button>

			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Add a new note</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<div className="row">
						<div className="col-md-2">
							<h5>Title</h5>
						</div>
						<div className="col-md-10">
							<input
								placeholder="please write your title"
								className="w-full"
								onChange={(event) => setTitle(event.target.value)}
							/>
						</div>
					</div>
				</Modal.Body>
				<Modal.Footer>
					<button
						className="btn btn-outline-danger btn-sm"
						onClick={CancelNoteAction}
					>
						cancel
					</button>
					<button
						className="btn btn-outline-success btn-sm"
						onClick={AddNoteAction}
					>
						add note
					</button>
				</Modal.Footer>
			</Modal>
		</>
	);
};

export default AddNote;
