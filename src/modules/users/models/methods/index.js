import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../../../../common/config';

/**
 * Hashes the input password and compare it with the stored
 * hash for the user
 *
 * @param {string} password - The input password
 *
 * @returns {Promise<Boolean>} isMatch - resolves to a boolean indicating a password hash match
 */
export const comparePassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

export const generateJWT = async function () {
  const today = new Date();
  const expirationDate = new Date(today);
  expirationDate.setDate(today.getDate() + 1); // Expires in 1 day

  const payload = {
    _id: this._id,
  };

  return jwt.sign(payload, config.JWT_SECRET, {
    expiresIn: parseInt(expirationDate.getTime() / 1000, 10),
  });
};
