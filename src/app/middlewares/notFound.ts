import { NextFunction, Request, Response } from "express";
import httpStatusCode from "http-status-codes";
const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatusCode.NOT_FOUND).json({
    success: false,
    message: "API Route not found",
  });
  next();
};

export default notFound;
