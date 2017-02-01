/* @flow */

import { userType } from '../types/userType';
import { getViewer } from '../database';

const user = {
  type: userType,
  resolve: async () => getViewer(),
};

export default {
  user,
};
