const supabase = require('../db');

class UserService {
	static async _findAllByField(field, value) {
		const { data: userRecords, error } = await supabase
			.from('users')
			.select('*')
			.eq(field, value);

		if (error) throw new Error(error);

		return userRecords;
	}

	static async _findOneByField(field, value) {
		const records = await this._findAllByField(field, value);

		if (records.length === 0) return null;

		return records[0];
	}

	/**
	 * Look for a user record in the database by its username
	 * @param {string} username Username of the user to look for
	 * @returns {User | null} Found user record, null if not found
	 * @throws In case of an error with supabase
	 */
	static findByUsername(username) {
		return this._findOneByField('username', username.trim().toLowerCase());
	}

	/**
	 * Look for a user record in the database by its email
	 * @param {string} email Username of the user to look for
	 * @returns {User | null} Found user record, null if not found
	 * @throws In case of an error with supabase
	 */
	static findByEmail(email) {
		return this._findOneByField('email', email.trim().toLowerCase());
	}

	/**
	 * Check whether an email or a username is already used by an existing user
	 * @param {string} email Email to check users for
	 * @param {string} username Username to check users for
	 * @returns {boolean} Whether a user record already uses given `username` or `password`
	 * @throws In case of an error with supabase
	 */
	static async isEmailOrUsernameTaken(email, username) {
		const emailToCheck = email.trim().toLowerCase();
		const usernameToCheck = username.trim().toLowerCase();

		const { data: records, error } = await supabase
			.from('users')
			.select('*')
			.or(`email.eq.${emailToCheck},username.eq.${usernameToCheck}`);

		if (error) throw new Error(error);

		return records.length > 0;
	}
}

module.exports = UserService;
