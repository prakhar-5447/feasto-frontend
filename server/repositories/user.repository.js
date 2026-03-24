const User = require('../models/user.model');

exports.findByPhone = (phone) => {
    return User.findOne({ phone });
};

exports.findById = (id) => {
    return User.findById(id);
};

exports.createUser = (data) => {
    return User.create(data);
};

exports.updateUser = (id, data) => {
    return User.findByIdAndUpdate(id, data, { new: true });
};

exports.deleteUser = (id) => {
    return User.findByIdAndDelete(id);
};