const { customAlphabet } = require('nanoid');

const nanoid = customAlphabet('abcdefghijklmnopqrstuvwxyz1234567890', 16);

class Revision {
	/**
	 *
	 * @param {string} timestamp
	 * @param {Modification[]} modifications
	 */
	constructor(timestamp, modifications) {
		/**
		 * Unique identifier of the revision
		 * @type {string}
		 */
		this.hash = nanoid();

		/**
		 * Time (in ms) at which the revisions occurs
		 * @type {number}
		 */
		this.timestamp = Date.now();

		/**
		 *
		 * @type {Modification[]}
		 */
		this.modification = modifications;
	}
}
