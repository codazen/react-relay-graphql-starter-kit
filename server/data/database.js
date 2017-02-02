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

/**
 * The viewer is the default user for the application.
 * In a situation with multiple users, additional id processing would occur in order
 * to return the proper user in a query.
 */
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

// add a todo
export function addTodo(content: string) {
  const todo = new Todo();
  todo.id = `${nextTodoId++}`;
  todo.content = content;
  todosById[todo.id] = todo;
  todoIdsByUser[VIEWER].push(todo.id);
  return todo.id;
}

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

// get number of todos for cursor
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
