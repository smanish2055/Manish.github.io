import {User } from '../models/User';

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};
