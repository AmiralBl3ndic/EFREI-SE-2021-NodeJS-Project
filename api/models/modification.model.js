class Modification {
	/**
	 *
	 * @param {number} position Line is impacted by this modification
	 * @param {string} before Content of the line before modification
	 * @param {string} after Content of the line after modification
	 */
	constructor(position, before, after) {
		/**
		 * Line number of the line impacted by the modification
		 * @type {number}
		 */
		this.position = position;

		/**
		 * Line content before modification
		 * @type {string}
		 */
		this.before = before;

		/**
		 * Line content after modification
		 * @type {string}
		 */
		this.after = after;
	}
}
