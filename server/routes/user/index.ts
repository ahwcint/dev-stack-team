import { User } from '@prisma/client';
import { TypeExpress } from '../../server';
import { handlerApi } from '../../utils/handlerApi';
import prisma from '../../utils/prisma.singleton';
import logger from '../../utils/pino';
import { createUser } from './service';
import { createUserRequestApi } from './dto/createUser.dto';

const ROUTE_NAME = 'user';

export function UserRoute(_app: TypeExpress) {
  _app.get(
    `/${ROUTE_NAME}/:userId`,
    async ({ params }: { params: Pick<User, 'userId'> }, res) => {
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

  // _app.put(
  //   `/${ROUTE_NAME}/:userId`,
  //   async (
  //     { params, body }: { params: Pick<User, 'userId'>; body: User },
  //     res,
  //   ) => {
  //     const response = await handlerApi<User>(
  //       'update-user',
  //       async () =>
  //         await prisma.user.update({
  //           data: {
  //             username: body.username,
  //             password: body.password,
  //           },
  //           where: {
  //             userId: params.userId,
  //           },
  //         }),
  //     );

  //     res.status(response.status).json(response);
  //   },
  // );

  _app.get(`/${ROUTE_NAME}`, async (req, res) => {
    const response = await handlerApi<User[]>(
      'list-all-user',
      async () => await prisma.user.findMany(),
    );

    res.status(response.status).json(response);
  });

  _app.post(
    `/${ROUTE_NAME}`,
    async ({ body }: { body: createUserRequestApi }, res) => {
      logger.info('🚁 fire create user api');
      const response = await createUser(body);

      res.status(response.status).json(response);
    },
  );
}
