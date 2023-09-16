import express from 'express';
import { userRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  // ... routes
  {
    path: '/auth',
    route: userRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
