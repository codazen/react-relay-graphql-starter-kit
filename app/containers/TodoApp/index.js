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

export default class TodoApp extends React.Component {

  static defaultProps: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      todos: props.data,
      nextId: 0,
    };

    (this:any).addTodo = this.addTodo.bind(this);
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
      nextId: this.state.nextId + 1,
    });
  }

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <TodoForm addTodo={this.addTodo} />
        <List listItems={this.state.todos} />
      </div>
    );
  }
}

TodoApp.defaultProps = {
  data: [],
};
