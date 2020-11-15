const express = require('express');
const router = express.Router();

const registerRoutes = require('./register.routes');

router.use('/register', registerRoutes);

module.exports = router;
