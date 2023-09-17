import express from 'express';
import { UserController } from './user.controller';

const router = express.Router();

router.post('/auth/signup', UserController.createUser);
router.post('/auth/signin', UserController.loginUser);
router.get('/users', UserController.getAllUsers);
router.get('/users/:id', UserController.getSingleUser);
router.patch('/users/:id', UserController.updateUser);
router.delete('/users/:id', UserController.deleteUser);

export const userRoutes = router;
