const { expect } = require('chai');

const NotesService = require('api/services/notes.service');
const Revision = require('api/models/revision.model');
const Modification = require('api/models/modification.model');

describe('NotesService', () => {
	describe('.buildNoteContentFromRevisions', () => {
		it('works with a single revision containing one modification', () => {
			const revision = new Revision(Date.now(), [
				new Modification(1, '', 'Hello world'),
			]);

			expect(NotesService.buildNoteContentFromRevisions(revision));
		});
	});
});
