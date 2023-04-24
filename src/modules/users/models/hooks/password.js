import { hashData } from '../../utils';

export const hashPassword = async function (next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  try {
    let SALT_WORK_FACTOR = 10;

    // if this a new document then we lower the hash rounds
    if (this.isNew === true) { SALT_WORK_FACTOR = 9; }

    const hash = await hashData(user.password, SALT_WORK_FACTOR);
    user.password = hash;
    return next();
  } catch (err) {
    return next(err);
  }
};
