const UUIDService = require('../services/uuid.service');

class Revision {
	/**
	 *
	 * @param {number} timestamp
	 * @param {Modification[]} modifications
	 */
	constructor(timestamp, modifications) {
		/**
		 * Unique identifier of the revision
		 * @type {string}
		 */
		this.hash = UUIDService.generateNanoId();

		/**
		 * Time (in ms) at which the revisions occurs
		 * @type {number}
		 */
		this.timestamp = timestamp;

		/**
		 *
		 * @type {Modification[]}
		 */
		this.modification = modifications;
	}
}

module.exports = Revision;
