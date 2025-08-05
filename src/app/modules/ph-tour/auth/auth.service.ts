import { IUser } from "../user/user.interface";
import httpStatus from "http-status-codes";
import AppError from "../../../errorHelpers/AppError";
import { User } from "../user/user.model";
import bcryptjs from "bcryptjs";
const credentialsLogin = async (payload: Partial<IUser>) => {
  const { email, password } = payload;
  const isExist = await User.findOne({ email });
  if (!isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  const isPasswordMatched = await bcryptjs.compare(
    password as string,
    isExist?.password as string
  );

  if (!isPasswordMatched) {
    throw new AppError(httpStatus.BAD_REQUEST, "Password does not match");
  }

  return {
    email: isExist.email,
  };
};

export const AuthService = { credentialsLogin };
