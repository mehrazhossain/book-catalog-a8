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

export const orderRoutes = router;
