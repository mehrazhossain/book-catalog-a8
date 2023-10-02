import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { OrderControlller } from './order.controller';

const router = express.Router();

router.post(
  '/create-order',
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderControlller.createOrder
);

router.get('/', auth(ENUM_USER_ROLE.ADMIN), OrderControlller.getAllOrders);

router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderControlller.getOrderForSpecificCustomer
);

export const orderRoutes = router;
