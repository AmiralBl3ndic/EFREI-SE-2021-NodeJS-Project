const R = require('ramda');
const Modification = require('../models/modification.model');
const Revision = require('../models/revision.model');
const supabase = require('../db');
const { searchEngine } = require('../db');

const groupByPosition = R.groupBy(R.prop('position'));

/**
 * @typedef NoteWithModifications
 */

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
		const orderedRevisions = R.sortBy(R.prop('timestamp'), revisions).reverse();

		const modificationOrderedByTimestamp = orderedRevisions.flatMap(
			R.prop('modification'),
		);

		const maxLineNumber = R.reduce(
			R.max,
			-Infinity,
			modificationOrderedByTimestamp.map(R.prop('position')),
		);

		let content = '';
		for (let i = 1; i <= maxLineNumber; i++) {
			// Find the most recent modification on that line
			const modif = modificationOrderedByTimestamp.find(
				(m) => m.position === i,
			);

			if (!modif) {
				throw new Error('Missing line data');
			}

			// Apply modification if found, else apply empty line
			content += modif.after ? `${modif.after}\n` : '';
		}

		return content;
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
			content
				.split('\n')
				.map((l, idx) => new Modification(idx + 1, undefined, l)),
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
		const revertedRevision = new Revision(
			revision.timestamp,
			revision.modification.map(
				(m) => new Modification(m.position, m.after, m.before),
			),
		);

		return NotesService.applyRevisionsToContent(content, revertedRevision);
	}

	/**
	 * Generate the revision to transition between the old and the new content of the note
	 * @param {string} oldContent Base content to compare to
	 * @param {string} newContent Final content to reach
	 * @param {number} timestamp Timestamp to use for revision, default is Date.now()
	 * @returns {Revision} Revision to reach the desired final content
	 */
	static getRevisionFromContentDifference(
		oldContent,
		newContent,
		timestamp = Date.now(),
	) {
		const oldLines = oldContent == null ? [undefined] : oldContent.split('\n');
		const newLines = newContent == null ? [undefined] : newContent.split('\n');

		const modifications = [];

		if (oldLines.length <= newLines.length) {
			for (let i = 0; i < oldLines.length; i++) {
				if (oldLines[i] !== newLines[i]) {
					modifications.push(new Modification(i + 1, oldLines[i], newLines[i]));
				}
			}

			for (let i = oldLines.length; i < newLines.length; i++) {
				modifications.push(new Modification(i + 1, undefined, newLines[i]));
			}
		}

		if (newLines.length < oldLines.length) {
			for (let i = 0; i < newLines.length; i++) {
				if (oldLines[i] !== newLines[i]) {
					modifications.push(new Modification(i + 1, oldLines[i], newLines[i]));
				}
			}

			for (let i = newLines.length; i < oldLines.length; i++) {
				modifications.push(new Modification(i + 1, oldLines[i], undefined));
			}
		}

		return new Revision(timestamp, modifications);
	}

	/**
	 * Populates the search engine with notes a given user has access to (read or write)
	 * @param {string} userId Id of the user to populate search engine with notes for
	 */
	static async populateSearchEngineForUser(userId) {
		const index = await searchEngine.getOrCreateIndex(userId, {
			primaryKey: 'note_id',
		});

		// Trigger index reset or creation
		const resetIndexPromise = index.deleteAllDocuments();

		// Without waiting, retrieve data from the PostgreSQL database
		const { error, data: notes } = await supabase
			.from('user_notes_with_rights')
			.select('*')
			.eq('user_id', userId)
			.or('can_read.eq.true,can_write.eq.true');

		if (error) throw error;

		// Fetch all modifications for all notes
		/**
		 * @type {NoteWithModifications[]}
		 */
		const notesWithModifications = (
			await Promise.allSettled(
				notes.map(async (n) => {
					const { error, data } = await supabase
						.from('notes_revisions')
						.select('*')
						.eq('note_id', n.note_id);

					if (error) return null;

					return {
						...n,
						modifications: data,
					};
				}),
			)
		)
			.filter((p) => p.status === 'fulfilled')
			.map(R.prop('value'));

		// Ensure index has been created or emptied prior to doing anything else now
		await resetIndexPromise;

		return index.addDocuments(notesWithModifications);
	}

	/**
	 * Search for notes
	 * @param {string} userId Id of the user to perform search with
	 * @param {string} searchTerm Search term to query search engine with
	 * @returns {Note[]}
	 */
	static searchNotes(userId, searchTerm) {
		return [];
	}
}

module.exports = NotesService;
