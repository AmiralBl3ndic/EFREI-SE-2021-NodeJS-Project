const R = require('ramda');
const Modification = require('../models/modification.model');
const Revision = require('../models/revision.model');

const groupByPosition = R.groupBy(R.prop('position'));

/**
 * Functions and helpers related to notes
 */
class NotesService {
	/**
	 * Compute a note content from revisions
	 * @param {Revision} revisions Revisions to use to compute content
	 * @return {string} Content of the note after computation
	 */
	static buildNoteContentFromRevisions(...revisions) {
		const allModifications = revisions.flatMap(R.prop('modification'));

		// Check if any modification on any revision has a negative or 0 position
		if (
			revisions
				.flatMap(R.pipe(R.prop('modification'), R.map(R.prop('position'))))
				.some((x) => x <= 0)
		) {
			throw new Error('Invalid modification position');
		}

		// Check if any revisions contains concurrent modifications
		revisions.forEach((r) => {
			const positions = groupByPosition(r.modification);
			if (
				R.keys(positions)
					.map((k) => positions[k].length)
					.filter((x) => x >= 2).length
			) {
				throw new Error(
					'Cannot apply several modifications on same line in one revision',
				);
			}
		});

		// Sort timestamp with most recent timestamps first
		const revsByTimestamp = R.sortBy(R.prop('timestamp'), revisions).reverse();
		R.keys(revsByTimestamp).map((k) => revsByTimestamp[k]);
	}

	/**
	 * Convert the content of a note to a single revision
	 * @param content {string}
	 * @param timestamp {number}
	 * @return {Revision}
	 */
	static convertNoteContentToRevision(content, timestamp = Date.now()) {
		return new Revision(
			timestamp,
			content.split('\n').map((l, idx) => new Modification(idx + 1, '', l)),
		);
	}

	/**
	 * Compute the new content of a note after some revisions are applied to it
	 * @param {string} content Content of the note to work on
	 * @param {Revision} revisions Revisions to apply
	 * @returns {string} Content of the note after applying the revisions
	 */
	static applyRevisionsToContent(content, ...revisions) {
		return NotesService.buildNoteContentFromRevisions(
			NotesService.convertNoteContentToRevision(content, 0),
			...revisions,
		);
	}

	/**
	 * Compute the new content of a note after reverting some revisions on it
	 * @param {string} content Content of the note to work on
	 * @param {Revision} revision Revision to revert
	 * @returns {string} Content of the note after reverting the revision
	 */
	static revertRevision(content, revision) {
		return '';
	}
}

module.exports = NotesService;
