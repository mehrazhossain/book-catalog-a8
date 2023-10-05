import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse, { signInSendResponse } from '../../../shared/sendResponse';
import { authService } from './auth.service';

const signUp = catchAsync(async (req: Request, res: Response) => {
  const result = await authService.signUp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student created successfully',
    data: result,
  });
});

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await authService.loginUser(loginData);

  signInSendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User logged in Successfully!',
    data: result,
  });
});

export const authController = {
  signUp,
  loginUser,
};
