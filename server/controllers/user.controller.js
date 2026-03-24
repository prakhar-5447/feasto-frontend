const userService = require('../services/user.service');

exports.getProfile = async (req, res, next) => {
    try {
        const user = await userService.getProfile(req.user.id);
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

exports.updateProfile = async (req, res, next) => {
    try {
        const user = await userService.updateProfile(req.user.id, req.body);
        res.json({ success: true, data: user });
    } catch (err) {
        next(err);
    }
};

exports.deleteProfile = async (req, res, next) => {
    try {
        await userService.deleteProfile(req.user.id);
        res.clearCookie('token');
        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};