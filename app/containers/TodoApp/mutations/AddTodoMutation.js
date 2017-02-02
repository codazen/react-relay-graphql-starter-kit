/* @flow */

import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  static getMutation() {
    return Relay.QL`mutation{ addTodo }`;
  }

  static getVariables() {
    return {
      content: this.props.content,
    };
  }

  static getFatQuery() {
    return Relay.QL`
      fragment on AddTodoPayload @relay(plural: true) {
        user {
          todos(last: 1000) {
            edges {
              node {
                id
                content
              }
            }
          }
        }
        newTodoEdge
      }
    `;
  }

  static getConfigs() {
    return [{
      type: 'RANGE_ADD',
      parentName: 'user',
      parentID: this.props.user.id,
      connectionName: 'todos',
      edgeName: 'newTodoEdge',
      rangeBehaviors: {
        '': 'append',
        'orederby(oldes)': 'prepend',
      },
    }];
  }

  static getOptimisticResponse() {
    return {
      newTodoEdge: {
        node: {
          content: this.props.content,
        },
      },
    };
  }
}
