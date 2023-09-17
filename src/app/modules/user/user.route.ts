import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.createUser);
router.post('/auth/signin', UserController.loginUser);

router.get('/users', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

router.get(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.getSingleUser
);

router.patch(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

router.delete(
  '/users/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.deleteUser
);

export const userRoutes = router;
