import httpStatus from 'http-status';
import AuthServices from '../services';

const AuthController = {
  async registerUser(req, res, next) {
    try {
      const { username, password, role, profile } = req.body;

      const response = await AuthServices.registerUser({ username, password, role, profile });

      return res.status(httpStatus.CREATED).json(response);
    } catch (err) {
      return next(err);
    }
  },

  async userLogin(req, res, next) {
    try {
      const { username, password } = req.body;

      const response = await AuthServices.userLogin({ username, password });

      return res.status(httpStatus.OK).json(response);
    } catch (err) {
      return next(err);
    }
  },
};

export default AuthController;
