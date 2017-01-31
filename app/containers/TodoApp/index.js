/* @flow */

import React from 'react';
import List from '../../components/List';
import TodoForm from './TodoForm';

type Props = {
  data: any,
};

type State = {
  todos: any,
  nextId: number,
}

function findTodo(element) {
  return element.id === this.id;
}

export default class TodoApp extends React.Component {

  static defaultProps: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      todos: props.data,
      nextId: 0,
    };

    (this:any).addTodo = this.addTodo.bind(this);
    (this:any).updateTodo = this.updateTodo.bind(this);
    (this:any).removeTodo = this.removeTodo.bind(this);
  }

  state: State;

  props: Props;

  addTodo(todo: string) {
    const newId = this.state.nextId;
    const newTodos = this.state.todos;
    newTodos.push({
      id: newId,
      content: todo,
    });
    this.setState({
      todos: newTodos,
      nextId: newId + 1,
    });
  }

  updateTodo(item: any) {
    const newTodos = this.state.todos;
    newTodos[newTodos.findIndex(findTodo, { id: item.id })].content = item.content;
    this.setState({
      todos: newTodos,
    });
  }

  removeTodo(id: any) {
    const newTodos = this.state.todos;
    newTodos.splice(newTodos.findIndex(findTodo, { id }), 1);
    this.setState({
      todos: newTodos,
    });
  }

  render() {
    console.log(this.state);
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} />
        <List
          listItems={this.state.todos}
          updateItem={this.updateTodo}
          removeItem={this.removeTodo}
        />
      </div>
    );
  }
}

TodoApp.defaultProps = {
  data: [],
};
