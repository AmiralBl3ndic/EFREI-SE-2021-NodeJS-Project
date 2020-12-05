const { JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserService = require('../services/user.service');

module.exports = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	({ username }, done) => {
		try {
			const user = await UserService.findByUsername(username);

			if (!user) return done(null, false, { message: 'User not found' });

			delete user.password;
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	},
);
