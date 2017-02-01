/* @flow */

import React from 'react';
import Relay from 'react-relay';
import ListItem from '../../../components/ListItem';

type Props = {
  todo: {
    content: string,
    id: string,
  },
};

class TodoItem extends React.Component {
  constructor(props: Props) { // eslint-disable-line
    super(props);
  }

  render() {
    return (
      <ListItem
        content={this.props.todo.content}
        id={this.props.todo.id}
      />
    );
  }
}

export default Relay.createContainer(TodoItem, {
  fragments: {
    todo: () => Relay.QL`
      fragment on Todo {
        id
        content
      }
    `,
  },
});
