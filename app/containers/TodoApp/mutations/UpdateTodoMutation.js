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
    return {
      id: this.props.todo.id,
      content: this.props.content,
    };
  }

  getFatQuery() {
    return Relay.QL`
      fragment on UpdateTodoPayload @relay(pattern: true) {
        todo {
          content
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
