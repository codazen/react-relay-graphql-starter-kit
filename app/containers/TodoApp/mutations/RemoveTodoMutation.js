/* @flow */

import Relay from 'react-relay';

export default class RemoveTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  static getMutation() {
    return Relay.QL`mutation{ removeTodo }`;
  }

  static getVariables() {
    return {
      id: this.props.id,
    };
  }

  static getFatQuery() {
    return Relay.QL`
      fragment on RemoveTodoPayload @relay(plural: true) {
        deletedTodoId
        user
      }
    `;
  }

  static getConfigs() {
    return [{
      type: 'NODE_DELETE',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      deletedIDFieldName: 'deletedTodoId',
    }];
  }

}
