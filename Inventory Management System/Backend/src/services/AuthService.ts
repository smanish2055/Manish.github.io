import argon2 from "argon2";
import jwt from "jsonwebtoken";
import config from "../configs/index";
import {
  JWT_ACCESS_TOKEN_EXPIRY,
} from "../constants/index";
import ForbiddenError from "../errors/Forbidden";
import NotFoundError from "../errors/NotFound";
import { User } from "../models/User";
import * as userRepo from "../repositories/AuthRepo";

export const register = async (user: any) => {
  const { username, email, password } = user;
  try {
    const userExists = await userRepo.getUserByEmail(email);
    if (userExists) {
      throw new NotFoundError(`User with email ${email} already exists`);
    }

    const hashedPassword = await argon2.hash(password);
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
    });
    return newUser;
  } catch (error) {
    throw error;
  }
};

export const login = async (user: any) => {
  const { email, password } = user;
  try {
    const foundUser: any = await userRepo.getUserByEmail(email);
    if (!foundUser) {
      throw new NotFoundError(`User with email ${email} not found`);
    }

    const isPasswordValid = await argon2.verify(foundUser.password, password);
    if (!isPasswordValid) {
      throw new ForbiddenError("Invalid password");
    }

    const accessToken = createAccessToken(foundUser.id);
    
    return { accessToken};
  } catch (error) {
    throw error;
  }
};


const createAccessToken = (id: string) => {
  return jwt.sign({ userid: id }, config.jwt.accessSecret, {
    expiresIn: JWT_ACCESS_TOKEN_EXPIRY,
  });
};



export const getUserById = async (id: number) => {
  const user = await userRepo.getUserById(id);
  if (!user) throw new NotFoundError(`User with id : ${id} not found`);
  return user;
};













// export const logout = async (user: any) => {
//   try {
//     const userFound = await userRepo.getUserById(user.id);
//     await userFound!.update({ refreshToken: "" });
//   } catch (error) {
//     throw error;
//   }
// };

// export const refresh = async (id: number, refreshToken: any) => {
//   try {
//     const user: any = await userRepo.getUserById(id);
//     if (!user) throw new NotFoundError("User not found");
//     if (user.refreshToken !== refreshToken)
//       throw new ForbiddenError("Invalid refresh token");

//     const accessToken = createAccessToken(user.id);
//     const newRefreshToken = createRefreshToken(user.id);

//     user.refreshToken = newRefreshToken;
//     await user.save();

//     return { accessToken, refreshToken: newRefreshToken };
//   } catch (error) {
//     throw error;
//   }
// };



// const createRefreshToken = (id: string) => {
//   return jwt.sign({ userid: id }, config.jwt.refreshSecret, {
//     expiresIn: JWT_REFRESH_TOKEN_EXPIRY,
//   });
// };


