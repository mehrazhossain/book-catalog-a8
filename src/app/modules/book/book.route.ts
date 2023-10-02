import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middlewares/auth';
import { BookController } from './book.controller';

const router = express.Router();
router.post(
  '/create-book',
  auth(ENUM_USER_ROLE.ADMIN),
  BookController.createBook
);
router.get('/', BookController.getAllBook);
router.get('/:id', BookController.getSingleBook);

router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.updateBook);

router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const bookRoutes = router;
