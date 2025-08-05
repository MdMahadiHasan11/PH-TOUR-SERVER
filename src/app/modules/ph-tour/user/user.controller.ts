/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";
import { sendResponse } from "../../../utils/sendResponse";
import asyncHandler from "../../../utils/asyncHandler";

// const createUser = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     // throw new Error("fake error");
//     // throw new AppError(httpStatus.BAD_REQUEST, "fake");
//     const user = await UserServices.createUserService(req.body);

//     res
//       .status(httpStatus.CREATED)
//       .json({ message: "User created successfully", user });
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

const createUser = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.createUser(req.body);
    // res
    //   .status(httpStatus.CREATED)
    //   .json({ message: "User created successfully", user });
    sendResponse(res, {
      statusCode: httpStatus.CREATED,
      success: true,
      message: "User created successfully",
      data: result,
    });
  }
);

const getAllUsers = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const result = await UserServices.getAllUsers();
    // res.status(httpStatus.OK).json({
    //   success: true,
    //   message: "Users retrieved successfully",
    //   data: users,
    // });
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "Users retrieved successfully",
      meta: result.meta,
      data: result.data,
    });
  }
);

// const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const users = await UserServices.getAllUsers();
//     return users;
//   } catch (err: any) {
//     console.log(err);
//     next(err);
//   }
// };

export const UserControllers = {
  createUser,
  getAllUsers,
};
