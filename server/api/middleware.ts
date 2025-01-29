import { NextFunction, Request, Response } from 'express';
import type { BaseResponseApi } from '../routes/main/dto/base.dto';
import { verifySession } from '../routes/auth/service';

const customMiddleware: MiddlewareHandler = async (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const sessionToken = authHeader && authHeader.split(' ')[1];

  if (!sessionToken)
    return res.status(203).json({
      message: 'Unauthorized',
      data: null,
      status: 203,
      success: false,
    }) as unknown as BaseResponseApi;

  const sessionResponse = await verifySession({ token: sessionToken });

  if (!sessionResponse.success || !sessionResponse.data)
    return res.status(202).json(sessionResponse) as unknown as BaseResponseApi;

  next();
};

export default customMiddleware;

type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<BaseResponseApi<unknown> | undefined>;
