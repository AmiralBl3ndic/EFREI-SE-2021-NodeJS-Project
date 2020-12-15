import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';
import { Note, Revision, User } from './frontend.types';
import ApplicationStore from './appstore.model';

const $axios = axios.create({
	baseURL: '/api', // TODO: change to a Environmental variable
});

const testNote: Note = {
	id: 'f89d47ef-f3c2-48e6-b265-dae5a6af17c9',
	title: 'QDROGMINSEDTGBNUOIMETSDBMIONU',
	content: '# Hello this is a test content',
	author: 'camille',
	link: '/api/users/camille/notes/f89d47ef-f3c2-48e6-b265-dae5a6af17c9',
	lastModified: new Date().toISOString(),
};

const store = createStore<ApplicationStore>({
	// ======== State ========
	currentUser: null,
	notes: [testNote],
	revisions: [],
	noteContent: '',
	currentNote: testNote,

	// ======== Auth =========
	setUser: action((state, userInfo) => {
		state.currentUser = userInfo;
	}),

	loginWithUsernameAndPassword: thunk((actions, { username, password }) => {
		$axios
			.post<User>('/auth/login', {
				username,
				password,
			})
			.then((res) => {
				actions.setUser(res.data);
				actions.getAllNoteOfUser();
			})
			.catch((err) => {
				console.error(err); // TODO: check error type and show message accordingly
			});
	}),

	registerWithUEmailUsernameAndPassword: thunk((actions, registerData) => {
		$axios
			.post<User>('/auth/register', registerData)
			.then((res) => {
				actions.setUser(res.data);
			})
			.catch((err) => {
				console.error(err); // TODO: check error type and show message accordingly
			});
	}),

	// ======== Notes ==========
	addNote: action((state, noteData) => {
		state.notes.push(noteData);
	}),

	addMultipleNotes: action((state, notes) => {
		state.notes.push(...notes);
	}),

	resetNotes: action((state) => {
		state.notes = [];
	}),

	getAllNoteOfUser: thunk((actions, _, { getState }) => {
		if (getState().currentUser === null) throw new Error('User not logged in');
		$axios
			.get<Note[]>(`/users/${getState().currentUser.username}/notes`, {
				headers: {
					Authorization: `Bearer ${getState().currentUser.token}`,
				},
			})
			.then((res) => {
				actions.addMultipleNotes(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}),

	setCurrentNote: action((state, payload) => {
		state.currentNote = payload;
	}),

	// ======== Note/Revision =======
	addRevision: action((state, revision) => {
		state.revisions.push(revision);
	}),

	addMultipleRevision: action((state, revisions) => {
		state.revisions.push(...revisions);
	}),

	getRevisionForNote: thunk((actions, noteId, { getState }) => {
		if (getState().currentUser === null) throw new Error('User not logged in');
		const note = getState().notes.find((note) => note.id === noteId);
		// TODO: catch error if note is undefined
		$axios
			.get<Revision[]>(
				`/users/${getState().currentUser.username}/notes/${note.id}/revisions`,
			)
			.then((res) => {
				actions.addMultipleRevision(res.data);
			})
			.catch((err) => console.error(err));
	}),

	////////////////////////////////////////////////////////////
	// Editor
	////////////////////////////////////////////////////////////
	setNoteContent: action((state, payload) => {
		state.noteContent = payload;
	}),
});

export default store;
