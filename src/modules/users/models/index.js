import mongoose from 'mongoose';
import { USERS_COLLECTION, USERS_MODEL } from './constant';
import { hashPassword } from './hooks';
import * as methods from './methods';
import UserSchema from './schema';

// ======================== Attach Hooks ====================================
const preSaveHooks = [hashPassword];
preSaveHooks.forEach(hook => {
  UserSchema.pre('save', hook);
});

// ======================== Attach methods ========================
UserSchema.methods = { ...methods };

const Users = mongoose.model(USERS_MODEL, UserSchema, USERS_COLLECTION);

export default Users;
