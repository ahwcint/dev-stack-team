import { Application, Response } from 'express';
import { User } from '@prisma/client';
import { createUserRequestApi } from './dto/createUser.dto';
import { createUser, verifyUserSignIn } from './service';
import { TypeExpress } from '../../api';
import { handlerApi } from '../../utils/handlerApi';
import prisma from '../../utils/prisma.singleton';
import type {
  signInUserRequestApi,
  signInUserResponseApi,
} from './dto/signInUser.dto';

const ROUTE_NAME = '/user';

export function UserRoute(_app: TypeExpress) {
  _app.get(
    `${ROUTE_NAME}/:userId`,
    async ({ params }: GetRequest, res: Response) => {
      const response = await handlerApi<User>(
        'get-user-by-id',
        async () =>
          await prisma.user.findUnique({
            where: {
              userId: params.userId,
            },
          }),
      );

      res.status(response.status).json(response);
    },
  );

  _app.put(
    `${ROUTE_NAME}/:userId`,
    async ({ params, body }: PutRequest, res: Response) => {
      const response = await handlerApi<User>(
        'update-user',
        async () =>
          await prisma.user.update({
            data: {
              username: body.username,
              password: body.password,
            },
            where: {
              userId: params.userId,
            },
          }),
      );

      res.status(response.status).json(response);
    },
  );

  _app.get(`${ROUTE_NAME}`, async (_, res: Response) => {
    const response = await handlerApi<User[]>(
      'list-all-user',
      async () => await prisma.user.findMany(),
    );

    res.status(response.status).json(response);
  });

  _app.post(`${ROUTE_NAME}`, async ({ body }: PostRequest, res: Response) => {
    const response = await createUser(body);

    res.status(response.status).json(response);
  });

  _app.post(
    `${ROUTE_NAME}/sign-in`,
    async ({ body }: SignInRequest, res: Response) => {
      const response = await verifyUserSignIn(body);
      res.status(response.status).json(response);
    },
  );
}

type GetRequest = { params: Pick<User, 'userId'> };
type PutRequest = { params: Pick<User, 'userId'>; body: User };
type PostRequest = { body: createUserRequestApi };
type SignInRequest = {
  body: signInUserRequestApi;
};
