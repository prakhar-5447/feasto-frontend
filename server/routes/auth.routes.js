const express = require('express');
const router = express.Router();

const { phoneAuth, completeSignup, logout } = require('../controllers/auth.controller');
const { phoneValidation } = require('../validations/auth.validation');

router.post('/phone-auth', phoneValidation, phoneAuth);
router.post('/complete-profile', completeSignup);
router.post('/logout', logout);

module.exports = router;