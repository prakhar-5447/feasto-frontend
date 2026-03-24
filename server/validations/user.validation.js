exports.updateProfileValidation = (req, res, next) => {
    const { name } = req.body;

    if (name && name.length < 2) {
        return res.status(400).json({ message: 'Name too short' });
    }

    next();
};