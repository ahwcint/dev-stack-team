import type { User } from '@prisma/client';
import { TypeExpress } from '../../server';
import { handlerApi } from '../../utils/handlerApi';
import prisma from '../../utils/prisma.singleton';

export function Main(_app: TypeExpress) {
  _app.get('/user', async (_, res) => {
    const resData = await handlerApi<User[]>(
      'create-user',
      async () => await prisma.user.findMany(),
    );
    res.status(resData.status).json(resData);
  });
}
