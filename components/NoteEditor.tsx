import React from 'react';
import Editor from 'rich-markdown-editor';

interface NoteEditorProps {
	initialNoteContent: string;
	onChange: (v: string) => void;
}

const NoteEditor: React.FC<NoteEditorProps> = ({
	initialNoteContent,
	onChange,
}) => {
	return (
		<div role="article">
			<Editor
				defaultValue={initialNoteContent}
				onChange={(v) => onChange(v())}
				className="px-5 min-h-1/2"
			/>
		</div>
	);
};

export default NoteEditor;
