/**
 * Represents an application user
 */
class User {
	constructor(username = '', email = '', password = '') {
		/**
		 * Id of that user
		 * @type {string}
		 */
		this.id = '';

		/**
		 * Username of that user
		 * @type {string}
		 */
		this.username = username;

		/**
		 * Email of that user
		 * @type {string}
		 */
		this.email = email;

		/**
		 * Password (hashed if comes from database) of that user
		 * @type {string}
		 */
		this.password = password;
	}
}

module.exports = User;
