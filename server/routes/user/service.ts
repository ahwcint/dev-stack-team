import { handlerApi } from '../../utils/handlerApi';
import prisma from '../../utils/prisma.singleton';
import {
  createUserRequestApi,
  createUserResponseApi,
} from './dto/createUser.dto';

export async function createUser(
  payload: createUserRequestApi,
): Promise<createUserResponseApi> {
  const response = await handlerApi(
    'create-user',
    async () =>
      await prisma.user.create({
        data: {
          username: payload.username,
          password: payload.password,
        },
      }),
  );

  return response;
}
