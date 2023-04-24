import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';

import { config } from '../index';

export const setupPassport = ({ jwtHandler }) => {
  const secret = config.JWT_SECRET;
  const jwt = ExtractJwt.fromAuthHeaderAsBearerToken('JWT');

  const strategy = new JWTStrategy({ secretOrKey: secret, jwtFromRequest: jwt }, jwtHandler);

  passport.use(strategy);
};
