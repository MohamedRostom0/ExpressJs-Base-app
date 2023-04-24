import _ from 'lodash';
import { removeNullFields } from './utils/object-manipulators';

export const parseRequestUser = user => {
  const parsedUser = _.pick(user ?? {}, ['_id', 'username', 'profile']);
  parsedUser.profile = removeNullFields(_.omit(parsedUser.profile, ['phone']));
  return removeNullFields(parsedUser);
};
