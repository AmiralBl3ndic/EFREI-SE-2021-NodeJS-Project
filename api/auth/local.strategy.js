const LocalStrategy = require('passport-local').Strategy;
const argon2 = require('argon2');

const UserService = require('../services/user.service');
const AuthService = require('../services/auth.service');

module.exports = new LocalStrategy(
	{ usernameField: 'username' },
	async function (username, password, done) {
		try {
			const user = await UserService.findByUsername(username);

			if (!user) return done(null, false, { message: 'User not found' });

			if (await argon2.verify(user.password, password)) {
				delete user.password;
				return done(null, user);
			}
			return done(null, false, { message: 'Wrong credentials' });
		} catch (error) {
			return done(error);
		}
	},
);
