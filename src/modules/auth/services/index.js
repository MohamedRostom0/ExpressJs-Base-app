import httpStatus from 'http-status';
import _ from 'lodash';
import { APIError } from '../../../common/lib';
import Users from '../../users/models';

const AuthServices = {
  async registerUser({ username, password, role, profile }) {
    const user = await Users.create({ username, password, role, profile });
    const token = await user.generateJWT();

    return { user, token };
  },

  async userLogin({ username, password }) {
    const user = await Users.findOne({ username });

    if (_.isNil(user) || !user.comparePassword(password)) {
      throw new APIError({ message: 'Incorrect username or password', status: httpStatus.UNAUTHORIZED });
    }

    const token = await user.generateJWT();

    return { user, token };
  },
};

export default AuthServices;
