import mongoose from 'mongoose';
import async from 'async';
import { addUser, addTodoToUser } from '../data/models/userModel';
import { addTodo } from '../data/models/todoModel';

const MONGODB = process.env.MONGO || 'mongodb://localhost:27017/react-relay-graphql';

mongoose.connect(MONGODB, () => {
  console.log(`MongoDB connected at ${MONGODB}`); // eslint-disable-line no-console
});

const addTestUser = function (cb) {
  addUser({
    firstName: 'Test',
    lastName: 'User',
    email: 'testuser@test.com',
    password: 'password',
  }).then((user) => {
    const userID = user._id; // eslint-disable-line no-underscore-dangle
    async.series([
      (callback) => {
        addTodo('Todo 1').then((todo) => {
          addTodoToUser(userID, todo._id).then(() => { // eslint-disable-line no-underscore-dangle
            callback();
          });
        });
      },
      (callback) => {
        addTodo('Todo 2').then((todo) => {
          addTodoToUser(userID, todo._id).then(() => { // eslint-disable-line no-underscore-dangle
            callback();
          });
        });
      },
      (callback) => {
        addTodo('Todo 3').then((todo) => {
          addTodoToUser(userID, todo._id).then(() => { // eslint-disable-line no-underscore-dangle
            callback();
          });
        });
      },
    ], () => {
      cb();
    });
  });
};

const mongooseDisconnect = function () {
  mongoose.disconnect();
};

addTestUser(mongooseDisconnect);
