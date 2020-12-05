const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const UserService = require('../services/user.service');

module.exports = new JwtStrategy(
	{
		jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
		secretOrKey: process.env.JWT_SECRET,
	},
	async ({ sub }, done) => {
		if (!sub) return done(null, false);

		try {
			const user = await UserService.findByUsername(sub);

			if (!user) return done(null, false, { message: 'User not found' });

			delete user.password;
			return done(null, user);
		} catch (error) {
			return done(error);
		}
	},
);
