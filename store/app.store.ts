import { createStore, action, thunk } from 'easy-peasy';
import axios from 'axios';
import { Note, Revision, User } from './frontend.types';
import ApplicationStore from './appstore.model';
import { toast } from 'react-toastify';

const $axios = axios.create({
	baseURL: '/api', // TODO: change to a Environmental variable
});

const store = createStore<ApplicationStore>({
	// ======== State ========
	currentUser: null,
	notes: [],
	revisions: [],
	noteContent: '',
	currentNote: null,

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
				toast(`Welcome ${res.data.username}!`, {
					position: 'top-center',
				});
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
				toast('Account created!', {
					position: 'top-center',
				});
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
				withCredentials: true,
			})
			.then((res) => {
				actions.addMultipleNotes(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
	}),

	setNotes: action((state, payload) => {
		state.notes = payload;
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

	uploadNewNote: thunk((actions, { title }, { getState }) => {
		const { currentUser } = getState();

		if (title) {
			$axios
				.post(
					`/users/${getState().currentUser.username}/notes`,
					{
						title,
					},
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					const newNote = {
						id: res.data.id,
						author: currentUser.username,
						title: res.data.title,
						content: '',
						lastModified: new Date().toISOString(),
						link: res.data.link,
					};

					actions.addNote(newNote);
					actions.setCurrentNote(newNote);

					toast('Note created!', {
						position: 'top-center',
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}),

	createRevision: thunk((actions, _, { getState }) => {
		const { currentUser, currentNote, noteContent, notes } = getState();

		if (currentUser && currentNote && noteContent != null) {
			$axios
				.post(
					`/users/${currentUser.username}/notes/${currentNote.id}/revisions`,
					{
						content: noteContent,
					},
					{
						withCredentials: true,
					},
				)
				.then((res) => {
					const updatedNote = {
						...currentNote,
						content: res.data.contentAfter,
						lastModified: res.data.timestamp,
					};

					actions.setCurrentNote(updatedNote);

					actions.setNotes(
						notes.map((note) =>
							note.id === updatedNote.id ? updatedNote : note,
						),
					);

					toast('Revision created!', {
						position: 'top-center',
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}),

	updateCurrentNoteTitle: thunk((actions, { title }, { getState }) => {
		const { currentUser, currentNote, notes } = getState();

		if (title && title !== currentNote.title) {
			$axios
				.patch(
					`/users/${currentUser.username}/notes/${currentNote.id}`,
					{ title },
					{
						withCredentials: true,
					},
				)
				.then(() => {
					const updatedNote = {
						...currentNote,
						title,
					};

					actions.setCurrentNote(updatedNote);
					actions.setNotes(
						notes.map((n) => (n.id === updatedNote.id ? updatedNote : n)),
					);

					toast('Title updated!', {
						position: 'top-center',
					});
				})
				.catch((err) => {
					console.error(err);
				});
		}
	}),

	////////////////////////////////////////////////////////////
	// Editor
	////////////////////////////////////////////////////////////
	setNoteContent: action((state, payload) => {
		state.noteContent = payload;
	}),
});

export default store;
