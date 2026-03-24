const authService = require('../services/auth.service');
const { generateToken } = require('../utils/token.utils');

exports.phoneAuth = async (req, res, next) => {
    try {
        const { phone } = req.body;

        const { user, isNewUser } = await authService.phoneAuth(phone);

        if (user) {
            const token = generateToken(user);

            res.cookie('token', token, {
                httpOnly: true,
                sameSite: 'lax'
            });

            return res.json({ success: true, isNewUser: false, data: user });
        }

        res.json({ success: true, isNewUser: true });

    } catch (err) {
        next(err);
    }
};

exports.completeSignup = async (req, res, next) => {
    try {
        const user = await authService.completeSignup(req.body);

        const token = generateToken(user);

        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'lax'
        });

        res.json({ success: true, data: user });

    } catch (err) {
        next(err);
    }
};