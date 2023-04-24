import passport from 'passport';
import httpStatus from 'http-status';
import { APIError } from '../lib';
import { JWT_EXPIRED, USER_NOT_AUTHENTICATED } from '../../modules/auth/constants/error-codes';
import { TOKEN_EXPIRED_PASSPORT } from '../../modules/auth/constants/misc';

export const authenticate = (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (error, user, info) => {
    if (info && info.name === TOKEN_EXPIRED_PASSPORT) {
      return next(new APIError({
        message: 'Jwt is expired',
        status: httpStatus.UNAUTHORIZED,
        errorCode: JWT_EXPIRED,
      }));
    }

    if (error) {
      return next(error);
    }

    if (!user) {
      return next(new APIError({
        message: 'User is not authenticated',
        status: httpStatus.UNAUTHORIZED,
        errorCode: USER_NOT_AUTHENTICATED,
      }));
    }

    req.user = user;
    return next();
  })(req, res, next);
};
