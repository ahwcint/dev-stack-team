'use server';
import { Response, Request } from 'express';
import { TypeExpress } from '../../api';
import { createSession, verifySession } from './service';
import { handlerApi } from '../../utils/handlerApi';
import prisma from '../../utils/prisma.singleton';

const ROUTE_NAME = '/auth';

export function AuthRoute(_app: TypeExpress) {
  _app.post(
    `${ROUTE_NAME}/create-session/:userId`,
    async ({ params }, res: Response) => {
      const response = await createSession(params.userId);
      res.status(response.status).json(response);
    },
  );
  _app.get(
    `${ROUTE_NAME}/verify-session/:session`,
    async ({ params }, res: Response) => {
      const response = await verifySession({ token: params.session });

      if (response.status < 400 && response.data) {
        res.cookie('sessionToken', response.data?.token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',
          expires: response.data?.expiresAt,
          sameSite: 'lax',
          path: '/',
        });
      }

      res.status(response.status).json(response);
    },
  );
  _app.get(`${ROUTE_NAME}/list-session`, async (_, res: Response) => {
    const response = await handlerApi(
      'list-session',
      async () => await prisma.session.findMany(),
    );
    res.status(response.status).json(response);
  });
  _app.get(`${ROUTE_NAME}/sign-out`, async (req: Request, res: Response) => {
    res.clearCookie('sessionToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    res.clearCookie('user', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });
    res.status(200).json({
      data: null,
      message: 'Signed out Successfully',
      success: true,
      status: 200,
    });
  });
}
