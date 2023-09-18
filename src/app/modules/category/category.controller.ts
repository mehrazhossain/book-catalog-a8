import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { CategoryService } from './category.service';

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully!',
    data: result,
  });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
  const categories = await CategoryService.getAllCategory();
  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'All categories retrieved successfully',
    data: categories,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategory,
};
