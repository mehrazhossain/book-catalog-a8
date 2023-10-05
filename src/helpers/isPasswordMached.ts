export const isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  console.log(givenPassword, savedPassword);

  return givenPassword === savedPassword;
};
