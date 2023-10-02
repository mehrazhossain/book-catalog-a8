import { Order } from '@prisma/client';
import { RequestHandler } from 'express';
import httpStatus from 'http-status';

import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import { paginationFields } from '../../../constants/pagination';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { orderFilter } from './order.constants';
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

const getAllOrders: RequestHandler = catchAsync(async (req, res) => {
  const pagination = pick(req.query, paginationFields);
  const filter = pick(req.query, orderFilter);
  const user = req.user;
  const result = await OrderService.getAllOrders(pagination, filter, user);

  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders data fetched successfully!',
    meta: result.meta,
    data: result.data,
  });
});

const getOrderForSpecificCustomer: RequestHandler = catchAsync(
  async (req, res) => {
    const id = req.params.orderId;
    const user = req.user;
    const result = await OrderService.getOrderForSpecificCustomer(id, user);

    sendResponse<Order | null>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Order data fetched successfully!',
      data: result,
    });
  }
);

export const OrderControlller = {
  createOrder,
  getAllOrders,
  getOrderForSpecificCustomer,
};
