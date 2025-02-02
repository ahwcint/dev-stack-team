import { NextFunction, Request, Response } from 'express';
import type { BaseResponseApi } from '../routes/main/dto/base.dto';
import { verifySession } from '../routes/auth/service';

const customMiddleware: MiddlewareHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const userCookie = req.cookies['user'];
  const sessionToken = authHeader && authHeader.split(' ')[1];
  if (!sessionToken || !userCookie) {
    return next({
      message: 'Unauthorized',
      data: null,
      status: 203,
      success: false,
    });
  }

  const sessionResponse = await verifySession({
    token: sessionToken,
    update: true,
    userId: userCookie,
  });

  if (!sessionResponse.success || !sessionResponse.data) {
    return next(sessionResponse);
  }

  next();
};

export default customMiddleware;

type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
