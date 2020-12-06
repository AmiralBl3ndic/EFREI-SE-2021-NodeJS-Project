const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

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

	static issueJwt(username) {
		return jwt.sign(
			{
				sub: username,
			},
			jwtSecret,
			{
				expiresIn: '30m',
			},
		);
	}
}

module.exports = AuthService;
module.exports.hashPassword = AuthService.hashPassword;
