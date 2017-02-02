/* @flow */

import { GraphQLObjectType } from 'graphql';
import todo from './todo';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...todo,
  },
});
