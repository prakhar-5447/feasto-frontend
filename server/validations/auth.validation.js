exports.phoneValidation = (req, res, next) => {
    const { phone } = req.body;

    if (!phone || phone.length !== 10) {
        return res.status(400).json({ message: 'Invalid phone' });
    }

    next();
};