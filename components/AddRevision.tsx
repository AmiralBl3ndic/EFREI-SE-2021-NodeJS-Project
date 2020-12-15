import { useStoreActions, useStoreState } from 'easy-peasy';
import React from 'react';
import ApplicationStore from 'store/appstore.model';

const AddRevision = () => {
	const createRevisionForCurrentNote = useStoreActions<ApplicationStore>(
		(actions) => actions.createRevision,
	);

	const revisions = useStoreState<ApplicationStore>((state) => state.revisions);

	return (
		<div className="w-full px-3 flex flex-col align-items-center overflow-y-scroll">
			{/* TODO: make this button add a revision */}
			<div className="my-1">
				<button
					className="btn btn-outline-primary btn-lg btn-block"
					onClick={() => createRevisionForCurrentNote()}
				>
					create new revision
				</button>
			</div>
			<ul className="w-full my-2">
				{revisions.map((revision) => {
					<li
						key={revision.hash}
						className="bg-light rounded-lg mb-2 cursor-pointer"
					>
						revision : {revision.hash}
					</li>;
				})}
				{new Array(100).fill(undefined).map((_, idx) => (
					<li key={idx} className="bg-light rounded-lg mb-2 cursor-pointer">
						#{idx + 1}
					</li>
				))}
			</ul>
		</div>
	);
};

export default AddRevision;
