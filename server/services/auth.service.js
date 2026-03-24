const userRepo = require('../repositories/user.repository');

exports.phoneAuth = async (phone) => {
    const user = await userRepo.findByPhone(phone);

    if (user) {
        user.lastLogin = new Date();
        await user.save();
        return { user, isNewUser: false };
    }

    return { user: null, isNewUser: true };
};

exports.completeSignup = async (data) => {
    return userRepo.createUser(data);
};