const { expect } = require('chai');

const NotesService = require('../../../services/notes.service');
const Revision = require('../../../models/revision.model');
const Modification = require('../../../models/modification.model');

describe('NotesService', () => {
	describe('.buildNoteContentFromRevisions', () => {
		it('# rejects invalid positions', () => {
			const revision = new Revision(Date.now(), [
				new Modification(-1, '', 'Hello world'),
			]);

			expect(() => NotesService.buildNoteContentFromRevisions(revision))
				.to.throw(Error)
				.with.property('message', 'Invalid modification position');
		});

		describe('- On one line only', () => {
			it('# works with a single revision containing one modification', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, undefined, 'Hello world'),
				]);

				expect(NotesService.buildNoteContentFromRevisions(revision)).to.eq(
					'Hello world\n',
				);
			});

			it('# rejects several modifications on the same line on a single revisions', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, undefined, 'Hello world'),
					new Modification(1, 'Hello world', 'Hello, world!'),
				]);

				expect(() => NotesService.buildNoteContentFromRevisions(revision))
					.to.throw(Error)
					.with.property(
						'message',
						'Cannot apply several modifications on same line in one revision',
					);
			});

			it('# works with several revisions of one modification', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(1, 'Hello world', 'How are you?'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'How are you?\n',
				);
			});

			it('# applies the revisions in chronological order', () => {
				const revisions = [
					new Revision(Date.now(), [
						new Modification(1, 'Hello world', 'How are you?'),
					]),
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'How are you?\n',
				);
			});
		});

		describe('- On multiple lines', () => {
			it('# works with a single revision of several modifications', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, undefined, 'Hello world'),
					new Modification(2, undefined, 'How are you?'),
				]);

				expect(NotesService.buildNoteContentFromRevisions(revision)).to.eq(
					'Hello world\nHow are you?\n',
				);
			});

			it('# works with several revisions', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(2, undefined, 'How are you?'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'Hello, world\nHow are you?\n',
				);
			});

			it('# rejects non-declared lines', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, undefined, 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(3, undefined, 'How are you?'),
					]),
				];

				expect(() => NotesService.buildNoteContentFromRevisions(...revisions))
					.to.throw(Error)
					.with.property('message', 'Missing line data');
			});
		});
	});

	describe('.convertNoteContentToRevision', () => {
		it('# works with notes of a single line length', () => {
			const noteRevision = NotesService.convertNoteContentToRevision(
				'Hello world',
			);

			expect(noteRevision.modification.length).to.eq(1);
			expect(noteRevision.modification[0].position).to.eq(1);
			expect(noteRevision.modification[0].before).to.eq(undefined);
			expect(noteRevision.modification[0].after).to.eq('Hello world');
		});

		it('# takes the custom timestamp into account', () => {
			expect(
				NotesService.convertNoteContentToRevision('Hello world', 0).timestamp,
			).to.eq(0);
		});
	});

	describe('.revertRevision', () => {
		it('# works with valid revisions and modifications on one line', () => {
			const contentBefore = 'Hello World';
			const contentAfter = 'Hello World, this is a test';

			const revision = new Revision(Date.now(), [
				new Modification(1, contentBefore, contentAfter),
			]);

			expect(NotesService.revertRevision(contentAfter, revision)).to.eq(
				`${contentBefore}\n`,
			);
		});

		it('# works with valid revisions and modifications on several lines', () => {
			const contentBefore = 'Hello World, this is a test';
			const contentAfter = 'Hello World\nFasten your seatbelts';

			const revision = new Revision(Date.now(), [
				new Modification(1, contentBefore, contentAfter.split('\n')[0]),
				new Modification(2, undefined, contentAfter.split('\n')[1]),
			]);

			expect(NotesService.revertRevision(contentAfter, revision)).to.eq(
				`${contentBefore}\n`,
			);
		});
	});

	describe('.getRevisionFromContentDifference', () => {
		it('# works when adding content to an empty note', () => {
			const contentBefore = undefined;
			const contentAfter = 'Hello world';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(1);
			expect(revision.modification[0].position).to.eq(1);
			expect(revision.modification[0].before).to.eq(undefined);
			expect(revision.modification[0].after).to.eq(contentAfter);
		});

		it('# works for a single line difference', () => {
			const contentBefore = 'Hello';
			const contentAfter = 'Hello world';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(1);
			expect(revision.modification[0].position).to.eq(1);
			expect(revision.modification[0].before).to.eq(contentBefore);
			expect(revision.modification[0].after).to.eq(contentAfter);
		});

		it('# works when adding lines', () => {
			const contentBefore = 'Hello';
			const contentAfter = 'Hello\nHow are you?';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(1);

			expect(revision.modification[0].position).to.eq(2);

			expect(revision.modification[0].before).to.eq(undefined);
			expect(revision.modification[0].after).to.eq(contentAfter.split('\n')[1]);
		});

		it('# works when modifying a line and adding another line', () => {
			const contentBefore = 'Hello';
			const contentAfter = 'Hello world\nHow are you?';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(2);
			expect(revision.modification[0].position).to.eq(1);
			expect(revision.modification[1].position).to.eq(2);

			expect(revision.modification[0].before).to.eq(contentBefore);
			expect(revision.modification[0].after).to.eq(contentAfter.split('\n')[0]);

			expect(revision.modification[1].before).to.eq(undefined);
			expect(revision.modification[1].after).to.eq(contentAfter.split('\n')[1]);
		});

		it('# works when adding a line between two other', () => {
			const contentBefore = 'Line 1\nLine 3';
			const contentAfter = 'Line 1\nLine 2\nLine 3';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(2);
			expect(revision.modification[0].position).to.eq(2);
			expect(revision.modification[1].position).to.eq(3);

			expect(revision.modification[0].before).to.eq('Line 3');
			expect(revision.modification[0].after).to.eq('Line 2');

			expect(revision.modification[1].before).to.eq(undefined);
			expect(revision.modification[1].after).to.eq('Line 3');
		});

		it('# works when removing a line', () => {
			const contentBefore = 'Hello world\nHow are you?';
			const contentAfter = 'Hello';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(2);
			expect(revision.modification[0].position).to.eq(1);
			expect(revision.modification[1].position).to.eq(2);

			expect(revision.modification[0].before).to.eq(
				contentBefore.split('\n')[0],
			);
			expect(revision.modification[0].after).to.eq(contentAfter);

			expect(revision.modification[1].before).to.eq(
				contentBefore.split('\n')[1],
			);
			expect(revision.modification[1].after).to.eq(undefined);
		});

		it('# works when removing a line between two other', () => {
			const contentBefore = 'Line 1\nLine 2\nLine 3';
			const contentAfter = 'Line 1\nLine 3';

			const revision = NotesService.getRevisionFromContentDifference(
				contentBefore,
				contentAfter,
			);

			expect(revision.modification.length).to.eq(2);
			expect(revision.modification[0].position).to.eq(2);
			expect(revision.modification[1].position).to.eq(3);

			expect(revision.modification[0].before).to.eq('Line 2');
			expect(revision.modification[0].after).to.eq('Line 3');

			expect(revision.modification[1].before).to.eq('Line 3');
			expect(revision.modification[1].after).to.eq(undefined);
		});
	});
});
