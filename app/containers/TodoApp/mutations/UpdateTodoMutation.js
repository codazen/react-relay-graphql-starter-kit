/* @flow */

import Relay from 'react-relay';

export default class UpdateTodoMutation extends Relay.Mutation {
  static fragments = {
    todo: () => Relay.QL`
      fragment on Todo {
        id
      }
    `,
  };

  static getMutation() {
    return Relay.QL`mutation{ updateTodo }`;
  }

  static getVariables() {
    return {
      id: this.props.todo.id,
      content: this.props.content,
    };
  }

  static getFatQuery() {
    return Relay.QL`
      fragment on UpdateTodoPayload @relay(pattern: true) {
        todo {
          content
        }
      }
    `;
  }

  static getConfigs() {
    return [{
      type: 'FIELDS_CHANGE',
      fieldIDs: {
        todo: this.props.todo.id,
      },
    }];
  }

}
