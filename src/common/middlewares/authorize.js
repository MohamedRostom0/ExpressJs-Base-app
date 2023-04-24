import httpStatus from 'http-status';
import { APIError } from '../lib';

export const authorize = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.role)) {
    return next(new APIError({ message: 'Unauthorized to access this route', status: httpStatus.FORBIDDEN }));
  }
  return next();
};
