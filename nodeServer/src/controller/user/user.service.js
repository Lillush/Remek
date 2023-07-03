const User = require("../../models/user.model");
const logger = require("../../config/logger");
const bcrypt = require("bcryptjs");

exports.create = (user) => {
  const newUser = new User(user);

  bcrypt.hash(newUser.password, 10, (err, hash) => {
    if (err) {
      logger.error(err);
      return next(new createError.InternalServerError("Hashing error"));
    }
    newUser.password = hash;
    return newUser.save();
  });
  return newUser;
};

exports.findAll = () => User.find();

exports.findById = (id) => User.findById(id);

exports.update = (id, userData) =>
  User.findByIdAndUpdate(id, userData, { new: true });

exports.delete = (id) => User.findByIdAndRemove(id);
