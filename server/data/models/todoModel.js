/* @flow */

import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema({
  content: String,
});

const Todo = mongoose.model('Todo', TodoSchema);
exports.TodoModel = Todo;
