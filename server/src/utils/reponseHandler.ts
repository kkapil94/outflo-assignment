import { Response } from "express";

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export const successResponse = <T>(
  res: Response,
  data: T,
  message = "Success",
  statusCode = 200
): Response => {
  return res.status(statusCode).json({
    success: true,
    message,
    data,
  });
};

export const errorResponse = (
  res: Response,
  message = "An error occurred",
  statusCode = 500,
  error?: any
): Response => {
  const errorMessage = error instanceof Error ? error.message : String(error);

  return res.status(statusCode).json({
    success: false,
    message,
    error: error ? errorMessage : undefined,
  });
};
