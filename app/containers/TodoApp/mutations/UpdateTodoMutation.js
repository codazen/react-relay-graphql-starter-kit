/* @flow */
/* eslint class-methods-use-this: "off" */

import Relay from 'react-relay';

export default class UpdateTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{ updateTodo }`;
  }

  getVariables() {
    const {
      todo,
      content,
      isChecked,
    } = this.props;
    return {
      id: todo.id,
      content,
      isChecked,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTodoPayload @relay(pattern: true) {
        todo {
          content
          isChecked
        }
      }
    `;
  }

  getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
      },
    }];
  }

}
