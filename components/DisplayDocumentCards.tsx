import React, { useEffect } from 'react';
import DocumentCard from './DocumentCard';

interface documentProps {
	title: string;
}

const resources = [
	{ title: 'Les joueurs du PSG' },
	{ title: 'Tuchel : est-il si mauvais?' },
	{ title: 'Un ricard et ça repart !' },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: 'pitiez finissons ce semestre' },
];

const DisplayDocumentCards = () => {
	const [documents, setDocuments] = React.useState<documentProps[]>([]);

	useEffect(() => {
		setDocuments(resources);
	});

	return (
		<>
			{documents.map((doc, index) => {
				return <DocumentCard id={index + 1} title={doc.title} />;
			})}
		</>
	);
};

export default DisplayDocumentCards;
