const express = require('express');
const router = express.Router();

const { protect } = require('../middlewares/auth.middleware');
const {
    getProfile,
    updateProfile,
    deleteProfile
} = require('../controllers/user.controller');

router.get('/me', protect, getProfile);
router.put('/me', protect, updateProfile);
router.delete('/me', protect, deleteProfile);

module.exports = router;