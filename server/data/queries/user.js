/* @flow */

import { GraphQLString } from 'graphql';
import { fromGlobalId } from 'graphql-relay';
import { userType } from '../types/userType';
import { getViewer } from '../database';

const user = {
  type: userType,
  resolve: async () => await getViewer(),
};

export default {
  user: user,
};
