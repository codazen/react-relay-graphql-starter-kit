/* @flow */
/* eslint consistent-return: 'off', no-unused-expressions: 'off' */

import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const SALT_ITERATIONS = 10;

const UserSchema = new mongoose.Schema({
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
    required: true,
  },
  todos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Todo',
    default: [],
  }],
});

/**
 * Pre-save hook to ensure that passwords are encrypted upon storage
 */
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

/**
 * User method to validate password
 */
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

/**
 * Add a user based on user parameters
 */
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

/**
 * Update a user through mutation call (doesn't allow for password or email changes)
 */
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

/**
 * Update user password
 */
exports.updatePassword = (_id: string, userPassword: string) =>
  new Promise((resolve, reject) => {
    User.findById(_id, (err, user) => {
      user.password = userPassword; // eslint-disable-line no-param-reassign
      user.save((error, result) => {
        err ? reject(error) : resolve(result);
      });
    });
  });

/**
 * Remove a user by id
 */
exports.removeUser = (_id: string) =>
  new Promise((resolve, reject) => {
    User.findByIdAndRemove(
      _id,
      (err, user) => {
        err ? reject(err) : resolve(user);
      },
    );
  });

/**
 * Add a todo to a user's todoList
 */
exports.addTodoToUser = (userID: string, todoID: string) =>
  new Promise((resolve, reject) => {
    User.findById({ _id: userID }, (err, user) => {
      user.todos.push(todoID);
      user.save((error, result) => {
        error ? reject(error) : resolve(result);
      });
    });
  });

/**
 * Remove todo from a user's todoList
 */
exports.removeTodoFromUser = (userID: string, todoID: string) =>
  new Promise((resolve, reject) => {
    User.findOne({ _id: userID }, (err, user) => {
      const index = user.todos.indexOf(todoID);
      if (index > -1) {
        user.todos.splice(index, 1);
      }
      user.save((error, result) => {
        error ? reject(error) : resolve(result);
      });
    });
  });

/**
 * Get user by id
 */
exports.getUser = (_id: string) =>
  new Promise((resolve, reject) => {
    User.findById(
      _id,
      (err, user) => {
        err ? reject(err) : resolve(user);
      },
    );
  });

/**
 * Get todos for a user
 */
exports.getTodosFromUser = (_id: string) =>
  new Promise((resolve, reject) => {
    User.findById(_id, 'todos')
        .populate({
          path: 'todos',
        })
        .exec((err, user) => {
          err ? reject(err) : resolve(user.todos);
        });
  });
