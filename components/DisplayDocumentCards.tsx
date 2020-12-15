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
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
	{ title: "8h et demi ? l'heure du demi" },
];

const DisplayDocumentCards: React.FC = () => {
	const [documents, setDocuments] = React.useState<documentProps[]>([]);

	useEffect(() => {
		setDocuments(resources);
	}, []);

	const clickable = () => {
		return <div className="alert alert-success">yes</div>;
	};

	return (
		<div
			className="row d-flex flex-column align-items-center"
			onClick={clickable}
		>
			{documents.map((doc, index) => {
				return (
					<DocumentCard key={index + 1} id={index + 1} title={doc.title} />
				);
			})}
		</div>
	);
};

export default DisplayDocumentCards;
