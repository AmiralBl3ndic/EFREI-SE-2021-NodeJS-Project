const supabase = require('../db');

const AuthService = require('./auth.service');

const supabaseFilterForbiddenCharsRegex = /(\.(not\.)?(eq|like|gt|lt|neq|gte|lte|ilike|in)\.)|,/;

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
	 * @returns {Promise<User | null>} Found user record, null if not found
	 * @throws In case of an error with supabase
	 */
	static findByUsername(username) {
		return this._findOneByField('username', username.trim());
	}

	/**
	 * Look for a user record in the database by its email
	 * @param {string} email Username of the user to look for
	 * @returns {Promise<User | null>} Found user record, null if not found
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

		if (
			[emailToCheck, usernameToCheck].some(
				supabaseFilterForbiddenCharsRegex.test,
			)
		) {
			throw new Error('Invalid email or username');
		}

		const { data: records, error } = await supabase
			.from('users')
			.select('*')
			.or(`email.eq.${emailToCheck},username.eq.${usernameToCheck}`);

		if (error) throw error;

		return records.length > 0;
	}

	/**
	 * Creates and persists a user record in the database with password hashing
	 * @param {object} user User to create
	 * @param {string} user.username Username of the user to create
	 * @param {string} user.email Email of the user to create
	 * @param {string} user.password Password of the user to create, will be hashed
	 * @returns {User | null} User object if created, null otherwise
	 * @throws {Error} in case of a supabase error
	 */
	static async create({ username, email, password }) {
		const { data: user, error } = await supabase.from('users').insert([
			{
				email,
				username,
				password: await AuthService.hashPassword(password),
			},
		]);

		if (error) throw new Error(error);

		if (!user) return null;

		return user;
	}
}

module.exports = UserService;
