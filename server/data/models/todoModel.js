/* @flow */

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
      err ? reject(err) : resolve(todo); // eslint-disable-line no-unused-expressions
    });
  });
};

exports.updateTodo = (_id: string, content: string) =>
  new Promise((resolve, reject) => {
    Todo.findByIdAndUpdate(
      { _id: mongoose.Types.ObjectId(_id) },
      { content },
      { new: true },
      (err, todo) => {
        err ? reject(err) : resolve(todo); // eslint-disable-line no-unused-expressions
      },
    );
  });

exports.deleteTodo = (_id: string) =>
  new Promise((resolve, reject) => {
    Todo.findByIdAndRemove(
      { _id: mongoose.Types.ObjectId(_id) },
      (err, todo) => {
        err ? reject(err) : resolve(todo); // eslint-disable-line no-unused-expressions
      },
    );
  });
