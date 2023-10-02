import { Order } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import prisma from '../../../shared/prisma';
import { IOrderReqData } from './order.interface';

const createOrder = async (
  userId: string,
  payload: IOrderReqData
): Promise<Order | null> => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User doesn't exist");
  }

  const { orderedBooks } = payload;

  const newOrder = await prisma.$transaction(async transactionClient => {
    const order = await transactionClient.order.create({
      data: { userId: user.id },
    });

    if (!order) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to palce order');
    }

    for (const orderedBook of orderedBooks) {
      await transactionClient.orderedBook.create({
        data: {
          orderId: order.id,
          bookId: orderedBook.bookId,
          quantity: orderedBook.quantity,
        },
      });
    }

    return order;
  });

  const data = await prisma.order.findUnique({
    where: { id: newOrder.id },
    include: {
      user: true,
      orderedBooks: {
        include: { book: true },
      },
    },
  });

  if (!data) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Failed to place your order!');
  }

  return data;
};

export const OrderService = {
  createOrder,
};
