const { Strategy: JwtStrategy } = require('passport-jwt');
const UserService = require('../services/user.service');

module.exports = new JwtStrategy(
	{
		jwtFromRequest: (req) =>
			req.cookies && req.cookies['jwt_token'] ? req.cookies['jwt_token'] : null,
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
