const express = require('express');

const controller = require('../controllers/users');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/register', controller.register);
router.post('/login', controller.login);

module.exports = router;