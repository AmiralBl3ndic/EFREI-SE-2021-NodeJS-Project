const router = require('express').Router();
const passport = require('../../auth/passport.config');

const registerRoutes = require('./register.routes');

router.use('/register', registerRoutes);
router.use(
	'/login',
	passport.authenticate('local', { session: false }),
	(req, res) => {
		return res.status(200).json(req.user);
	},
);

module.exports = router;
