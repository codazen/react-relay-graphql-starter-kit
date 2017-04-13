/* @flow */

import React from 'react';

type Props = {
  addTodo: ?Function, // callback to create new todo in parent state
  filter: string, // filter for todo list
  showFilter: false, // filter state
  toggleShowFilter: ?Function, // show/hide filter options
  collapseFilter: ?Function, // hide filter options
  handleFilterInput: ?Function // callback to filter todo list
};

type State = {
  content: string, // content for new todo
  showFilter: boolean, // flog to show filter options
};

/**
 * Form for creating a new todo item
 * Parent component: TodoApp
 * Child components: N/A
 */
export default class TodoForm extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      content: '',
    };
  }

  state: State;

  props: Props;

  handleChange = (event: any) => {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  /**
   * Makes call to addTodo mutation
   */
  handleSubmit = (event: any) => {
    const {
      addTodo,
    } = this.props;

    if (addTodo) {
      addTodo(this.state.content);
    }
    event.preventDefault();
    this.setState({
      content: '',
    });
  }

  formatFilterName() {
    switch (this.props.filter) {
      case 'complete':
        return 'Complete';
      case 'notcomplete':
        return 'Not Complete';
      default:
        return 'All';
    }
  }

  render() {
    return (
      <div className="todo-form-component">
        <form onSubmit={this.handleSubmit}>
          <input
            type="text"
            value={this.state.content}
            name="content"
            placeholder="Add a task"
            onChange={this.handleChange}
          />
          <button action="submit">
            +
          </button>
        </form>
        <div className="todo-filter-component" onMouseLeave={this.props.collapseFilter}>
          <button
            className="todo-filter-button"
            type="button"
            onClick={this.props.toggleShowFilter}
          >
            Filter
            <span>{this.formatFilterName()}</span>
          </button>
          {this.props.showFilter ?
            <div className="todo-filter-content" onMouseLeave={this.props.toggleShowFilter}>
              <a
                name="all"
                className={this.props.filter === 'all' ? 'selected' : ''}
                onClick={this.props.handleFilterInput}
              >Show All</a>
              <a
                name="complete"
                className={this.props.filter === 'complete' ? 'selected' : ''}
                onClick={this.props.handleFilterInput}
              >Complete</a>
              <a
                name="notcomplete"
                className={this.props.filter === 'notcomplete' ? 'selected' : ''}
                onClick={this.props.handleFilterInput}
              >Not Complete</a>
            </div>
          : '' }
        </div>
      </div>
    );
  }
}
