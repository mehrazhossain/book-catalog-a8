import { Order } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { OrderService } from './order.service';

const createOrder: RequestHandler = catchAsync(async (req, res) => {
  //   const userId = req.user?.userId;
  const token = req.headers.authorization;
  const verifiedUser = jwtHelpers.verifyToken(
    token as string,
    config.jwt.secret as Secret
  );

  const { id: userId } = verifiedUser;

  const orderData = req.body;
  const result = await OrderService.createOrder(userId, orderData);

  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders data created successfully!',
    data: result,
  });
});

export const OrderControlller = {
  createOrder,
};
