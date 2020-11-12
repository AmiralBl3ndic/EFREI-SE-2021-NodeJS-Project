const argon2 = require('argon2');

class AuthService {
	/**
	 * Hash a password using the Argon2 algorithm
	 * @param password Password to hash
	 * @return {Promise<String>} Hashed password
	 * @throws When `password` is invalid or argon2 cannot hash it
	 */
	static hashPassword(password) {
		if (!password || typeof password !== 'string') {
			throw new Error('Password must be a non-empty string');
		}

		return argon2.hash(password);
	}
}
