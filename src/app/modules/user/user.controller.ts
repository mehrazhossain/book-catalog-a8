import { Request, Response } from 'express';
import httpStatus from 'http-status';
import config from '../../../config';
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
  const users = await UserService.getAllUsers();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All users retrieved successfully',
    data: users,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.getSingleUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User fetched successfully',
    data: result,
  });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.updateUser(id, req.body);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User updated successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserService.deleteUser(id);
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User deleted successfully',
    data: result,
  });
});

export const UserController = {
  createUser,
  getAllUsers,
  loginUser,
  getSingleUser,
  updateUser,
  deleteUser,
};
