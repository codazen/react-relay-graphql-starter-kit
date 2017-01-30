/* flow */

import React from 'react';

type Props = {
  addTodo: () => void,
};

type State = {
  todoValue: string,
};

export default class TodoForm extends React.Component {

  static defaultProps: Props;

  constructor(props: Props) { // eslint-disable-line no-useless-constructor
    super(props);
    this.state = {
      todoValue: '',
    };

    (this:any).handleChange = this.handleChange.bind(this);
    (this:any).handleSubmit = this.handleSubmit.bind(this);
  }

  state: State;

  props: Props;

  _handleChange(event) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  _handleSubmit(event) {
    event.preventDefault();
    this.props.addTodo(this.state.todoValue);
    this.setState({
      todoValue: '',
    });
  }

  render() {
    return (
      <div>
        <input
          type='text'
          value={this.state.todoValue}
          name='todoValue'
          onChange={this.handleChange}
        />
        <button onClick={this.handleSubmit}>
          + Todo
        </button>
      </div>
    );
  }
}

TodoForm.defaultProps = {
  addTodo: () => {},
};
