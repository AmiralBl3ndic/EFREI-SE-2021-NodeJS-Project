const { StatusCodes } = require('http-status-codes');
const router = require('express').Router();
const passport = require('../../auth/passport.config');
const AuthService = require('../../services/auth.service');
const NotesService = require('../../services/notes.service');
const registerRoutes = require('./register.routes');

router.use('/register', registerRoutes);
router.use(
	'/login',
	passport.authenticate('local', { session: false }),
	(req, res) => {
		NotesService.populateSearchEngineForUser(req.user.user_id);

		const token = AuthService.issueJwt(req.user.username);

		res.cookie('jwt_token', token, { httpOnly: true });

		return res.status(StatusCodes.OK).json({
			username: req.user.username,
		});
	},
);

module.exports = router;
