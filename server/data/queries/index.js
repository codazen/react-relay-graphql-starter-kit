/* @flow */

import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../nodes';
import user from './user';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
    ...user,
  },
});
