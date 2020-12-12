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
					new Modification(1, '', 'Hello world'),
				]);

				expect(NotesService.buildNoteContentFromRevisions(revision)).to.eq(
					'Hello world',
				);
			});

			it('# rejects several modifications on the same line on a single revisions', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, '', 'Hello world'),
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
						new Modification(1, '', 'Hello, world'),
					]),
					new Revision(Date.now(), [
						new Modification(1, 'Hello world', 'How are you?'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'How are you?',
				);
			});

			it('# applies the revisions in chronological order', () => {
				const revisions = [
					new Revision(Date.now(), [
						new Modification(1, 'Hello world', 'How are you?'),
					]),
					new Revision(Date.now() - 100, [
						new Modification(1, '', 'Hello, world'),
					]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'How are you?',
				);
			});
		});

		describe('- On multiple lines', () => {
			it('# works with a single revision of several modifications', () => {
				const revision = new Revision(Date.now(), [
					new Modification(1, '', 'Hello world'),
					new Modification(2, '', 'How are you?'),
				]);

				expect(NotesService.buildNoteContentFromRevisions(revision)).to.eq(
					'Hello world\nHow are you?',
				);
			});

			it('# works with several revisions', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, '', 'Hello, world'),
					]),
					new Revision(Date.now(), [new Modification(2, 'd', 'How are you?')]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'Hello world\nHow are you?',
				);
			});

			it('# works out empty lines', () => {
				const revisions = [
					new Revision(Date.now() - 100, [
						new Modification(1, '', 'Hello, world'),
					]),
					new Revision(Date.now(), [new Modification(3, 'd', 'How are you?')]),
				];

				expect(NotesService.buildNoteContentFromRevisions(...revisions)).to.eq(
					'Hello world\n\nHow are you?',
				);
			});
		});
	});
});
