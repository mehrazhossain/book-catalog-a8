import { Category } from '@prisma/client';
import prisma from '../../../shared/prisma';

const createCategory = async (data: Category): Promise<Category> => {
  const result = await prisma.category.create({
    data,
  });
  return result;
};

const getAllCategory = async (): Promise<Category[]> => {
  const result = await prisma.category.findMany();

  return result;
};

const getSingleCategory = async (
  id: string
): Promise<Partial<Category> | null> => {
  const result = await prisma.category.findUnique({
    where: {
      id,
    },
    include: {
      books: true,
    },
  });

  return result;
};

const updateCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Partial<Category> | null> => {
  const result = await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
  return result;
};

const deleteCategory = async (
  id: string
): Promise<Partial<Category> | null> => {
  const result = await prisma.category.delete({
    where: {
      id,
    },
  });
  return result;
};

export const CategoryService = {
  createCategory,
  getAllCategory,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
