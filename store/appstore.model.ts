import { Action, Thunk } from 'easy-peasy';
import { Note, Revision, User } from './frontend.types';

export default interface ApplicationStore {
	// ======== State ========
	currentUser?: User;
	notes: Note[];
	revisions: Revision[];


	// ======== Auth =========
	setUser: Action<ApplicationStore, User>;

	loginWithUsernameAndPassword: Thunk<ApplicationStore, {username:string, password:string}>;

	registerWithUEmailUsernameAndPassword: Thunk<ApplicationStore, {email:string, username:string, password:string}>;


	// ======== Notes ==========
	addNote: Action<ApplicationStore, Note>;

	addMultipleNotes: Action<ApplicationStore, Note[]>;

	resetNotes: Action<ApplicationStore>;

	getAllNoteOfUser: Thunk<ApplicationStore>;


	// ======== Note/Revision =======
	addRevision: Action<ApplicationStore, Revision>;

	addMultipleRevision: Action<ApplicationStore, Revision[]>;

	getRevisionForNote: Thunk<ApplicationStore, string>;
}
