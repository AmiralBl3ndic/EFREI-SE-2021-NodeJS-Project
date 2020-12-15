import { render } from '../test-utils';
import NoteNavCard from '../../components/NoteNavCard';
import { Note } from '../../store/frontend.types';

describe('components/<NoteNavCard />', () => {
	const testNote: Note = {
		id: '14baac56-06b4-4372-b20d-af48608c8c72',
		author: 'JohnDoe',
		title: 'Lorem ipsum note',
		content: '# Lorem ipsum\nDolor sit amet consectetur...',
		lastModified: new Date().toISOString(),
		link: '/api/users/JohnDoe/notes/14baac56-06b4-4372-b20d-af48608c8c72',
	};

	describe('Rendering', () => {
		const { getByText, queryByText } = render(<NoteNavCard note={testNote} />);

		it("renders the author's username", () => {
			expect(getByText('JohnDoe')).not.toBeNull();
		});

		it("renders the note's id", () => {
			expect(getByText('14baac56-06b4-4372-b20d-af48608c8c72')).not.toBeNull();
		});

		it("renders the note's title", () => {
			expect(getByText('Lorem ipsum note')).not.toBeNull();
		});

		it("doesn't render the note's content", () => {
			expect(queryByText('# Lorem ipsum\nDolor sit amet')).toBeNull();
		});
	});
});
