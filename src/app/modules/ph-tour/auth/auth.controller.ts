/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import asyncHandler from "../../../utils/asyncHandler";
import { sendResponse } from "../../../utils/sendResponse";
import httpStatus from "http-status-codes";
import { AuthService } from "./auth.service";

const credentialsLogin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // const result = await UserServices.createUser(req.body);
    const loginInfo = await AuthService.credentialsLogin(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "User login successfully",
      data: loginInfo,
    });
  }
);

export const AuthControllers = { credentialsLogin };
