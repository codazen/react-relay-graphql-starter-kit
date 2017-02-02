/* @flow */

// mock data
export class Todo {
  id: string;
  content: string;
}
export class User {
  id: string;
}

// main viewer (default user)
const VIEWER = 'viewer';

const viewer = new User();
viewer.id = VIEWER;

// storage for all users
export const usersById = {
  [VIEWER]: viewer,
};

// storage for all todos
export const todosById = {};

// todos for a user
export const todoIdsByUser = {
  [VIEWER]: [],
};

// global todo id
let nextTodoId = 0;

export function addTodo(content: string) {
  const todo = new Todo();
  todo.id = `${nextTodoId++}`;
  todo.content = content;
  todosById[todo.id] = todo;
  todoIdsByUser[VIEWER].push(todo.id);
  return todo.id;
}

// add some data for a starting point
addTodo('Todo 1');
addTodo('Todo 2');
addTodo('Todo 3');

// get a todo by id
export function getTodo(id: string) {
  return todosById[id];
}

// get a user by id
export function getUser(id: string) {
  return usersById[id];
}

// get main viewer (since user identification not implemented)
export function getViewer() {
  return getUser(VIEWER);
}

// get all todos for viewer user
export function getTodos() {
  return todoIdsByUser[VIEWER].map(id => todosById[id]);
}

export function getNumTodos() {
  return todoIdsByUser[VIEWER].length;
}

// remove todo from viewer user
export function removeTodo(id: string) {
  const index = todoIdsByUser[VIEWER].indexOf(id);
  if (index !== -1) {
    todoIdsByUser[VIEWER].splice(index, 1);
  }
  delete todosById[id];
}

// update todo
export function updateTodo(id: string, content: string) {
  const todo = getTodo(id);
  todo.content = content;
}
