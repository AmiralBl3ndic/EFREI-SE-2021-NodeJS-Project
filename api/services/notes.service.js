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
		return '';
	}

	/**
	 * Compute the new content of a note after some revisions are applied to it
	 * @param {string} content Content of the note to work on
	 * @param {Revision} revisions Revisions to apply
	 * @returns {string} Content of the note after applying the revisions
	 */
	static applyRevisionsToContent(content, ...revisions) {
		return '';
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
