const router = require('express').Router();
const passport = require('../../auth/local.strategy');

const registerRoutes = require('./register.routes');

router.use('/register', registerRoutes);
router.use('/login', passport.authenticate('local'));

module.exports = router;
