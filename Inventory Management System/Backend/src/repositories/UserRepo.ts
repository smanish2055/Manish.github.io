import { Op } from 'sequelize';
import {User } from '../models/User';
 // getAllProductList,
  // getProductById,
  // updateProductById,
  // deleteProductById,
export const getAllUsers = async () => {
  return await User.findAll();
};

export const addUser = async (user: any) => {
  return await User.create(user);
};

export const getUserByEmail = async (email: string) => {
  return await User.findOne({ where: { email } });
};

export const getUserById = async (id: number) => {
  return await User.findByPk(id);
};

export const updateRefreshToken = async (id: number, refreshToken: string) => {
  return await User.update({ refreshToken }, { where: { id } });
};

export const deleteUser = async (user: any) => {
  return await user.destroy();
};
