/* @flow */

import React from 'react';
import List from '../../components/List';

type Props = {
  data: any,
};

type State = {
  todos: any,
}

export default class TodoApp extends React.Component {

  static defaultProps: Props;

  constructor(props: Props) {
    super(props);
    this.state = {
      todos: props.data,
    };
  }

  state: State;

  props: Props;

  render() {
    return (
      <div>
        <h1>Todo App</h1>
        <List listItems={this.state.todos} />
      </div>
    );
  }
}

TodoApp.defaultProps = {
  data: [
    {
      id: 1,
      content: 'Item 1',
    },
    {
      id: 2,
      content: 'Item 2',
    },
    {
      id: 3,
      content: 'Item 3',
    },
  ],
};
