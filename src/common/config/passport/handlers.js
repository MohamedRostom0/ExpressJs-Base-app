import _ from 'lodash';
import { TOKEN_EXPIRED_PASSPORT } from '../../../modules/auth/constants/misc';
import Users from '../../../modules/users/models';

export const jwtHandler = async (payload, done) => {
  try {
    const { _id: userId, exp: tokenExpiryDate, options = {} } = payload;

    const now = new Date().getTime() / 1000;
    if (tokenExpiryDate < now) {
      return done(null, false, { name: TOKEN_EXPIRED_PASSPORT });
    }

    const user = await Users.findOne({ _id: userId }).lean();

    if (_.isNil(user)) {
      return done(null, false);
    }
    return done(null, { ...user, options });
  } catch (err) {
    return done(err, false);
  }
};
