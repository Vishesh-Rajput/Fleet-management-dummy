import { NextFunction, Request, Response } from 'express';

export class AppError extends Error {
  constructor(
    public status: number,
    public code: string,
    message: string,
  ) {
    super(message);
  }
}

export function notFound(_req: Request, _res: Response, next: NextFunction) {
  next(new AppError(404, 'NOT_FOUND', 'Route not found'));
}

export function errorHandler(err: unknown, req: Request, res: Response, _next: NextFunction) {
  const e = err instanceof AppError ? err : new AppError(500, 'INTERNAL_ERROR', 'Unexpected error');
  if (e.status >= 500) console.error(err);
  res.status(e.status).json({
    code: e.code,
    message: e.message,
    requestId: (req as Request & { id?: string }).id ?? null,
  });
}