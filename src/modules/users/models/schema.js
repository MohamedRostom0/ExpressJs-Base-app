import mongoose from 'mongoose';
import { PHONE_NUMBER_REGEX } from '../../../common/constants';

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },

  profile: {
    firstName: { type: String, required: true },
    middleName: { type: String, default: '' },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, match: PHONE_NUMBER_REGEX, default: '' },
  },

  password: {
    type: String,
    minlength: 6,
    required: true,
  },

  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
});

export default UserSchema;
