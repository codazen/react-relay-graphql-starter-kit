/* @flow */

import { GraphQLObjectType } from 'graphql';
import { nodeField } from '../nodes';

export default new GraphQLObjectType({
  name: 'Query',
  fields: {
    node: nodeField,
  },
})
