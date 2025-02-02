import { NextFunction, Request, Response } from 'express';
import { verifySession } from '../routes/auth/service';
import logger from '../utils/pino';

const customMiddleware: MiddlewareHandler = async (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const userCookie = req.cookies['user'];
    const sessionToken = authHeader && authHeader.split(' ')[1];
    if (!sessionToken || !userCookie) {
      return res.status(401).json({
        message: 'Unauthorized',
        data: null,
        status: 401,
        success: false,
      });
    }

    const sessionResponse = await verifySession({
      token: sessionToken,
      update: true,
      userId: userCookie,
    });

    if (!sessionResponse.success || !sessionResponse.data) {
      return res.status(402).json(sessionResponse);
    }
  } catch (err) {
    logger.error(err);
    return res.status(401).json({
      message: 'Unexpected Error',
      data: JSON.parse(JSON.stringify(err)),
      status: 401,
      success: false,
    });
  }
};

export default customMiddleware;

type MiddlewareHandler = (
  req: Request,
  res: Response,
  next: NextFunction,
) => void;
