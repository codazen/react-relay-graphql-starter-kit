/* @flow */
/* eslint consistent-return: 'off', no-unused-expressions: 'off' */

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
  password: {
    type: String,
    select: false,
    required: true,
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

type AddUserParams = {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
};

exports.addUser = (user: AddUserParams) => {
  const newUser = new User(user);
  return new Promise((resolve, reject) => {
    newUser.save((err, res) => {
      err ? reject(err) : resolve(res);
    });
  });
};

type UserInfo = {
  firstName: string,
  lastName: string,
}

exports.updateUserInfo = (_id: string, userInfo: UserInfo) =>
  new Promise((resolve, reject) => {
    const {
      firstName,
      lastName,
    } = userInfo;
    User.findByIdAndUpdate(
      _id,
      { $set: { firstName, lastName } },
      { new: true },
      (err, result) => {
        err ? reject(err) : resolve(result);
      },
    );
  });

exports.updatePassword = (_id: string, userPassword: string) =>
  new Promise((resolve, reject) => {
    User.findById(_id, (err, user) => {
      user.password = userPassword; // eslint-disable-line no-param-reassign
      user.save((error, result) => {
        err ? reject(error) : resolve(result);
      });
    });
  });

exports.removeUser = (_id: string) =>
  new Promise((resolve, reject) => {
    User.findByIdAndRemove(
      _id,
      (err, user) => {
        err ? reject(err) : resolve(user);
      },
    );
  });

exports.addTodoToUser = (userID: string, todoID: string) =>
  new Promise((resolve, reject) => {
    User.findOne({ _id: userID }, (err, user) => {
      user.todos.push(todoID);
      user.save((error, result) => {
        error ? reject(error) : resolve(result);
      });
    });
  });
