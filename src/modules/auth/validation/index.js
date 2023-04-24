import Joi from 'joi';

const AuthValidation = {
  registerUser: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
      role: Joi.string().valid('user'),
      profile: Joi.object().keys({
        firstName: Joi.string().required(),
        middleName: Joi.string(),
        lastName: Joi.string().required(),
        email: Joi.string().required(),
        phone: Joi.string(),
      }),
    },
  },
  userLogin: {
    body: {
      username: Joi.string().required(),
      password: Joi.string().min(6).required(),
    },
  },
};

export default AuthValidation;
