import AppError from "../../../errorHelpers/AppError";
import { IAuthProvider, IUser } from "./user.interface";
import { User } from "./user.model";
import httpStatus from "http-status-codes";
import bcryptjs from "bcryptjs";
const createUser = async (payload: Partial<IUser>) => {
  const { email, password, ...rest } = payload;
  const isExist = await User.findOne({ email });
  if (isExist) {
    throw new AppError(httpStatus.BAD_REQUEST, "User already exist");
  }

  const hashedPassword = await bcryptjs.hash(password as string, 10);

  //   const isPasswordMatched = await bcryptjs.compare(
  //     password as string,
  //     hashedPassword
  //   );
  //   if (!isPasswordMatched) {
  //     throw new AppError(httpStatus.BAD_REQUEST, "Password does not match");
  //   }
  //   console.log(isPasswordMatched);

  const authProvider: IAuthProvider = {
    provider: "credentials",
    providerId: email as string,
  };

  const user = await User.create({
    email,
    password: hashedPassword,
    auths: [authProvider],
    ...rest,
  });
  return user;
};

const getAllUsers = async () => {
  const users = await User.find({});
  const totalUsers = await User.countDocuments();
  return {
    data: users,
    meta: {
      total: totalUsers,
    },
  };
};

export const UserServices = {
  createUser,
  getAllUsers,
};
