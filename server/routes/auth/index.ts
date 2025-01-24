'use server';
import { Response } from 'express';
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
      const response = await verifySession(params.session);
      res.status(response.status).json(response);
    },
  );
  _app.get(`${ROUTE_NAME}/list-session`, async ({ params }, res: Response) => {
    const response = await handlerApi(
      'list-session',
      async () => await prisma.session.findMany(),
    );
    res.status(response.status).json(response);
  });
}
