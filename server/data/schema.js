/* @flow */
/* eslint import/prefer-default-export: 0 */

import { GraphQLSchema } from 'graphql';

import queries from './queries';
import mutations from './mutations';

export const schema = new GraphQLSchema({
  query: queries,
  mutation: mutations,
});
