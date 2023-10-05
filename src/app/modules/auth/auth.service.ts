import { User } from '@prisma/client';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { isPasswordMatched } from '../../../helpers/isPasswordMached';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import prisma from '../../../shared/prisma';
import { ILoginUser } from './auth.interface';

const signUp = async (
  payload: User
): Promise<
  Pick<
    User,
    'id' | 'name' | 'email' | 'role' | 'contactNo' | 'address' | 'profileImg'
  >
> => {
  const isExists = await prisma.user.findFirst({
    where: {
      email: payload.email,
    },
  });

  if (isExists) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'User Already Exists!');
  }

  const result = await prisma.user.create({
    data: payload,
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });

  return result;
};

// LOgin user
const loginUser = async (payload: ILoginUser): Promise<string> => {
  const { email, password } = payload;

  const isUserExist = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exists');
  }

  if (
    isUserExist.password &&
    !(await isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password do not matched');
  }

  //create access token and refresh token

  const { role, id: userId } = isUserExist;

  const token = jwtHelpers.createToken(
    { userId, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return token;
};

export const authService = {
  signUp,
  loginUser,
};
