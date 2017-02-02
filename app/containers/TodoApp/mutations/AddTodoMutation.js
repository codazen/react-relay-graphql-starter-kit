/* @flow */
/* eslint class-methods-use-this: "off" */

import Relay from 'react-relay';

export default class AddTodoMutation extends Relay.Mutation {
  static fragments = {
    user: () => Relay.QL`
      fragment on User {
        id
      }
    `,
  };

  getMutation() {
    return Relay.QL`mutation{ addTodo }`;
  }

  getVariables() {
    return {
      content: this.props.content,
    };
  }

  getFatQuery() {
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

  getConfigs() {
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

  getOptimisticResponse() {
    return {
      newTodoEdge: {
        node: {
          content: this.props.content,
        },
      },
    };
  }
}
