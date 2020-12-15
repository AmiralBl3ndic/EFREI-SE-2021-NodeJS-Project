import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useStoreActions, useStoreState } from 'easy-peasy';
import ApplicationStore from '../store/appstore.model';
import { useRouter } from 'next/router';
import DocumentCard from '../components/DocumentCard';
import { Note } from '../store/frontend.types';
import NoteEditor from '../components/NoteEditor';
import AddNote from 'components/AddNote';
import AddRevision from 'components/AddRevision';

const AppPage: NextPage = () => {
	const setNoteContent = useStoreActions<ApplicationStore>(
		(actions) => actions.setNoteContent,
	);

	const currentNote: Note = useStoreState<ApplicationStore>(
		(state) => state.currentNote,
	);

	const setCurrentNote = useStoreActions<ApplicationStore>(
		(actions) => actions.setCurrentNote,
	);

	const notes = useStoreState<ApplicationStore>((state) => state.notes);

	const router = useRouter();
	const currentUser = useStoreState<ApplicationStore>(
		(state) => state.currentUser,
	);

	React.useEffect(() => {
		if (router && !currentUser) {
			router.push('/');
		}
	}, [router, currentUser]);

	return (
		<>
			<Head>
				<title>App | Ad Versionem</title>
			</Head>

			<main className="h-screen lg:max-h-screen grid gap-0 grid-cols-12 grid-rows-1">
				<aside
					role="navigation"
					className="col-span-2 flex flex-col align-items-center max-h-full"
				>
					<h2 className="text-xl"> Your notes</h2>
					<div className="w-full px-3 flex flex-col align-items-center overflow-y-scroll">
						<AddNote />
						<ul>
							{notes.map((note) => (
								<li key={note.id} onClick={() => setCurrentNote(note)}>
									<DocumentCard note={note} key={note.id} />
								</li>
							))}
						</ul>
					</div>
				</aside>

				<div role="main" className="col-span-8 bg-white py-2 px-6">
					{currentNote ? (
						<>
							<header className="flex justify-between mt-3 mb-5">
								{/* TODO: make this editable */}
								<h1>{currentNote?.title || ''}</h1>
							</header>

							<NoteEditor
								initialNoteContent={currentNote.content}
								onChange={setNoteContent}
							/>
						</>
					) : (
						<>
							<div className="h-full flex flex-col justify-center items-center">
								<h1>
									Select a note, or <span role="suggestion">create one</span>
								</h1>
							</div>
						</>
					)}
				</div>

				<aside
					role="complementary"
					className="col-span-2 flex flex-col align-items-center max-h-full"
				>
					<h2 className="text-lg">Revisions</h2>
					<AddRevision />
				</aside>
			</main>
		</>
	);
};

export default AppPage;
