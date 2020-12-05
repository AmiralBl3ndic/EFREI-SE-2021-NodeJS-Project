const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const passport = require('../../auth/passport.config');
const AuthService = require('../../services/auth.service');
const registerRoutes = require('./register.routes');

router.use('/register', registerRoutes);
router.use(
	'/login',
	passport.authenticate('local', { session: false }),
	(req, res) => {
		const token = AuthService.issueJwt(req.user.username);

		return res.status(StatusCodes.OK).json({
			username: req.user.username,
			token,
		});
	},
);

module.exports = router;
