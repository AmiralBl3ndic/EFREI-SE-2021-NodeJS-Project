const router = require('express').Router();
const { StatusCodes } = require('http-status-codes');

const passport = require('../auth/passport.config');

const authRoutes = require('./auth');
const notesRoutes = require('./notes/get-note.routes');
const usersRoutes = require('./users/get-users.routes');

router.use('/auth', authRoutes);
router.use(
	'/notes',
	passport.authenticate('jwt', { session: false }),
	notesRoutes,
);

router.use(
	'/users',
	passport.authenticate('jwt', { session: false }),
	usersRoutes,
);

router.use((req, res, next) => {
	return res.status(StatusCodes.NOT_FOUND).json({
		error: true,
		status: 'Not found',
	});
});

module.exports = router;
