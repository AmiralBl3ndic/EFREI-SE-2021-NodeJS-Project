const router = require('express').Router();
const passport = require('../../');

const registerRoutes = require('./register.routes');

router.use('/register', registerRoutes);
router.use('/login', passport.authenticate('local'));

module.exports = router;
