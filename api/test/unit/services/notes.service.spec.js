const NotesService = require('../../../services/notes.service');
const Revision = require('../../../models/revision.model');
const Modification = require('../../../models/modification.model');

describe('NotesService', () => {
	describe('.buildNoteContentFromRevisions', () => {
		it('rejects invalid positions', () => {
			const revision = new Revision(Date.now(), [
				new Modification(-1, '', 'Hello world'),
			]);

			let error = null;
			try {
				NotesService.buildNoteContentFromRevisions(revision);
			} catch (err) {
				error = err;
			}

			expect(error).toHaveProperty('message', 'Invalid modification position');
		});

		describe('On one line only', () => {
			it('works with a single revision containing one modification', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, undefined, 'Hello world'),
				]);

				expect(NotesService.buildNoteContentFromRevisions(revision)).toBe(
					'Hello world\n',
				);
			});

			it('rejects several modifications on the same line on a single revisions', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, undefined, 'Hello world'),
					new Modification(1, 'Hello world', 'Hello, world!'),
				]);

				let error = null;

				try {
					NotesService.buildNoteContentFromRevisions(revision);
				} catch (err) {
					error = err;
				}

				expect(error).toHaveProperty(
					'message',
					'Cannot apply several modifications on same line in one revision',
				);
			});

			it('works with several revisions of one modification', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(1, 'Hello world', 'How are you?'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).toBe(
					'How are you?\n',
				);
			});

			it('applies the revisions in chronological order', () => {
				const revisions = [
					new Revision(Date.now(), [
						new Modification(1, 'Hello world', 'How are you?'),
					]),
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).toBe(
					'How are you?\n',
				);
			});
		});

		describe('On multiple lines', () => {
			it('works with a single revision of several modifications', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, undefined, 'Hello world'),
					new Modification(2, undefined, 'How are you?'),
				]);

				expect(NotesService.buildNoteContentFromRevisions(revision)).toBe(
					'Hello world\nHow are you?\n',
				);
			});

			it('works with several revisions', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(2, undefined, 'How are you?'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).toBe(
					'Hello, world\nHow are you?\n',
				);
			});

			it('rejects non-declared lines', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(3, undefined, 'How are you?'),
					]),
				];

				let error = null;
				try {
					NotesService.buildNoteContentFromRevisions(...revisions);
				} catch (err) {
					error = err;
				}

				expect(error).toHaveProperty('message', 'Missing line data');
			});
		});
	});

	describe('.convertNoteContentToRevision', () => {
		it('works with notes of a single line length', () => {
			const noteRevision = NotesService.convertNoteContentToRevision(
				'Hello world',
			);

			expect(noteRevision.modification.length).toBe(1);
			expect(noteRevision.modification[0].position).toBe(1);
			expect(noteRevision.modification[0].before).toBeUndefined();
			expect(noteRevision.modification[0].after).toBe('Hello world');
		});

		it('takes the custom timestamp into account', () => {
			expect(
				NotesService.convertNoteContentToRevision('Hello world', 0).timestamp,
			).toBe(0);
		});
	});

	describe('.revertRevision', () => {
		it('works with valid revisions and modifications on one line', () => {
			const contentBefore = 'Hello World';
			const contentAfter = 'Hello World, this is a test';

			const revision = new Revision(Date.now(), [
				new Modification(1, contentBefore, contentAfter),
			]);

			expect(NotesService.revertRevision(contentAfter, revision)).toBe(
				`${contentBefore}\n`,
			);
		});

		it('works with valid revisions and modifications on several lines', () => {
			const contentBefore = 'Hello World, this is a test';
			const contentAfter = 'Hello World\nFasten your seatbelts';

			const revision = new Revision(Date.now(), [
				new Modification(1, contentBefore, contentAfter.split('\n')[0]),
				new Modification(2, undefined, contentAfter.split('\n')[1]),
			]);

			expect(NotesService.revertRevision(contentAfter, revision)).toBe(
				`${contentBefore}\n`,
			);
		});
	});
});
