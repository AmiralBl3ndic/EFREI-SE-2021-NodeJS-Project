const express = require('express');
const router = express.Router();

const registerRoutes = require('./register.route');

router.use('/register', registerRoutes);

module.exports = router;
