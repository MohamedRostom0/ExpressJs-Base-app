import { setupPassport } from '../common/config/passport';
import { jwtHandler } from '../common/config/passport/handlers';

export const boot = () => {
  setupPassport({ jwtHandler });
};
