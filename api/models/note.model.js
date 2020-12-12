const UUIDService = require('../services/uuid.service');

class Note {
	constructor(title, content, revisions = []) {
		this.id = UUIDService.generateNanoId();

		/**
		 * Title of the note
		 */
		this.title = title;

		/**
		 * Current text content of the note
		 */
		this.content = content;

		/**
		 * Revisions of that note
		 * @type {Revision[]}
		 */
		this.revisions = revisions;
	}
}

module.exports = Note;
