/* @flow */
/* eslint consistent-return: 'off' */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ITERATIONS = 10;

const UserSchema = new mongoose.Scehma({
  firstName: String,
  lastName: String,
  email: {
    type: String,
    required: true,
    index: {
      unique: true,
    },
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
  }],
});

UserSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_ITERATIONS, (err, salt) => {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, (error, hash) => {
      if (error) return next(error);
      user.password = hash;
      next();
    });
  });
});

UserSchema.methods.validatePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, match) => {
    if (err) return cb(err);
    cb(null, match);
  });
};

const User = mongoose.model('User', UserSchema);
exports.UserModel = User;
