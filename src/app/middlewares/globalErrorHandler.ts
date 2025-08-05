/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import { envVars } from "../../config/env";
import AppError from "../errorHelpers/AppError";

export const globalErrorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message = `Something went wrong!!!`;
  let statusCode = 500;
  if (err instanceof AppError) {
    statusCode = err.statusCode;
    message = err.message;
  } else if (err instanceof Error) {
    statusCode = 400;
    message = err.message;
  }

  //   if (err.name === "ValidationError") {
  //     return res.status(400).json({
  //       success: false,
  //       message: "Validation Error occured from global middleware",
  //       errors: message,
  //     });
  //   }
  res.status(statusCode).json({
    success: false,
    message,
    err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
  next();
};
