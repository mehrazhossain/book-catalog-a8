import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import prisma from '../../../shared/prisma';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse } from './user.interface';
import { UserService } from './user.service';

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.createUser(req.body);

  const user = await prisma.user.findUnique({
    where: { id: result.id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
      password: false,
    },
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User created successufully',
    data: user,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await UserService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie
  const cookieOptions = {
    secret: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in successfully!',
    data: others,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(httpStatus.UNAUTHORIZED).json({
      success: false,
      message: 'Missing authorization token',
    });
  }

  const decodedToken = jwtHelpers.verifyToken(
    token,
    config.jwt.secret as Secret
  );

  const user: Partial<User> | null = await prisma.user.findUnique({
    where: {
      email: decodedToken.email,
    },
    select: {
      role: true,
    },
  });

  if (user?.role === 'admin') {
    const users = await UserService.getAllUsers();
    sendResponse(res, {
      success: true,
      statusCode: httpStatus.OK,
      message: 'All users retrieved successfully',
      data: users,
    });
  } else {
    sendResponse(res, {
      success: false,
      statusCode: httpStatus.FORBIDDEN,
      message: 'Permission denied',
    });
  }
});

export const UserController = {
  createUser,
  getAllUsers,
  loginUser,
};
