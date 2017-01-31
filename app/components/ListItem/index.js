/* @flow */

import React from 'react';

type Props = {
  content: string,
  id: any,
  updateItem: () => void,
  removeItem: () => void,
};

type State = {
  editStatus: boolean,
  content: string,
  id: any,
};

export default class ListItem extends React.Component {

  constructor(props: Props) {
    super(props);
    this.state = {
      editStatus: false,
      content: props.content,
      id: props.id,
    };

    (this:any).openEditMode = this.openEditMode.bind(this);
    (this:any).closeEditMode = this.closeEditMode.bind(this);
    (this:any).handleChange = this.handleChange.bind(this);
  }

  state: State;

  props: Props;

  handleChange(event: any) {
    const newState = {};
    newState[event.target.name] = event.target.value;
    this.setState(newState);
  }

  openEditMode() {
    this.setState({
      editStatus: true,
    });
  }

  closeEditMode() {
    this.props.updateItem({
      id: this.state.id,
      content: this.state.content,
    });
    this.setState({
      editStatus: false,
    });
  }

  render() {
    return (
      <div>
        {this.state.editStatus ?
          <div>
            <input
              autoFocus
              type='text'
              value={this.state.content}
              name='content'
              onChange={this.handleChange}
              onBlur={this.closeEditMode}
            />
            <button onClick={this.closeEditMode}>
              Save
            </button>
          </div>
          :
          <div>
            <span onClick={this.props.updateItem ? this.openEditMode : null}>
              {this.state.content}
            </span>
            <button onClick={() => { this.props.removeItem(this.state.id); }}>
              Delete
            </button>
          </div>
        }
      </div>
    );
  }
}
