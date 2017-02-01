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

addTodo('Todo 1');
addTodo('Todo 2');
addTodo('Todo 3');

export function getTodo(id: string) {
  return todosById[id];
}

export function getUser(id: string) {
  return usersById[id];
}

export function getViewer() {
  return getUser(VIEWER);
}

export function getTodos() {
  return todoIdsByUser[VIEWER].map(id => todosById[id]);
}

export function removeTodo(id: string) {
  const index = todoIdsByUser[VIEWER].indexOf(id);
  if (index !== -1) {
    todoIdsByUser[VIEWER].splice(index, 1);
  }
  delete todosById[id];
}

export function updateTodo(id: string, content: string) {
  const todo = getTodo(id);
  todo.content = content;
}
