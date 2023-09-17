import bcrypt from 'bcrypt';
import prisma from '../../../shared/prisma';

export async function isUserExist(email: string): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  return !!user;
}

export async function isPasswordMatch(
  email: string,
  inputPassword: string
): Promise<boolean> {
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  if (!user) {
    return false;
  }

  // Compare the input password with the stored hashed password
  return await bcrypt.compare(inputPassword, user.password);
}
