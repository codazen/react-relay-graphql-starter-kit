/* @flow */

import { UserType } from '../types/userType';
import { getUser } from '../models/userModel';

const user = {
  type: UserType,
  // eslint-disable-next-line no-unused-vars
  resolve: async (source: any, args: any, context: any, info: any) => {
    const rootUser = await getUser(context.user.userID);
    return {
      ...rootUser,
    };
  },
};

export default {
  user,
};
