/* @flow */
/* eslint consistent-return: 'off', no-unused-expressions: 'off' */

import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  content: String,
});

const Todo = mongoose.model('Todo', TodoSchema);
exports.TodoModel = Todo;

exports.addTodo = (content: string) => {
  const newTodo = new Todo({ content });
  return new Promise((resolve, reject) => {
    newTodo.save((err, todo) => {
      err ? reject(err) : resolve(todo);
    });
  });
};

exports.updateTodo = (_id: string, content: string) =>
  new Promise((resolve, reject) => {
    Todo.findByIdAndUpdate(
      _id,
      { content },
      { new: true },
      (err, todo) => {
        err ? reject(err) : resolve(todo);
      },
    );
  });

exports.removeTodo = (_id: string) =>
  new Promise((resolve, reject) => {
    Todo.findByIdAndRemove(
      _id,
      (err, todo) => {
        err ? reject(err) : resolve(todo);
      },
    );
  });

exports.getTodo = (_id: string) =>
  new Promise((resolve, reject) => {
    Todo.findOne(
      _id,
      (err, todo) => {
        err ? reject(err) : resolve(todo);
      },
    );
  });
