import jwt from 'jsonwebtoken';
import { config } from '../config';

const JWT_EXPIRY_IN_SECONDS = 60 * 60 * 24 * 365;

/**
 * Generate a JWT token
 *
 * @param {Object} args
 * @param {T} args.payload - the JWT payload to be encoded
 * @param {Number} [args.expiresIn = JWT_EXPIRY_IN_SECONDS]
 * @param {Object} args.options - jsonwebtoken module options, can override default options
 *
 * @returns {Promise<string>} theToken
 */
export const generateJWT = async ({
  payload,
  expiresIn = JWT_EXPIRY_IN_SECONDS,
  options = {},
}) => jwt.sign(payload, config.JWT_SECRET, { expiresIn, ...options });
