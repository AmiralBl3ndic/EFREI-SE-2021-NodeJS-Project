import React from 'react';
import Head from 'next/head';
import { NextPage } from 'next';
import { useStoreState } from 'easy-peasy';
import ApplicationStore from '../store/appstore.model';
import { useRouter } from 'next/router';
import DocumentCard from '../components/DocumentCard';
import Editor from 'rich-markdown-editor';

const AppPage: NextPage = () => {
	const [noteContent, setNoteContent] = React.useState('');

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

			<div className="h-screen lg:max-h-screen grid gap-0 grid-cols-12 grid-rows-1">
				<aside
					role="navigation"
					className="col-span-2 flex flex-col align-items-center px-3 max-h-full overflow-y-scroll"
				>
					<h2 className="text-xl">Notes</h2>
					{new Array(100).fill(undefined).map((_, idx) => (
						<DocumentCard key={idx} id={idx} title={`${idx + 1}`} />
					))}
				</aside>

				<main role="main" className="col-span-9 bg-light py-2 px-6">
					<div>
						<Editor
							template={false}
							defaultValue=""
							onChange={setNoteContent}
							className="h-screen"
							onSave={() => alert('SAVED')}
						/>
					</div>
				</main>

				<aside
					role="list"
					className="col-span-1 flex flex-col align-items-center px-3 max-h-full overflow-y-scroll"
				>
					<h2 className="text-lg">Revisions</h2>

					{new Array(100).fill(undefined).map((_, idx) => (
						<div
							key={idx}
							className="w-full bg-light rounded-lg mb-2 cursor-pointer"
						>
							#{idx + 1}
						</div>
					))}
				</aside>
			</div>
		</>
	);
};

export default AppPage;
