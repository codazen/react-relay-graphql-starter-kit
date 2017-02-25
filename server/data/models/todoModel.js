/* @flow */
/* eslint consistent-return: 'off', no-unused-expressions: 'off' */

import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  content: String,
});

const Todo = mongoose.model('Todo', TodoSchema);
exports.TodoModel = Todo;

/**
 * Add a todo
 */
exports.addTodo = (content: string) => {
  const newTodo = new Todo({ content });
  return new Promise((resolve, reject) => {
    newTodo.save((err, todo) => {
      err ? reject(err) : resolve(todo);
    });
  });
};

/**
 * Update a todo's content by id
 */
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

/**
 * Remove a todo by id
 */
exports.removeTodo = (_id: string) =>
  new Promise((resolve, reject) => {
    Todo.findByIdAndRemove(
      _id,
      (err, todo) => {
        err ? reject(err) : resolve(todo);
      },
    );
  });

/**
 * Get a todo by id
 */
exports.getTodo = (_id: string) =>
  new Promise((resolve, reject) => {
    Todo.findOne(
      _id,
      (err, todo) => {
        err ? reject(err) : resolve(todo);
      },
    );
  });
