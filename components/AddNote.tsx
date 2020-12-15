import Modal from 'react-bootstrap/Modal';
import React from 'react';
import { useStoreActions } from 'easy-peasy';
import { useForm } from 'react-hook-form';

import ApplicationStore from 'store/appstore.model';

const AddNote: React.FC = () => {
	const [show, setShow] = React.useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
	const { register, handleSubmit } = useForm();

	const sendAddNote = useStoreActions<ApplicationStore>(
		(actions) => actions.addNote,
	);

	const AddNoteAction = (data) => {
		const objToSend = {
			title: data.title,
		};

		console.log(objToSend);

		handleClose();
	};

	const CancelNoteAction = () => {
		handleClose();
	};

	return (
		<>
			<button
				type="button"
				className="btn btn-outline-light btn-lg"
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
							<span></span>
						</div>
						<div className="col-md-10">
							<form onSubmit={handleSubmit(AddNoteAction)}>
								<input
									name="title"
									placeholder="please write your title"
									className="w-full"
									ref={register({ required: true })}
								/>
							</form>
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
						type="submit"
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
