/* @flow */

import { UserType } from '../types/userType';
import { getViewer } from '../database';

const user = {
  type: UserType,
  resolve: async () => getViewer(),
};

export default {
  user,
};
