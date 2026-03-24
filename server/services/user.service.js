const userRepo = require('../repositories/user.repository');

exports.getProfile = (userId) => {
    return userRepo.findById(userId);
};

exports.updateProfile = (userId, data) => {
    return userRepo.updateUser(userId, data);
};

exports.deleteProfile = (userId) => {
    return userRepo.deleteUser(userId);
};